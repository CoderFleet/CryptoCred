import React, { useState } from "react";
import { ShieldCheck, Upload, Menu, AlertCircle, CheckCircle } from "lucide-react";

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
const FileUpload = ({ userAddress }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile) => {
    // Check file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage({ text: "File is too large. Maximum size is 10MB.", type: "error" });
      return;
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (!validTypes.includes(selectedFile.type)) {
      setMessage({ text: "Invalid file type. Please upload JPG, PNG, PDF, DOCX, or XLSX.", type: "error" });
      return;
    }

    setFile(selectedFile);
    setMessage({ text: `File "${selectedFile.name}" selected for upload.`, type: "info" });
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage({ text: "Please select a file to upload.", type: "error" });
      return;
    }

    setUploading(true);
    setMessage({ text: "Uploading and processing your file...", type: "info" });

    const formData = new FormData();
    formData.append("certificateFile", file);
    formData.append("userAddress", userAddress);

    try {
      const response = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          text: `Certificate issued successfully! IPFS Hash: ${result.ipfsHash}`, 
          type: "success" 
        });
      } else {
        setMessage({ 
          text: `Error: ${result.error || result.message || "Failed to issue certificate"}`, 
          type: "error" 
        });
      }
    } catch (error) {
      setMessage({ 
        text: `Error: ${error.message || "Failed to communicate with server"}`, 
        type: "error" 
      });
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg backdrop-blur-md mb-8">
      <label 
        className={`block w-full cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed 
          ${dragging ? 'border-[#B9F6CA] bg-[#B9F6CA]/20' : 'border-[#A7C7E7]'} 
          rounded-2xl bg-gradient-to-br from-[#A7C7E7]/10 to-[#B9F6CA]/10 text-white 
          hover:bg-[#A7C7E7]/20 transition-all`}
        >
          {file ? (
            <>
              <CheckCircle className="w-12 h-12 mb-2 text-[#B9F6CA]" />
              <span className="font-semibold text-lg mb-2">File selected</span>
              <span className="text-[#A7C7E7]">{file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
            </>
          ) : (
            <>
              <svg className="w-12 h-12 mb-2 text-[#A7C7E7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="font-semibold text-lg">Drag & drop files here or click to select</span>
            </>
          )}
          <input type="file" onChange={handleFileChange} className="hidden" />
        </div>
      </label>

      {message.text && (
        <div className={`mt-4 p-4 rounded-xl w-full flex items-start gap-3 ${
          message.type === "error" ? "bg-red-500/20 text-red-300 border border-red-500/50" :
          message.type === "success" ? "bg-green-500/20 text-green-300 border border-green-500/50" :
          "bg-blue-500/20 text-blue-300 border border-blue-500/50"
        }`}>
          {message.type === "error" ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : message.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <Upload className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div>{message.text}</div>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        {file && (
          <>
            <button 
              onClick={resetUpload} 
              className="px-6 py-2 bg-transparent border border-[#A7C7E7] text-[#A7C7E7] rounded-lg hover:bg-[#A7C7E7]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              Reset
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              {uploading ? 'Processing...' : 'Issue Certificate'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const FileUploadPage = () => {
  // In a real app, you would get this from context or state management
  const [userAddress, setUserAddress] = useState("");
  
  // Mock function to connect wallet
  const connectWallet = async () => {
    // This would normally interact with MetaMask or another wallet
    try {
      // Mock wallet connection
      setUserAddress("0x2109DD9dccd080Da8fED417E5dc83b3D541F0fa0");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">File Upload</h1>
              <p className="text-[#A7C7E7]">Upload your files securely and easily.</p>
            </div>
            {!userAddress ? (
              <button 
                onClick={connectWallet}
                className="px-4 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="bg-black/40 px-4 py-2 rounded-lg border border-[#A7C7E7]/30">
                <span className="text-[#A7C7E7] text-sm">Connected:</span>
                <span className="text-white ml-2 font-mono">{userAddress}</span>
              </div>
            )}
          </div>
          
          {userAddress ? (
            <FileUpload userAddress={userAddress} />
          ) : (
            <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg backdrop-blur-md mb-8">
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 mb-4 text-[#A7C7E7] mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Wallet Connection Required</h3>
                <p className="text-[#A7C7E7] mb-4">Please connect your wallet to upload and verify certificates.</p>
                <button 
                  onClick={connectWallet}
                  className="px-6 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
          
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