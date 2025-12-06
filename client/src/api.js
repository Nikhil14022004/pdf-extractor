// const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// export async function uploadPdf(formData) {
//   const res = await fetch(`${API_BASE}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Upload failed");
//   }

//   return res.json();
// }

// // 👇 used by the “View database” tab
// export async function getData(limit = 100, offset = 0) {
//   const res = await fetch(
//     `${API_BASE}/api/data?limit=${encodeURIComponent(
//       limit
//     )}&offset=${encodeURIComponent(offset)}`
//   );

//   if (!res.ok) {
//     // this is the message you see in the red box
//     throw new Error("Fetch data failed");
//   }

//   return res.json();
// }


const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function uploadPdf(formData) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}

export async function getData(limit = 100, offset = 0) {
  const res = await fetch(
    `${API_BASE}/api/data?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
  );

  if (!res.ok) {
    throw new Error("Fetch data failed");
  }

  return res.json();
}
