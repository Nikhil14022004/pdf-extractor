# app/routes/upload.py
import os
import logging
from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException
from datetime import datetime
from bson import ObjectId

from ..config import settings
from ..db import init_db
from ..services.extractor import run_extraction
from ..services.schema_index import update_schema_index
from ..utils import oid_to_str

logger = logging.getLogger("uvicorn.error")

db = init_db()
router = APIRouter(prefix="/api")

# ensure upload dir exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...), background_tasks: BackgroundTasks = None):
    """
    Upload endpoint that:
     - Saves file,
     - Runs extraction synchronously (tables normalized),
     - Returns extracted tables JSON to frontend immediately,
     - And schedules background storage + schema update.
    """
    logger.info(f"[UPLOAD] Received file: {getattr(file, 'filename', '')}, content_type={getattr(file, 'content_type', '')}")

    if file.content_type != "application/pdf":
        logger.warning("[UPLOAD] Rejected file: not a PDF")
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        logger.warning("[UPLOAD] Rejected file: too large")
        raise HTTPException(status_code=413, detail="File too large.")

    upload_id = ObjectId()
    filename_on_disk = f"{upload_id}_{file.filename}"
    path = os.path.join(settings.UPLOAD_DIR, filename_on_disk)

    try:
        with open(path, "wb") as f:
            f.write(content)
        logger.info(f"[UPLOAD] Saved file to: {path}")
    except Exception:
        logger.exception("[UPLOAD] Failed to write uploaded file to disk")
        raise HTTPException(status_code=500, detail="Failed to save file.")

    # Run extraction synchronously so client gets immediate result
    try:
        extracted = run_extraction(path)
        logger.info(f"[UPLOAD] Extraction succeeded for upload_id={upload_id}")
    except Exception as e:
        logger.exception("[UPLOAD] Extraction failed")
        # mark upload doc as failed asynchronously (we still try to insert upload record)
        try:
            await db.uploads.insert_one({
                "_id": upload_id,
                "filename": file.filename,
                "uploaded_at": datetime.utcnow(),
                "status": "failed",
                "file_storage_path": path,
                "error": str(e)
            })
        except Exception:
            logger.exception("[UPLOAD] Failed to insert failed upload doc")
        raise HTTPException(status_code=500, detail="Failed to extract PDF.")

    # Prepare minimal upload doc and document doc for background persistence
    upload_doc = {
        "_id": upload_id,
        "filename": file.filename,
        "uploaded_at": datetime.utcnow(),
        "status": "processing",
        "file_storage_path": path
    }
    # try to register the upload doc; if it fails, continue but log
    try:
        await db.uploads.insert_one(upload_doc)
    except Exception:
        logger.exception("[UPLOAD] Failed to insert upload doc (continuing)")

    # Schedule background save of extracted result & update schema index
    if background_tasks:
        background_tasks.add_task(_store_extracted_result, str(upload_id), extracted)
        logger.info(f"[UPLOAD] Scheduled background storage for upload_id={upload_id}")
    else:
        # synchronous fallback (not recommended for large files)
        await _store_extracted_result(str(upload_id), extracted)

    # Build response: return extracted tables (with normalized headers & rows_as_objects)
    response = {
        "upload_id": str(upload_id),
        "tables": extracted.get("tables", []),
        "fields": extracted.get("fields", {}),
        "norm_fields": extracted.get("norm_fields", {})
    }
    return response


async def _store_extracted_result(upload_id: str, extracted: dict):
    """
    Background job to persist the extracted document & update schema index.
    """
    try:
        doc_record = {
            "upload_id": ObjectId(upload_id),
            "raw_text": extracted.get("raw_text", ""),
            "tables": extracted.get("tables", []),
            "fields": extracted.get("fields", {}),
            "norm_fields": extracted.get("norm_fields", {}),
            "created_at": datetime.utcnow()
        }
        res = await db.documents.insert_one(doc_record)
        await db.uploads.update_one({"_id": ObjectId(upload_id)}, {"$set": {"status": "done", "extracted_doc_id": res.inserted_id}})
        # update schema index with normalized fields and also include table headers
        # combine norm_fields keys with table header keys
        combined = dict(extracted.get("norm_fields", {}))
        for t in extracted.get("tables", []):
            for h in t.get("norm_headers", []):
                # ensure key present with sample value if possible
                combined.setdefault(h, "")
        await update_schema_index(combined)
        logger.info(f"[STORE] Persisted document and updated schema for upload_id={upload_id}")
    except Exception:
        logger.exception(f"[STORE] Failed to persist extracted result for upload_id={upload_id}")
        # mark upload failed if possible
        try:
            await db.uploads.update_one({"_id": ObjectId(upload_id)}, {"$set": {"status": "failed", "error": "store_failed"}})
        except Exception:
            logger.exception("[STORE] Failed to update upload status to failed")
