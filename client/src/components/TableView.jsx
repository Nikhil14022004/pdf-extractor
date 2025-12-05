// // // // import React from "react";

// // // // /**
// // // //  * TableView - renders columns and rows returned by backend.
// // // //  * Props:
// // // //  *  - columns: array of column keys (strings)
// // // //  *  - rows: array of objects mapping column->value
// // // //  */
// // // // export default function TableView({ columns = [], rows = [] }) {
// // // //   if (!columns || !columns.length) {
// // // //     return <div className="bg-white border rounded-md p-6">No table to display</div>;
// // // //   }

// // // //   // CSV download helper
// // // //   function downloadCSV() {
// // // //     const escape = (v) => {
// // // //       if (v === null || v === undefined) return "";
// // // //       const s = String(v);
// // // //       if (s.includes('"') || s.includes(",") || s.includes("\n")) {
// // // //         return '"' + s.replace(/"/g, '""') + '"';
// // // //       }
// // // //       return s;
// // // //     };

// // // //     const lines = [];
// // // //     lines.push(columns.map(escape).join(","));
// // // //     for (const r of rows) {
// // // //       const row = columns.map((c) => escape(r[c]));
// // // //       lines.push(row.join(","));
// // // //     }
// // // //     const csv = lines.join("\n");
// // // //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// // // //     const url = URL.createObjectURL(blob);
// // // //     const a = document.createElement("a");
// // // //     a.href = url;
// // // //     a.download = "table.csv";
// // // //     document.body.appendChild(a);
// // // //     a.click();
// // // //     a.remove();
// // // //     URL.revokeObjectURL(url);
// // // //   }

// // // //   return (
// // // //     <div className="bg-white border rounded-md p-4">
// // // //       <div className="flex items-center justify-between mb-3">
// // // //         <h3 className="font-medium">Extracted Table</h3>
// // // //         <button onClick={downloadCSV} className="text-sm px-3 py-1 bg-slate-100 rounded hover:bg-slate-200">Download CSV</button>
// // // //       </div>

// // // //       <div className="overflow-auto border rounded">
// // // //         <table className="min-w-full text-sm">
// // // //           <thead className="bg-slate-100">
// // // //             <tr>
// // // //               {columns.map((h) => (
// // // //                 <th key={h} className="p-2 text-left">{h}</th>
// // // //               ))}
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {rows.length === 0 ? (
// // // //               <tr><td className="p-2 text-slate-500" colSpan={columns.length}>No rows</td></tr>
// // // //             ) : (
// // // //               rows.map((row, i) => (
// // // //                 <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50"}>
// // // //                   {columns.map((c) => (
// // // //                     <td key={c} className="p-2 align-top">{row[c]}</td>
// // // //                   ))}
// // // //                 </tr>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useMemo } from "react";

// // // /**
// // //  * TableView - improved UI
// // //  * Props:
// // //  *  - columns: array of column keys (strings)
// // //  *  - rows: array of objects mapping column->value
// // //  */
// // // export default function TableView({ columns = [], rows = [] }) {
// // //   // simple copy-to-clipboard helper
// // //   const copyToClipboard = async (text) => {
// // //     try {
// // //       await navigator.clipboard.writeText(String(text ?? ""));
// // //       // minimal feedback — could replace with toast
// // //       // we keep UI feedback lightweight to avoid extra deps
// // //       // You can later add a toast component if you want nicer messages
// // //     } catch (e) {
// // //       console.error("Copy failed", e);
// // //     }
// // //   };

// // //   const csvDownload = () => {
// // //     const escape = (v) => {
// // //       if (v === null || v === undefined) return "";
// // //       const s = String(v);
// // //       if (s.includes('"') || s.includes(",") || s.includes("\n")) {
// // //         return '"' + s.replace(/"/g, '""') + '"';
// // //       }
// // //       return s;
// // //     };

// // //     const lines = [];
// // //     lines.push(columns.map(escape).join(","));
// // //     for (const r of rows) {
// // //       const row = columns.map((c) => escape(r[c]));
// // //       lines.push(row.join(","));
// // //     }
// // //     const csv = lines.join("\n");
// // //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = "table.csv";
// // //     document.body.appendChild(a);
// // //     a.click();
// // //     a.remove();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   if (!columns || columns.length === 0) {
// // //     return (
// // //       <div className="bg-white border rounded-lg p-6 shadow-sm">
// // //         <div className="text-slate-600">No table to display</div>
// // //       </div>
// // //     );
// // //   }

// // //   // small memo to speed up render when many rows
// // //   const visibleRows = useMemo(() => rows || [], [rows]);

// // //   return (
// // //     <div className="bg-white border rounded-lg p-4 shadow-sm">
// // //       <div className="flex items-center justify-between mb-3 gap-4">
// // //         <h3 className="text-lg font-semibold">Extracted Table</h3>
// // //         <div className="flex items-center gap-2">
// // //           <button
// // //             onClick={csvDownload}
// // //             className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200"
// // //             aria-label="Download CSV"
// // //           >
// // //             Download CSV
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div className="overflow-auto border rounded">
// // //         <table className="min-w-full text-sm table-fixed">
// // //           <thead className="bg-slate-100 sticky top-0">
// // //             <tr>
// // //               {columns.map((h) => (
// // //                 <th
// // //                   key={h}
// // //                   className="p-2 text-left align-top w-40 first:pl-4"
// // //                   style={{ minWidth: 120 }}
// // //                 >
// // //                   <div className="truncate" title={h}>
// // //                     {h}
// // //                   </div>
// // //                 </th>
// // //               ))}
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {visibleRows.length === 0 ? (
// // //               <tr>
// // //                 <td className="p-4 text-slate-500" colSpan={columns.length}>
// // //                   No rows
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               visibleRows.map((row, i) => (
// // //                 <tr
// // //                   key={i}
// // //                   className={i % 2 ? "bg-white" : "bg-slate-50"}
// // //                   role="row"
// // //                 >
// // //                   {columns.map((c) => {
// // //                     const cell = row?.[c] ?? "";
// // //                     const short = String(cell).length > 120;
// // //                     return (
// // //                       <td key={c} className="p-2 align-top max-w-[28rem] break-words">
// // //                         <div className="flex items-start gap-2">
// // //                           <div className="flex-1 text-[13px] leading-snug">
// // //                             <div
// // //                               className={`${
// // //                                 short ? "truncate" : ""
// // //                               }`}
// // //                               title={short ? String(cell) : undefined}
// // //                             >
// // //                               {String(cell)}
// // //                             </div>
// // //                           </div>

// // //                           <div className="flex-shrink-0 self-center">
// // //                             <button
// // //                               onClick={() => copyToClipboard(cell)}
// // //                               className="p-1 rounded hover:bg-slate-100"
// // //                               title="Copy cell"
// // //                               aria-label="Copy cell"
// // //                               type="button"
// // //                             >
// // //                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
// // //                                 <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1h1a2 2 0 002-2V8l-5-5H8z" />
// // //                               </svg>
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       </td>
// // //                     );
// // //                   })}
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useMemo } from "react";

// // export default function TableView({ columns = [], rows = [] }) {
// //   const copyToClipboard = async (text) => {
// //     try {
// //       await navigator.clipboard.writeText(String(text ?? ""));
// //       // Consider adding a toast for feedback
// //     } catch (e) {
// //       console.error("Copy failed", e);
// //     }
// //   };

// //   const csvDownload = () => {
// //     const escape = (v) => {
// //       if (v === null || v === undefined) return "";
// //       const s = String(v);
// //       if (s.includes('"') || s.includes(",") || s.includes("\n")) {
// //         return '"' + s.replace(/"/g, '""') + '"';
// //       }
// //       return s;
// //     };

// //     const lines = [];
// //     lines.push(columns.map(escape).join(","));
// //     for (const r of rows) {
// //       const row = columns.map((c) => escape(r[c]));
// //       lines.push(row.join(","));
// //     }
// //     const csv = lines.join("\n");
// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "table.csv";
// //     document.body.appendChild(a);
// //     a.click();
// //     a.remove();
// //     URL.revokeObjectURL(url);
// //   };

// //   const visibleRows = useMemo(() => rows || [], [rows]);

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-4">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
// //         <div>
// //           <h3 className="text-lg font-semibold">Extracted Table</h3>
// //           <div className="text-xs text-slate-500">Preview of parsed rows</div>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <button
// //             onClick={csvDownload}
// //             className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm hover:bg-emerald-200"
// //           >
// //             Export CSV
// //           </button>
// //           <div className="text-xs text-slate-500">Rows: {visibleRows.length}</div>
// //         </div>
// //       </div>

// //       <div className="overflow-auto">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-slate-100">
// //             <tr>
// //               {columns.map((h) => (
// //                 <th key={h} className="p-2 text-left text-xs font-medium text-slate-600 border-b" style={{ minWidth: 140 }}>
// //                   <div className="truncate">{h}</div>
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {visibleRows.length === 0 ? (
// //               <tr>
// //                 <td className="p-4 text-slate-500" colSpan={columns.length}>
// //                   No rows found
// //                 </td>
// //               </tr>
// //             ) : (
// //               visibleRows.map((row, idx) => (
// //                 <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
// //                   {columns.map((c) => {
// //                     const cell = row?.[c] ?? "";
// //                     const isLong = String(cell).length > 120;
// //                     return (
// //                       <td key={c} className="p-2 align-top max-w-[36rem]">
// //                         <div className="flex items-start gap-2">
// //                           <div className="flex-1 text-[13px]">
// //                             <div className={isLong ? "truncate" : ""} title={isLong ? String(cell) : undefined}>
// //                               {String(cell)}
// //                             </div>
// //                           </div>

// //                           <div className="flex-shrink-0">
// //                             <button
// //                               onClick={() => copyToClipboard(cell)}
// //                               className="p-1 rounded hover:bg-slate-100"
// //                               title="Copy"
// //                             >
// //                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
// //                                 <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1h1a2 2 0 002-2V8l-5-5H8z" />
// //                               </svg>
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// // src/components/Upload.jsx
// import React, { useRef, useState } from "react";
// import { uploadPDF } from "../api";

// export default function Upload({ onResult }) {
//   const fileRef = useRef();
//   const [busy, setBusy] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [filename, setFilename] = useState(null);

//   async function handleFile(file) {
//     if (!file) return;
//     setBusy(true);
//     setMessage("Uploading...");
//     setResult(null);
//     setFilename(file.name);

//     try {
//       const data = await uploadPDF(file);
//       setResult(data);
//       setMessage("Extraction completed");
//       if (onResult) onResult(data);
//     } catch (err) {
//       console.error(err);
//       setMessage(err?.message ?? "Upload failed");
//     } finally {
//       setBusy(false);
//     }
//   }

//   function onPick(e) {
//     const f = e.target.files?.[0];
//     if (f) handleFile(f);
//   }

//   function onDrop(e) {
//     e.preventDefault();
//     const f = e.dataTransfer.files?.[0];
//     if (f) handleFile(f);
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <h2 className="text-sm md:text-base font-semibold mb-3">Upload PDF (first table only)</h2>

//       <div
//         onDrop={onDrop}
//         onDragOver={(e) => e.preventDefault()}
//         onClick={() => fileRef.current && fileRef.current.click()}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileRef.current && fileRef.current.click(); }}
//         className={`w-full rounded-lg border-2 border-dashed transition-colors
//           ${busy ? "opacity-70 pointer-events-none border-slate-200" : "hover:border-sky-300 border-dashed border-slate-300"}
//           focus:outline-none focus:ring-2 focus:ring-sky-200
//           px-4 py-6 flex items-center justify-center text-center cursor-pointer
//         `}
//         aria-label="Upload PDF"
//       >
//         <input
//           ref={fileRef}
//           type="file"
//           accept="application/pdf"
//           className="hidden"
//           onChange={onPick}
//         />

//         <div className="flex flex-col items-center gap-3">
//           {/* Icon: centered and responsive */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 md:h-10 lg:h-12 w-auto text-sky-500"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//           >
//             {/* cloud + upward arrow */}
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 16v4H8v-4" />
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" />
//             <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4" />
//             <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M20 16.58A4 4 0 0016 12h-1" />
//             <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M7 12a4 4 0 00-3 4.58" />
//           </svg>

//           {/* Responsive text sizes */}
//           <div className="text-sm md:text-base lg:text-lg font-medium text-slate-700">Click or drop a PDF file here</div>
//           <div className="text-xs md:text-sm text-slate-400">Backend expected at /api/upload</div>

//           <div className="flex gap-2 items-center mt-1">
//             <button
//               onClick={(e) => { e.stopPropagation(); fileRef.current && fileRef.current.click(); }}
//               disabled={busy}
//               className="text-sm md:text-sm px-3 py-1.5 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
//             >
//               Choose file
//             </button>

//             <button
//               onClick={(e) => e.stopPropagation() || setMessage("Use 'Choose file' to test")}
//               className="text-sm px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200"
//             >
//               Demo
//             </button>
//           </div>

//           {busy && (
//             <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
//               <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
//                 <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//               <span className="text-sm md:text-sm">{message}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-3 text-sm md:text-sm text-slate-600">
//         {message ? <div>{message}</div> : <div className="text-slate-400">Supported: PDF files only</div>}
//       </div>

//       {filename && (
//         <div className="mt-3 flex items-center justify-between gap-3 text-xs md:text-sm">
//           <div className="text-slate-700 truncate">{filename}</div>
//           {result && <div className="text-slate-500">Cols: {result.columns?.length ?? 0}</div>}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useMemo } from "react";

export default function TableView({ columns = [], rows = [] }) {
  const copyToClipboard = async (text) => {
    try { await navigator.clipboard.writeText(String(text ?? "")); } catch (e) { console.error(e); }
  };

  const exportCSV = () => {
    const escape = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      if (s.includes('"') || s.includes(",") || s.includes("\n")) return '"' + s.replace(/"/g,'""') + '"';
      return s;
    };
    const lines = [ columns.map(escape).join(",") ];
    for (const r of rows) lines.push(columns.map(c => escape(r[c])).join(","));
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "table.csv"; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const visibleRows = useMemo(()=>rows||[],[rows]);

  if (!columns?.length) {
    return <div className="card">No table to display</div>;
  }

  return (
    <div className="bg-white rounded-lg p-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold">Extracted Table</div>
          <div className="text-xs text-slate-500">Preview of parsed rows</div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="text-sm px-3 py-1 rounded bg-emerald-100 text-emerald-700">Export CSV</button>
          <div className="text-xs text-slate-500">Rows: {visibleRows.length}</div>
        </div>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 sticky top-0">
            <tr>
              {columns.map(h => (
                <th key={h} className="p-2 text-left text-xs font-medium text-slate-600" style={{ minWidth: 140 }}>
                  <div className="truncate">{h}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr><td className="p-4 text-slate-500" colSpan={columns.length}>No rows</td></tr>
            ) : (
              visibleRows.map((r, i) => (
                <tr key={i} className={i%2 ? "bg-white" : "bg-slate-50"}>
                  {columns.map(c => {
                    const cell = r?.[c] ?? "";
                    const isLong = String(cell).length > 120;
                    return (
                      <td key={c} className="p-2 align-top max-w-[36rem]">
                        <div className="flex items-start justify-between gap-2">
                          <div className={`text-[13px] ${isLong ? "truncate" : ""}`} title={isLong ? String(cell) : undefined}>
                            {String(cell)}
                          </div>
                          <button onClick={() => copyToClipboard(cell)} className="p-1 rounded hover:bg-slate-100 ml-2" title="Copy">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1h1a2 2 0 002-2V8l-5-5H8z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
