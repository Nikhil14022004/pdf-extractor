// src/components/Upload.jsx
import React, { useRef, useState } from "react";
import { uploadPdf } from "../api";

export default function Upload({ onResult }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file) {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadPdf(formData);
      // result is expected: { columns, rows, ... }
      onResult?.({ ...result, filename: file.name });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={
        "upload-dashed" +
        (dragging ? " ring-2 ring-emerald-400 ring-offset-2" : "")
      }
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleUpload(file);
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleUpload(file);
        }}
      />

      <button
        type="button"
        disabled={loading}
        onClick={() => fileRef.current?.click()}
        className="btn-primary w-full justify-center"
      >
        {loading ? "Uploading..." : "Choose PDF"}
      </button>

      <p className="mt-2 text-xs text-slate-500 text-center">
        or drag &amp; drop a PDF here
      </p>
    </div>
  );
}
