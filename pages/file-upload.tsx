import React from "react";
import { ShieldCheck, Upload, Menu } from "lucide-react";

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#181818] to-[#0a0a0a] shadow rounded-b-3xl mb-8 border-b border-[#A7C7E7]/30 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Upload className="h-8 w-8 text-[#A7C7E7]" />
            <span className="inline-flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-extrabold tracking-wide font-mono bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow-[0_2px_16px_rgba(167,199,231,0.18)]">
                CryptoCred
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#A7C7E7] via-[#B9F6CA] to-white p-1 shadow border border-[#A7C7E7] ml-1">
                <ShieldCheck className="w-5 h-5 text-black/70" />
              </span>
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium">Home</a>
              </li>
              <li>
                <a href="#" className="text-[#B9F6CA] font-medium border-b-2 border-[#B9F6CA] pb-1">Upload</a>
              </li>
              <li>
                <a href="#" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium">My Files</a>
              </li>
              <li>
                <a href="#" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium">Settings</a>
              </li>
              <li>
                <a href="/contact" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium">Contact</a>
              </li>
            </ul>
          </nav>
          <button className="md:hidden p-2 rounded-full hover:bg-[#A7C7E7]/10 transition">
            <Menu className="h-7 w-7 text-[#A7C7E7]" />
          </button>
        </div>
      </div>
    </header>
  );
}

// FileUpload component styled with glassy theme and drag-and-drop
const FileUpload: React.FC = () => {
  return (
    <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg backdrop-blur-md mb-8">
      <label className="block w-full cursor-pointer">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#A7C7E7] rounded-2xl bg-gradient-to-br from-[#A7C7E7]/10 to-[#B9F6CA]/10 text-white hover:bg-[#A7C7E7]/20 transition-all">
          <svg className="w-12 h-12 mb-2 text-[#A7C7E7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span className="font-semibold text-lg">Drag & drop files here or click to select</span>
          <input type="file" multiple className="hidden" />
        </div>
      </label>
    </div>
  );
};

const FileUploadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">File Upload</h1>
          <p className="text-[#A7C7E7] mb-8">Upload your files securely and easily.</p>
          <FileUpload />
          <div className="mt-12 bg-black/80 rounded-3xl shadow-sm p-6 border border-[#A7C7E7] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Guidelines</h2>
            <ul className="space-y-2 text-[#A7C7E7]">
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Maximum file size: <span className="font-medium">10MB</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Supported formats: <span className="font-medium">JPG, PNG, PDF, DOCX, XLSX</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Upload multiple files at once by selecting them all or using drag and drop
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Your files are securely stored and protected
              </li>
            </ul>
          </div>
        </div>
      </main>

    </div>
  );
};

export default FileUploadPage;
