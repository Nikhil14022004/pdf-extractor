// // // import React, { useState } from "react";
// // // import Upload from "./components/Upload";
// // // import TableView from "./components/TableView";

// // // export default function App() {
// // //   const [lastTable, setLastTable] = useState(null); // { columns, rows }

// // //   return (
// // //     <div className="min-h-screen p-6">
// // //       <div className="max-w-6xl mx-auto">
// // //         <header className="flex items-center justify-between mb-6">
// // //           <h1 className="text-2xl font-semibold">PDF Extractor</h1>
// // //           <div className="text-sm text-slate-600">React + Vite + Tailwind</div>
// // //         </header>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //           <div className="lg:col-span-1">
// // //             <Upload onResult={(table) => setLastTable(table)} />
// // //           </div>

// // //           <div className="lg:col-span-2">
// // //             {lastTable ? (
// // //               <TableView columns={lastTable.columns} rows={lastTable.rows} />
// // //             ) : (
// // //               <div className="bg-white border rounded-md p-6 min-h-[300px]">
// // //                 <div className="text-slate-600">Upload a PDF to see extracted table here.</div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import Upload from "./components/Upload";
// // import TableView from "./components/TableView";

// // export default function App() {
// //   const [lastTable, setLastTable] = useState(null); // { columns, rows }
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-800">
// //       {/* HEADER */}
// //       <header className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
// //         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center gap-3">
// //               <div className="rounded-md bg-white/20 p-2">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                   <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <div className="font-semibold text-lg leading-tight">PDF Extractor</div>
// //                 <div className="text-xs opacity-90">Upload • Extract • Export</div>
// //               </div>
// //             </div>

// //             <nav className="hidden md:flex items-center gap-4">
// //               <a className="text-sm hover:underline cursor-pointer">Docs</a>
// //               <a className="text-sm hover:underline cursor-pointer">API</a>
// //               <button
// //                 onClick={() => alert("This is an example button")}
// //                 className="ml-2 inline-flex items-center gap-2 rounded-md bg-white/20 px-3 py-1.5 text-sm hover:bg-white/30"
// //               >
// //                 Try Demo
// //               </button>
// //             </nav>

// //             {/* mobile menu toggle */}
// //             <div className="md:hidden">
// //               <button
// //                 aria-label="Toggle menu"
// //                 onClick={() => setMobileOpen((s) => !s)}
// //                 className="p-2 rounded-md bg-white/25"
// //               >
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* mobile nav */}
// //           {mobileOpen && (
// //             <div className="md:hidden py-2">
// //               <div className="flex flex-col gap-2">
// //                 <a className="text-white/90 px-2 py-2 rounded-md hover:bg-white/10">Docs</a>
// //                 <a className="text-white/90 px-2 py-2 rounded-md hover:bg-white/10">API</a>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       {/* MAIN */}
// //       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// //           {/* Left column - Upload + help */}
// //           <aside className="lg:col-span-4">
// //             <div className="sticky top-6 space-y-4">
// //               <Upload onResult={(table) => setLastTable(table)} />

// //               <div className="bg-white rounded-lg p-4 shadow-md text-sm text-slate-600">
// //                 <div className="font-medium mb-2">Tips</div>
// //                 <ul className="list-disc pl-4 space-y-1">
// //                   <li>Prefer PDFs with clear table borders for better extraction.</li>
// //                   <li>Large tables will scroll horizontally on small screens.</li>
// //                   <li>Use CSV export for spreadsheet edits.</li>
// //                 </ul>
// //               </div>
// //             </div>
// //           </aside>

// //           {/* Right column - Table / Placeholder */}
// //           <section className="lg:col-span-8">
// //             {lastTable ? (
// //               <TableView columns={lastTable.columns} rows={lastTable.rows} />
// //             ) : (
// //               <div className="bg-white rounded-lg p-6 shadow-md min-h-[320px] flex flex-col items-center justify-center gap-4">
// //                 <div className="text-slate-600">No data yet</div>
// //                 <div className="text-sm text-slate-500 max-w-md text-center">
// //                   Upload a PDF using the panel on the left (mobile: above). The extracted table will appear here with options to copy cells or download CSV.
// //                 </div>
// //                 <div className="w-full max-w-xs">
// //                   <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
// //                     <div className="w-2/3 h-full bg-emerald-400" />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </section>
// //         </div>
// //       </main>

// //       {/* FOOTER */}
// //       <footer className="border-t bg-white/60">
// //         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
// //           <div>© {new Date().getFullYear()} PDF Extractor</div>
// //           <div className="flex items-center gap-4">
// //             <a className="hover:underline cursor-pointer">Privacy</a>
// //             <a className="hover:underline cursor-pointer">Terms</a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import Upload from "./components/Upload";
// import TableView from "./components/TableView";

// export default function App() {
//   const [lastTable, setLastTable] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="app-header">
//         <div className="app-container flex items-center justify-between py-3">
//           <div className="brand">
//             <div className="logo" aria-hidden>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <rect x="3" y="3" width="18" height="18" rx="4" fill="rgba(255,255,255,0.12)"/>
//                 <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </div>

//             <div>
//               <div className="text-lg font-semibold">PDF Extractor</div>
//               <div className="text-xs opacity-90">Upload • Extract • Export</div>
//             </div>
//           </div>

//           <nav className="hidden md:flex items-center gap-3">
//             <a className="text-sm text-white/90 hover:underline">Docs</a>
//             <a className="text-sm text-white/90 hover:underline">API</a>
//             <button className="btn-ghost">Try Demo</button>
//             <button className="btn-primary" onClick={() => alert("Use the uploader")}>Upload PDF</button>
//           </nav>

//           <div className="md:hidden">
//             <button className="btn-ghost" onClick={() => setMobileOpen(s => !s)}>Menu</button>
//           </div>
//         </div>

//         {mobileOpen && (
//           <div className="app-container md:hidden pb-3">
//             <div className="flex gap-2">
//               <a className="card flex-1 text-center">Docs</a>
//               <a className="card flex-1 text-center">API</a>
//             </div>
//           </div>
//         )}
//       </header>

//       <main className="app-container py-8">
//         <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-[360px_1fr]">
//           {/* left column */}
//           <div>
//             <div className="card">
//               <h3 className="mb-2">Upload PDF</h3>
//               {/* Your Upload component - ensure dashed container includes className 'upload-dashed' */}
//               <Upload onResult={(table) => setLastTable(table)} />
//               <div className="mt-3 text-sm text-slate-600">
//                 Selected: {lastTable?.filename ?? "No file"}
//               </div>
//             </div>

//             <div className="card mt-4">
//               <h3>Tips</h3>
//               <ul className="mt-2 text-sm list-disc pl-5">
//                 <li>Prefer PDFs with clear table borders for best extraction.</li>
//                 <li>Large tables scroll horizontally on mobile.</li>
//                 <li>Export CSV for spreadsheet edits.</li>
//               </ul>
//             </div>
//           </div>

//           {/* right column */}
//           <div>
//             <div className="card">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3>Extracted Table</h3>
//                   <div className="text-sm text-slate-500">Preview of parsed rows</div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="text-sm text-slate-500">Rows: {lastTable?.rows?.length ?? 0}</div>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 {lastTable ? (
//                   <TableView columns={lastTable.columns} rows={lastTable.rows} />
//                 ) : (
//                   <div className="text-center text-slate-500 py-10">No data yet — upload a PDF to see results.</div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="mt-8 text-sm text-slate-600">
//           <div className="flex items-center justify-between">
//             <div>© {new Date().getFullYear()} PDF Extractor</div>
//             <div className="flex gap-4">
//               <a>Privacy</a>
//               <a>Terms</a>
//             </div>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }

// src/App.jsx
import React, { useState } from "react";
import Upload from "./components/Upload";

import TableView from "./components/TableView";
import AnalyzePanel from "./components/AnalyzePanel";

export default function App() {
  const [lastTable, setLastTable] = useState(null); // { columns, rows, filename? }
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("upload"); // 'upload' | 'database'

  const uploadRows = lastTable?.rows ?? [];
  const uploadColumns = lastTable?.columns ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="app-header">
        <div className="app-container flex items-center justify-between py-3">
          <div className="brand">
            <div className="logo" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="4"
                  fill="rgba(255,255,255,0.12)"
                />
                <path
                  d="M7 12h10M12 7v10"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <div className="text-lg font-semibold">PDF Extractor</div>
              <div className="text-xs opacity-90">Upload • Extract • Export</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-3">
            <a className="text-sm text-white/90 hover:underline">Docs</a>
            <a className="text-sm text-white/90 hover:underline">API</a>
            <button
              className="btn-ghost"
              onClick={() => alert("Use the uploader on the left 😊")}
            >
              Try Demo
            </button>
            <button
              className="btn-primary"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Upload PDF
            </button>
          </nav>

          <div className="md:hidden">
            <button
              className="btn-ghost"
              onClick={() => setMobileOpen((s) => !s)}
            >
              Menu
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="app-container md:hidden pb-3">
            <div className="flex gap-2">
              <a className="card flex-1 text-center">Docs</a>
              <a className="card flex-1 text-center">API</a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="app-container py-8">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-[360px_1fr]">
          {/* LEFT COLUMN */}
          <div>
            <div className="card">
              <h3 className="mb-2">Upload PDF</h3>
              <Upload onResult={(table) => setLastTable(table)} />
              <div className="mt-3 text-sm text-slate-600">
                Selected: {lastTable?.filename ?? "No file"}
              </div>
            </div>

            <div className="card mt-4">
              <h3>Tips</h3>
              <ul className="mt-2 text-sm list-disc pl-5">
                <li>Prefer PDFs with clear table borders for best extraction.</li>
                <li>Large tables scroll horizontally on mobile.</li>
                <li>Export CSV for spreadsheet edits.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3>
                    {viewMode === "upload" ? "Last upload" : "Database view"}
                  </h3>
                  <div className="text-sm text-slate-500">
                    {viewMode === "upload"
                      ? "Preview of your latest extracted table."
                      : "Snapshot of rows stored in the database."}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center bg-slate-100 rounded-full p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode("upload")}
                      className={
                        "px-3 py-1 rounded-full transition " +
                        (viewMode === "upload"
                          ? "bg-white shadow text-slate-900"
                          : "text-slate-500")
                      }
                    >
                      Last upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("database")}
                      className={
                        "px-3 py-1 rounded-full transition " +
                        (viewMode === "database"
                          ? "bg-white shadow text-slate-900"
                          : "text-slate-500")
                      }
                    >
                      View database
                    </button>
                  </div>

                  {viewMode === "upload" && (
                    <div className="text-xs text-slate-500">
                      Rows: {uploadRows.length}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                {viewMode === "upload" ? (
                  lastTable ? (
                    <>
                      <TableView
                        columns={uploadColumns}
                        rows={uploadRows}
                      />
                      <AnalyzePanel
                        title="Analyze last upload"
                        columns={uploadColumns}
                        rows={uploadRows}
                      />
                    </>
                  ) : (
                    <div className="text-center text-slate-500 py-10">
                      No data yet — upload a PDF on the left to see results.
                    </div>
                  )
                ) : (
                  <DatabaseView />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 text-sm text-slate-600">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} PDF Extractor</div>
            <div className="flex gap-4">
              <a>Privacy</a>
              <a>Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
