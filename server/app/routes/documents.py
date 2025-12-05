from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from bson import ObjectId
from ..db import init_db
from ..utils import oid_to_str

db = init_db()
router = APIRouter(prefix="/api/v1")

@router.get("/documents", summary="List extracted documents")
async def list_documents(limit: int = 20, skip: int = 0):
    cursor = db.documents.find().sort("created_at", -1).skip(skip).limit(limit)
    docs = []
    async for d in cursor:
        d2 = oid_to_str(d)
        # convert upload_id and _id to strings
        d2["upload_id"] = str(d.get("upload_id")) if d.get("upload_id") else None
        d2["_id"] = str(d.get("_id"))
        docs.append(d2)
    return {"count": len(docs), "results": docs}

@router.get("/documents/{doc_id}", summary="Get document by id")
async def get_document(doc_id: str):
    d = await db.documents.find_one({"_id": ObjectId(doc_id)})
    if not d:
        raise HTTPException(status_code=404, detail="Document not found")
    d2 = oid_to_str(d)
    d2["upload_id"] = str(d.get("upload_id")) if d.get("upload_id") else None
    d2["_id"] = str(d.get("_id"))
    return d2
