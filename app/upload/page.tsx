"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleUpload() {
    if (!file) return;
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setStatus(`Uploaded! Hash: ${data.hash}`);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Upload Certificate</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="my-4"
      />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Upload & Mint NFT
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
