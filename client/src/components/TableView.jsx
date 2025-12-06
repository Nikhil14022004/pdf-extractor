// // import React, { useMemo } from "react";

// // export default function TableView({ columns = [], rows = [] }) {
// //   const copyToClipboard = async (text) => {
// //     try { await navigator.clipboard.writeText(String(text ?? "")); } catch (e) { console.error(e); }
// //   };

// //   const exportCSV = () => {
// //     const escape = (v) => {
// //       if (v === null || v === undefined) return "";
// //       const s = String(v);
// //       if (s.includes('"') || s.includes(",") || s.includes("\n")) return '"' + s.replace(/"/g,'""') + '"';
// //       return s;
// //     };
// //     const lines = [ columns.map(escape).join(",") ];
// //     for (const r of rows) lines.push(columns.map(c => escape(r[c])).join(","));
// //     const csv = lines.join("\n");
// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url; a.download = "table.csv"; document.body.appendChild(a); a.click(); a.remove();
// //     URL.revokeObjectURL(url);
// //   };

// //   const visibleRows = useMemo(()=>rows||[],[rows]);

// //   if (!columns?.length) {
// //     return <div className="card">No table to display</div>;
// //   }

// //   return (
// //     <div className="bg-white rounded-lg p-2">
// //       <div className="flex items-center justify-between mb-2">
// //         <div>
// //           <div className="font-semibold">Extracted Table</div>
// //           <div className="text-xs text-slate-500">Preview of parsed rows</div>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button onClick={exportCSV} className="text-sm px-3 py-1 rounded bg-emerald-100 text-emerald-700">Export CSV</button>
// //           <div className="text-xs text-slate-500">Rows: {visibleRows.length}</div>
// //         </div>
// //       </div>

// //       <div className="overflow-auto border rounded">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-slate-100 sticky top-0">
// //             <tr>
// //               {columns.map(h => (
// //                 <th key={h} className="p-2 text-left text-xs font-medium text-slate-600" style={{ minWidth: 140 }}>
// //                   <div className="truncate">{h}</div>
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {visibleRows.length === 0 ? (
// //               <tr><td className="p-4 text-slate-500" colSpan={columns.length}>No rows</td></tr>
// //             ) : (
// //               visibleRows.map((r, i) => (
// //                 <tr key={i} className={i%2 ? "bg-white" : "bg-slate-50"}>
// //                   {columns.map(c => {
// //                     const cell = r?.[c] ?? "";
// //                     const isLong = String(cell).length > 120;
// //                     return (
// //                       <td key={c} className="p-2 align-top max-w-[36rem]">
// //                         <div className="flex items-start justify-between gap-2">
// //                           <div className={`text-[13px] ${isLong ? "truncate" : ""}`} title={isLong ? String(cell) : undefined}>
// //                             {String(cell)}
// //                           </div>
// //                           <button onClick={() => copyToClipboard(cell)} className="p-1 rounded hover:bg-slate-100 ml-2" title="Copy">
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
// //                               <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1h1a2 2 0 002-2V8l-5-5H8z" />
// //                             </svg>
// //                           </button>
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
// import React, { useMemo } from "react";

// export default function TableView({ columns = [], rows = [] }) {
//   const copyToClipboard = async (text) => {
//     try { await navigator.clipboard.writeText(String(text ?? "")); } catch (e) { console.error(e); }
//   };

//   const exportCSV = () => {
//     const escape = (v) => {
//       if (v === null || v === undefined) return "";
//       const s = String(v);
//       if (s.includes('"') || s.includes(",") || s.includes("\n")) return '"' + s.replace(/"/g,'""') + '"';
//       return s;
//     };
//     // include row number as first column header
//     const headers = ["#", ...columns];
//     const lines = [ headers.map(escape).join(",") ];
//     for (let i = 0; i < rows.length; i++) {
//       const r = rows[i];
//       const rowVals = [ (i+1).toString(), ...columns.map(c => escape(r[c])) ];
//       lines.push(rowVals.join(","));
//     }
//     const csv = lines.join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url; a.download = "table.csv"; document.body.appendChild(a); a.click(); a.remove();
//     URL.revokeObjectURL(url);
//   };

//   const visibleRows = useMemo(()=>rows||[],[rows]);

//   if (!columns?.length) {
//     return <div className="card">No table to display</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg p-2">
//       <div className="flex items-center justify-between mb-2">
//         <div>
//           <div className="font-semibold">Extracted Table</div>
//           <div className="text-xs text-slate-500">Preview of parsed rows</div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button onClick={exportCSV} className="text-sm px-3 py-1 rounded bg-emerald-100 text-emerald-700">Export CSV</button>
//           <div className="text-xs text-slate-500">Rows: {visibleRows.length}</div>
//         </div>
//       </div>

//       <div className="overflow-auto border rounded">
//         <table className="min-w-full text-sm">
//           <thead className="bg-slate-100 sticky top-0">
//             <tr>
//               {/* Number column header */}
//               <th className="p-2 text-left text-xs font-medium text-slate-600" style={{ width: 48 }}>
//                 #
//               </th>

//               {columns.map(h => (
//                 <th key={h} className="p-2 text-left text-xs font-medium text-slate-600" style={{ minWidth: 140 }}>
//                   <div className="truncate">{h}</div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {visibleRows.length === 0 ? (
//               <tr>
//                 <td className="p-4 text-slate-500" colSpan={columns.length + 1}>No rows</td>
//               </tr>
//             ) : (
//               visibleRows.map((r, i) => (
//                 <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50"}>
//                   {/* Row number cell */}
//                   <td className="p-2 align-top text-slate-600 font-medium">{i + 1}</td>

//                   {columns.map(c => {
//                     const cell = r?.[c] ?? "";
//                     const isLong = String(cell).length > 120;
//                     return (
//                       <td key={c} className="p-2 align-top max-w-[36rem]">
//                         <div className="flex items-start justify-between gap-2">
//                           <div className={`text-[13px] ${isLong ? "truncate" : ""}`} title={isLong ? String(cell) : undefined}>
//                             {String(cell)}
//                           </div>

//                           <button onClick={() => copyToClipboard(cell)} className="p-1 rounded hover:bg-slate-100 ml-2" title="Copy">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
//                               <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-1h1a2 2 0 002-2V8l-5-5H8z" />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
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
    const headers = ["#", ...columns];
    const lines = [ headers.map(escape).join(",") ];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const rowVals = [ (i+1).toString(), ...columns.map(c => escape(r[c])) ];
      lines.push(rowVals.join(","));
    }
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "table.csv"; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const visibleRows = useMemo(() => rows || [], [rows]);

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
              {/* Number column header */}
              <th className="p-2 text-left text-xs font-medium text-slate-600" style={{ width: 56 }}>
                #
              </th>

              {columns.map(h => (
                <th key={h} className="p-2 text-left text-xs font-medium text-slate-600" style={{ minWidth: 160 }}>
                  <div className="truncate">{h}</div>
                </th>
              ))}
              {/* optional action header (Copy) */}
              <th className="p-2 text-left text-xs font-medium text-slate-600" style={{ width: 80 }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td className="p-4 text-slate-500" colSpan={columns.length + 2}>No rows</td>
              </tr>
            ) : (
              visibleRows.map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50"}>
                  {/* Row number cell */}
                  <td className="p-2 align-top text-slate-600 font-medium" style={{ verticalAlign: "top" }}>{i + 1}</td>

                  {columns.map(c => {
                    const cell = r?.[c] ?? "";
                    const isLong = String(cell).length > 120;
                    return (
                      <td key={c} className="p-2 align-top max-w-[36rem]">
                        <div className="text-[13px]">
                          <div className={`${isLong ? "truncate" : ""}`} title={isLong ? String(cell) : undefined}>
                            {String(cell)}
                          </div>
                        </div>
                      </td>
                    );
                  })}

                  {/* Action column with text "Copy" instead of icon */}
                  <td className="p-2 align-top">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(r))}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
                    >
                      Copy row
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
