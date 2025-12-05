import React, { useState } from "react";
import Upload from "./components/Upload";

export default function App() {
  const [setSelectedDocId] = useState(null);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">PDF Extractor</h1>
          <div className="text-sm text-slate-600">React + Vite + Tailwind</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Upload onUploaded={(docId) => setSelectedDocId(docId)} />
          </div>
        </div>
      </div>
    </div>
  );
}
