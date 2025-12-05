// src/components/Upload.jsx
import React, { useRef, useState } from "react";
import { uploadPDF } from "../api";
import TablesPreview from "./TablePreview";

export default function Upload({ onUploaded }) {
  const fileRef = useRef();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [result, setResult] = useState(null);

  async function handleFile(file) {
    setBusy(true);
    setMessage("Uploading...");
    setResult(null);
    try {
      const data = await uploadPDF(file);
      // data contains upload_id, tables, fields, norm_fields
      setResult(data);
      setMessage("Upload & extraction done.");
      setBusy(false);

      // inform parent (optional) with extracted doc id if present
      if (data.upload_id && onUploaded) onUploaded(data.upload_id);
    } catch (err) {
      setBusy(false);
      setMessage("Upload failed: " + (err.message || err));
      console.error(err);
    }
  }

  function onPick(e) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">Upload PDF</label>

      <div
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          busy ? "opacity-60" : "hover:bg-slate-100"
        }`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onPick}
        />
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16v-4m0 0l-4 4m4-4l4 4M17 8v8m0 0l4-4m-4 4l-4-4" />
          </svg>
          <div className="text-sm text-slate-600">Click or drop a PDF here to upload</div>
          <div className="text-xs text-slate-400">Max file size enforced by server</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        {message ? <div>{message}</div> : <div>No uploads yet.</div>}
      </div>

      {/* Show extracted tables if available */}
      {result && (
        <div className="mt-6">
          <div className="mb-4">
            <strong className="text-sm">Extracted:</strong>{" "}
            <span className="text-xs text-slate-500">Upload ID: {result.upload_id}</span>
          </div>

          <TablesPreview tables={result.tables || []} fields={result.norm_fields || {}} />
        </div>
      )}
    </div>
  );
}
