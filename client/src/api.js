const BASE = "http://localhost:8000/api";

export async function uploadPDF(file, onProgress) {
  const form = new FormData();
  form.append("file", file);

  // Use fetch; no progress in pure fetch for uploads in all browsers,
  // but the UI will show a spinner and poll status.
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({detail: res.statusText}));
    throw new Error(err.detail || res.statusText);
  }
  return res.json(); // {upload_id: "..."}
}

export async function getUploadStatus(upload_id) {
  const res = await fetch(`${BASE}/upload/${upload_id}`);
  if (!res.ok) throw new Error("Upload status fetch failed");
  return res.json();
}

export async function listDocuments(limit = 20, skip = 0) {
  const res = await fetch(`${BASE}/documents?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("List documents failed");
  return res.json();
}

export async function getDocument(doc_id) {
  const res = await fetch(`${BASE}/documents/${doc_id}`);
  if (!res.ok) throw new Error("Get document failed");
  return res.json();
}
