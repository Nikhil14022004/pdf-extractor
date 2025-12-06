// src/components/DatabaseView.jsx
import React, { useEffect, useState } from "react";
import TableView from "./TableView";
import AnalyzePanel from "./AnalyzePanel";
import { getData } from "../api";

const DEFAULT_LIMIT = 100;

export default function DatabaseView() {
  const [data, setData] = useState(null); // { columns, rows, ... }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await getData(DEFAULT_LIMIT, 0);
      // expecting at least { columns, rows }
      setData(res);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load database data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const columns = data?.columns || [];
  const rows = data?.rows || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          Viewing latest records from database (max {DEFAULT_LIMIT} rows)
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-xs text-slate-500">Loading…</span>
          )}
          <button
            onClick={load}
            disabled={loading}
            className="text-xs px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {data ? (
        <>
          <TableView columns={columns} rows={rows} />
          <AnalyzePanel
            title="Database analysis (current page)"
            columns={columns}
            rows={rows}
          />
        </>
      ) : (
        !loading && (
          <div className="text-sm text-slate-500">
            No data received from the API. Check your backend `/api/data`
            implementation.
          </div>
        )
      )}
    </div>
  );
}
