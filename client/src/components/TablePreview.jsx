// src/components/TablesPreview.jsx
import React from "react";

/**
 * Convert rows_as_objects OR headers+rows to CSV and trigger download.
 * table: { headers, norm_headers, rows, rows_as_objects, page }
 */
function csvDownload(table, filename = "table.csv") {
  // prefer rows_as_objects if present
  let headers = table.norm_headers && table.norm_headers.length ? table.norm_headers : (table.headers || []);
  let rows = [];

  if (table.rows_as_objects && table.rows_as_objects.length) {
    rows = table.rows_as_objects.map((r) => headers.map((h) => (r[h] !== undefined ? r[h] : "")));
  } else {
    // build from raw rows aligning with headers
    rows = (table.rows || []).map((r) => {
      // ensure length equals headers.length
      const arr = [];
      for (let i = 0; i < headers.length; i++) {
        arr.push(r[i] !== undefined && r[i] !== null ? String(r[i]) : "");
      }
      return arr;
    });
  }

  // build CSV
  const escape = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    // wrap fields that contain comma or quotes or newline
    if (s.includes('"') || s.includes(",") || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const csvLines = [];
  csvLines.push(headers.map(escape).join(","));
  rows.forEach((r) => csvLines.push(r.map(escape).join(",")));
  const csv = csvLines.join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function TablesPreview({ tables = [], fields = {} }) {
  if (!tables || tables.length === 0) {
    return <div className="text-sm text-slate-500">No tables found in this PDF.</div>;
  }

  return (
    <div className="space-y-6">
      {tables.map((t, idx) => {
        const title = t.headers && t.headers.length ? `Table ${idx + 1} (page ${t.page || "?"})` : `Table ${idx + 1}`;
        const headers = (t.norm_headers && t.norm_headers.length) ? t.norm_headers : (t.headers || []);
        const rows = t.rows_as_objects && t.rows_as_objects.length
          ? t.rows_as_objects
          : (t.rows || []).map((r) => {
              const obj = {};
              for (let i = 0; i < headers.length; i++) {
                obj[headers[i]] = r[i] !== undefined && r[i] !== null ? r[i] : "";
              }
              return obj;
            });

        return (
          <div key={idx} className="bg-white border rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">{title}</h4>
                {t.headers && t.headers.length > 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    Raw headers: {t.headers.join(" • ")}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => csvDownload(t, `table_${idx + 1}.csv`)}
                  className="text-sm px-3 py-1 bg-slate-100 rounded hover:bg-slate-200"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="p-2 text-left">{h || `col_${i+1}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr><td className="p-2 text-slate-500" colSpan={headers.length}>No rows</td></tr>
                  ) : (
                    rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 ? "bg-white" : "bg-slate-50"}>
                        {headers.map((h, cIdx) => (
                          <td key={cIdx} className="p-2 align-top">{row[h]}</td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
