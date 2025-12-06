// src/components/AnalyzePanel.jsx
import React, { useMemo } from "react";

function toNumber(val) {
  if (val === null || val === undefined || val === "") return null;
  const s = String(val).replace(/,/g, "").trim();
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

export default function AnalyzePanel({ title, columns = [], rows = [] }) {
  const { totalRows, totalCols, numericCols, numericStats } = useMemo(() => {
    const totalRows = rows.length;
    const totalCols = columns.length;

    // detect numeric columns (based on sample)
    const numericCols = columns.filter((col) => {
      const sample = rows.slice(0, 50);
      let sawValue = false;
      for (const r of sample) {
        const num = toNumber(r?.[col]);
        if (num === null) continue;
        sawValue = true;
        if (Number.isNaN(num)) return false;
      }
      return sawValue;
    });

    const numericStats = {};
    for (const col of numericCols) {
      let count = 0;
      let sum = 0;
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      for (const r of rows) {
        const num = toNumber(r?.[col]);
        if (num === null || Number.isNaN(num)) continue;
        count += 1;
        sum += num;
        if (num < min) min = num;
        if (num > max) max = num;
      }

      if (count > 0) {
        numericStats[col] = {
          count,
          avg: sum / count,
          min,
          max,
        };
      }
    }

    return { totalRows, totalCols, numericCols, numericStats };
  }, [columns, rows]);

  if (!columns.length || !rows.length) {
    return (
      <div className="card mt-4">
        <h3 className="mb-2">{title || "Analysis"}</h3>
        <div className="text-sm text-slate-500">
          Not enough data to analyze. Upload a table or load database rows.
        </div>
      </div>
    );
  }

  return (
    <div className="card mt-4">
      <h3 className="mb-2">{title || "Analysis"}</h3>

      <div className="grid gap-3 sm:grid-cols-3 text-sm mb-3">
        <div>
          <div className="text-xs uppercase text-slate-400">Rows</div>
          <div className="text-base text-slate-800">{totalRows}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-400">Columns</div>
          <div className="text-base text-slate-800">{totalCols}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-400">Numeric cols</div>
          <div className="text-base text-slate-800">{numericCols.length}</div>
        </div>
      </div>

      {numericCols.length > 0 && (
        <div className="mt-2 text-xs sm:text-sm">
          <div className="font-medium text-slate-700 mb-1">
            Quick stats on numeric columns
          </div>
          <div className="space-y-1">
            {numericCols.map((col) => {
              const stat = numericStats[col];
              if (!stat) return null;
              return (
                <div
                  key={col}
                  className="flex flex-wrap justify-between border border-slate-100 rounded-md px-2 py-1.5"
                >
                  <div className="font-medium text-slate-700">{col}</div>
                  <div className="flex flex-wrap gap-3 text-slate-600">
                    <span>avg: {stat.avg.toFixed(2)}</span>
                    <span>min: {stat.min}</span>
                    <span>max: {stat.max}</span>
                    <span>n: {stat.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-slate-400">
        * Numeric detection is heuristic (based on sampled rows and number parsing).
      </div>
    </div>
  );
}
