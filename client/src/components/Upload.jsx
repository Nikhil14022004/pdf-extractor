// // // import React, { useRef, useState } from "react";
// // // import { uploadPDF } from "../api";

// // // export default function Upload({ onResult }) {
// // //   const fileRef = useRef();
// // //   const [busy, setBusy] = useState(false);
// // //   const [message, setMessage] = useState(null);
// // //   const [result, setResult] = useState(null);

// // //   async function handleFile(file) {
// // //     setBusy(true);
// // //     setMessage("Uploading...");
// // //     setResult(null);

// // //     try {
// // //       const data = await uploadPDF(file);
// // //       // data: { columns: [...], rows: [...] }
// // //       setResult(data);
// // //       setMessage("Upload & extraction completed.");
// // //       if (onResult) onResult(data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setMessage("Upload failed: " + (err.message || err));
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   }

// // //   function onPick(e) {
// // //     const f = e.target.files?.[0];
// // //     if (f) handleFile(f);
// // //   }

// // //   function onDrop(e) {
// // //     e.preventDefault();
// // //     const f = e.dataTransfer.files?.[0];
// // //     if (f) handleFile(f);
// // //   }

// // //   return (
// // //     <div>
// // //       <label className="block mb-2 text-sm font-medium">Upload PDF (first table only)</label>

// // //       <div
// // //         className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
// // //           busy ? "opacity-60" : "hover:bg-slate-100"
// // //         }`}
// // //         onDrop={onDrop}
// // //         onDragOver={(e) => e.preventDefault()}
// // //         onClick={() => fileRef.current.click()}
// // //       >
// // //         <input
// // //           ref={fileRef}
// // //           type="file"
// // //           accept="application/pdf"
// // //           className="hidden"
// // //           onChange={onPick}
// // //         />
// // //         <div className="flex flex-col items-center gap-2">
// // //           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16v-4m0 0l-4 4m4-4l4 4M17 8v8m0 0l4-4m-4 4l-4-4" />
// // //           </svg>
// // //           <div className="text-sm text-slate-600">Click or drop a PDF here</div>
// // //           <div className="text-xs text-slate-400">Backend expected at /api/upload</div>
// // //         </div>
// // //       </div>

// // //       <div className="mt-3 text-sm text-slate-600">
// // //         {message ? <div>{message}</div> : <div>No uploads yet.</div>}
// // //       </div>

// // //       {result && (
// // //         <div className="mt-4">
// // //           <div className="text-sm font-medium mb-2">Extracted Table</div>
// // //           <div className="text-xs text-slate-500 mb-2">Columns: {result.columns.join(", ")}</div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import React, { useRef, useState } from "react";
// // import { uploadPDF } from "../api";

// // export default function Upload({ onResult }) {
// //   const fileRef = useRef();
// //   const [busy, setBusy] = useState(false);
// //   const [message, setMessage] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [filename, setFilename] = useState(null);

// //   async function handleFile(file) {
// //     if (!file) return;
// //     setBusy(true);
// //     setMessage("Uploading...");
// //     setResult(null);
// //     setFilename(file.name);

// //     try {
// //       const data = await uploadPDF(file);
// //       setResult(data);
// //       setMessage("Upload & extraction completed.");
// //       if (onResult) onResult(data);
// //     } catch (err) {
// //       console.error(err);
// //       const text = err?.message ?? "Upload failed";
// //       setMessage(text);
// //     } finally {
// //       setBusy(false);
// //     }
// //   }

// //   function onPick(e) {
// //     const f = e.target.files?.[0];
// //     if (f) handleFile(f);
// //   }

// //   function onDrop(e) {
// //     e.preventDefault();
// //     const f = e.dataTransfer.files?.[0];
// //     if (f) handleFile(f);
// //   }

// //   return (
// //     <div className="bg-white border rounded-lg p-4 shadow-sm">
// //       <label className="block mb-2 text-sm font-medium">Upload PDF (first table only)</label>

// //       <div
// //         className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors
// //           ${busy ? "opacity-60 pointer-events-none" : "hover:bg-slate-50"}
// //         `}
// //         onDrop={onDrop}
// //         onDragOver={(e) => e.preventDefault()}
// //         onClick={() => fileRef.current && fileRef.current.click()}
// //       >
// //         <input
// //           ref={fileRef}
// //           type="file"
// //           accept="application/pdf"
// //           className="hidden"
// //           onChange={onPick}
// //         />

// //         <div className="flex flex-col items-center gap-3">
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16v-4m0 0l-4 4m4-4l4 4M17 8v8m0 0l4-4m-4 4l-4-4" />
// //           </svg>

// //           <div className="flex flex-col items-center">
// //             <div className="text-sm text-slate-600">Click or drop a PDF here</div>
// //             <div className="text-xs text-slate-400 mt-1">Backend expected at /api/upload</div>
// //           </div>

// //           <div className="flex items-center gap-3 mt-2">
// //             <button
// //               onClick={() => fileRef.current && fileRef.current.click()}
// //               className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200"
// //               disabled={busy}
// //             >
// //               Choose file
// //             </button>

// //             {busy && (
// //               <div className="text-sm text-slate-500 flex items-center gap-2">
// //                 <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
// //                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
// //                   <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
// //                 </svg>
// //                 Uploading...
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mt-3 text-sm text-slate-600">
// //         {message ? <div>{message}</div> : <div>No uploads yet.</div>}
// //       </div>

// //       {filename && (
// //         <div className="mt-3 text-xs text-slate-500">Selected: {filename}</div>
// //       )}

// //       {result && (
// //         <div className="mt-4">
// //           <div className="text-sm font-medium mb-1">Extracted Table</div>
// //           <div className="text-xs text-slate-500">Columns: {result.columns.join(", ")}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useRef, useState } from "react";
// import { uploadPDF } from "../api";

// export default function Upload({ onResult }) {
//   const fileRef = useRef();
//   const [busy, setBusy] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [filename, setFilename] = useState(null);

//   async function handleFile(file) {
//     if (!file) return;
//     setBusy(true);
//     setMessage("Uploading...");
//     setFilename(file.name);
//     try {
//       const data = await uploadPDF(file); // keep using your API helper
//       setMessage("Extraction completed");
//       if (onResult) onResult({ ...data, filename: file.name });
//     } catch (err) {
//       console.error(err);
//       setMessage(err?.message ?? "Upload failed");
//     } finally {
//       setBusy(false);
//     }
//   }

//   function onPick(e) { const f = e.target.files?.[0]; if (f) handleFile(f); }
//   function onDrop(e) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }

//   return (
//     <div>
//       <label className="block mb-2 text-sm font-medium">Upload PDF (first table only)</label>

//       <div
//         onDrop={onDrop}
//         onDragOver={(e) => e.preventDefault()}
//         onClick={() => fileRef.current && fileRef.current.click()}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileRef.current && fileRef.current.click(); }}
//         className={`upload-dashed border-2 border-dashed border-slate-300 cursor-pointer ${busy ? "opacity-70 pointer-events-none" : "hover:border-sky-300"}`}
//       >
//         <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={onPick} />

//         <div className="flex flex-col items-center gap-3 px-2">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-10 lg:h-12 w-auto text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 16v4H8v-4" />
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" />
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4" />
//           </svg>

//           <div className="text-sm md:text-base lg:text-lg font-medium text-slate-700">Click or drop a PDF file here</div>
//           <div className="text-xs md:text-sm text-slate-400">Backend expected at /api/upload</div>

//           <div className="flex gap-2 items-center mt-1">
//             <button
//               onClick={(e)=>{ e.stopPropagation(); fileRef.current && fileRef.current.click(); }}
//               disabled={busy}
//               className="text-sm px-3 py-1.5 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
//             >
//               Choose file
//             </button>
//             <button className="text-sm px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200" onClick={(e)=>{ e.stopPropagation(); setMessage("Use Choose file to test"); }}>
//               Demo
//             </button>
//           </div>

//           {busy && (
//             <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
//               <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
//                 <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//               <span>{message}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-3 text-sm text-slate-600">{message ? message : "Supported: PDF files only"}</div>
//       {filename && <div className="mt-2 text-xs text-slate-500 truncate">Selected: {filename}</div>}
//     </div>
//   );
// }

import React, { useRef, useState } from "react";
import { uploadPDF } from "../api";

export default function Upload({ onResult }) {
  const fileRef = useRef();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [filename, setFilename] = useState(null);

  async function handleFile(file) {
    if (!file) return;
    setBusy(true);
    setMessage("Uploading...");
    setFilename(file.name);
    try {
      const data = await uploadPDF(file); // keep using your API helper
      setMessage("Extraction completed");
      if (onResult) onResult({ ...data, filename: file.name });
    } catch (err) {
      console.error(err);
      setMessage(err?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function onPick(e) { const f = e.target.files?.[0]; if (f) handleFile(f); }
  function onDrop(e) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">Upload PDF (first table only)</label>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current && fileRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileRef.current && fileRef.current.click(); }}
        className={`upload-dashed border-2 border-dashed border-slate-300 cursor-pointer ${busy ? "opacity-70 pointer-events-none" : "hover:border-sky-300"}`}
      >
        <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={onPick} />

        <div className="flex flex-col items-center gap-3 px-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-10 lg:h-12 w-auto text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 16v4H8v-4" />
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" />
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4" />
          </svg>

          <div className="text-sm md:text-base lg:text-lg font-medium text-slate-700">Click or drop a PDF file here</div>
          <div className="text-xs md:text-sm text-slate-400">Backend expected at /api/upload</div>

          <div className="flex gap-2 items-center mt-1">
            <button
              onClick={(e)=>{ e.stopPropagation(); fileRef.current && fileRef.current.click(); }}
              disabled={busy}
              className="text-sm px-3 py-1.5 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
            >
              Choose file
            </button>
            <button className="text-sm px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200" onClick={(e)=>{ e.stopPropagation(); setMessage("Use Choose file to test"); }}>
              Demo
            </button>
          </div>

          {busy && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-600">{message ? message : "Supported: PDF files only"}</div>
      {filename && <div className="mt-2 text-xs text-slate-500 truncate">Selected: {filename}</div>}
    </div>
  );
}
