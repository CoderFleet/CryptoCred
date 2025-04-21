import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Head from 'next/head';
import { ShieldCheck, Upload, Menu, AlertCircle, CheckCircle, LogOut, Search, Eye, X, Download, ExternalLink, Calendar, Award, User } from "lucide-react";
import Link from 'next/link';
import authService from '../services/auth';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  
  const handleLogout = () => {
    authService.logout();
    // Redirect to login page or home page after logout
    router.push('/sign-in');
  };

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
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
             
              <li>
                <Link href="/certificates" className="text-[#B9F6CA] font-medium border-b-2 border-[#B9F6CA] pb-1">Certificates</Link>
              </li>
            </ul>
            <button 
              onClick={handleLogout}
              className="ml-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-[#A7C7E7] text-[#A7C7E7] hover:bg-[#A7C7E7]/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center rounded-full p-2 bg-transparent border border-[#A7C7E7] text-[#A7C7E7] hover:bg-[#A7C7E7]/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#A7C7E7]/10 transition">
              <Menu className="h-7 w-7 text-[#A7C7E7]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Certificate Modal Component
const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#0a0a0a] to-[#181818] border border-[#A7C7E7] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#A7C7E7]/20 to-[#B9F6CA]/20 p-6 flex justify-between items-center border-b border-[#A7C7E7]/30">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-[#B9F6CA]" />
            <h2 className="text-xl font-bold text-white">{certificate.name || "Certificate Details"}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A7C7E7] hover:text-white p-2 rounded-full hover:bg-black/40 transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Certificate Image/Preview Placeholder */}
          <div className="bg-black/40 rounded-lg p-4 mb-6 flex items-center justify-center border border-[#A7C7E7]/20 aspect-video">
            {certificate.imageUrl ? (
              <img src={certificate.imageUrl} alt="Certificate" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-center">
                <Award className="h-16 w-16 text-[#A7C7E7]/50 mx-auto mb-3" />
                <p className="text-[#A7C7E7]/70">Certificate Preview Not Available</p>
              </div>
            )}
          </div>
          
          {/* Certificate Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#B9F6CA] pb-2 border-b border-[#A7C7E7]/30">Certificate Information</h3>
              
              <div>
                <p className="text-[#A7C7E7]/70 text-sm mb-1">Name</p>
                <p className="text-white font-medium">{certificate.name || "Unnamed Certificate"}</p>
              </div>
              
              {certificate.description && (
                <div>
                  <p className="text-[#A7C7E7]/70 text-sm mb-1">Description</p>
                  <p className="text-white">{certificate.description}</p>
                </div>
              )}
              
              {certificate.issueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#A7C7E7]" />
                  <div>
                    <p className="text-[#A7C7E7]/70 text-sm">Issue Date</p>
                    <p className="text-white">{new Date(certificate.issueDate * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              
              {certificate.expiryDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#A7C7E7]" />
                  <div>
                    <p className="text-[#A7C7E7]/70 text-sm">Expiry Date</p>
                    <p className="text-white">{new Date(certificate.expiryDate * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#B9F6CA] pb-2 border-b border-[#A7C7E7]/30">Blockchain Details</h3>
              
              {certificate.issuer && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#A7C7E7]" />
                  <div>
                    <p className="text-[#A7C7E7]/70 text-sm">Issuer</p>
                    <p className="text-white font-medium">{certificate.issuer}</p>
                  </div>
                </div>
              )}
              
              {certificate.transactionHash && (
                <div>
                  <p className="text-[#A7C7E7]/70 text-sm mb-1">Transaction Hash</p>
                  <p className="text-[#B9F6CA] font-mono text-sm truncate">{certificate.transactionHash}</p>
                </div>
              )}
              
              {certificate.ipfsHash && (
                <div>
                  <p className="text-[#A7C7E7]/70 text-sm mb-1">IPFS Hash</p>
                  <p className="text-[#B9F6CA] font-mono text-sm truncate">{certificate.ipfsHash}</p>
                </div>
              )}
              
              {certificate.tokenId && (
                <div>
                  <p className="text-[#A7C7E7]/70 text-sm mb-1">Token ID</p>
                  <p className="text-[#B9F6CA] font-mono text-sm">{certificate.tokenId}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Metadata */}
          {certificate.metadata && Object.keys(certificate.metadata).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#B9F6CA] pb-2 border-b border-[#A7C7E7]/30 mb-4">Additional Details</h3>
              <pre className="bg-black/40 p-4 rounded-lg text-sm overflow-x-auto text-[#B9F6CA] border border-[#A7C7E7]/20">
                {JSON.stringify(certificate.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-[#A7C7E7]/30 p-4 flex justify-end gap-3 bg-black/40">
          {certificate.verificationUrl && (
            <a 
              href={certificate.verificationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 flex items-center gap-2 bg-transparent border border-[#A7C7E7] text-[#A7C7E7] rounded-lg hover:bg-[#A7C7E7]/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Verify</span>
            </a>
          )}
          {certificate.downloadUrl && (
            <a 
              href={certificate.downloadUrl}
              className="px-4 py-2 flex items-center gap-2 bg-transparent border border-[#A7C7E7] text-[#A7C7E7] rounded-lg hover:bg-[#A7C7E7]/10 transition-all"
              download
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          )}
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CertificatesPage() {
  const [walletInput, setWalletInput] = useState('');
  const [wallet, setWallet] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [userAddress, setUserAddress] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Check if wallet is already connected on page load
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setUserAddress(savedAddress);
      setWalletInput(savedAddress);
    }
  }, []);

  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(walletInput)) {
      setError('Invalid wallet address');
      return;
    }

    setWallet(walletInput);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/get-certificates/${walletInput}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch certificates');
      }
      const data = await response.json();
      
      // Enhance certificates with additional properties for demo
      // (You can remove this if you're already getting full data from your API)
      const enhancedCertificates = data.map((cert, index) => ({
        ...cert,
        // Add sample properties if they don't exist in the API response
        description: cert.description || `Certificate issued for demonstrating blockchain verification technology.`,
        transactionHash: cert.transactionHash || `0x${Math.random().toString(16).substring(2, 62)}`,
        ipfsHash: cert.ipfsHash || `Qm${Math.random().toString(36).substring(2, 45)}`,
        tokenId: cert.tokenId || `${index + 1}`,
        verificationUrl: cert.verificationUrl || `https://etherscan.io/`,
      }));
      
      setCertificates(enhancedCertificates);
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError(err.message);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  // Connect wallet using the auth service
  const connectWallet = async () => {
    setError(null);
    
    try {
      const result = await authService.connectWallet();
      if (result && result.user) {
        const address = result.user.walletAddress || localStorage.getItem('walletAddress');
        setUserAddress(address);
        setWalletInput(address);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(error.message || "Failed to connect wallet. Please try again.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    authService.logout();
    setUserAddress("");
    setWalletInput("");
    setWallet("");
    setCertificates([]);
    setError(null);
  };

  // View certificate details
  const viewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  // Close certificate modal
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  const renderCertificateCard = (cert, index) => (
    <div key={index} className="bg-black/80 border border-[#A7C7E7] rounded-xl p-6 mb-4 shadow-lg backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{cert.name || `Certificate #${index + 1}`}</h3>
        <button 
          onClick={() => viewCertificate(cert)}
          className="p-2 text-[#A7C7E7] hover:text-[#B9F6CA] hover:bg-[#A7C7E7]/10 rounded-lg transition-all flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {cert.issueDate && (
            <p className="text-[#A7C7E7] mb-2">
              <span className="font-medium">Issued:</span> {new Date(cert.issueDate * 1000).toLocaleDateString()}
            </p>
          )}
          {cert.expiryDate && (
            <p className="text-[#A7C7E7] mb-2">
              <span className="font-medium">Expires:</span> {new Date(cert.expiryDate * 1000).toLocaleDateString()}
            </p>
          )}
          {cert.issuer && (
            <p className="text-[#A7C7E7]">
              <span className="font-medium">Issuer:</span> {cert.issuer}
            </p>
          )}
        </div>
        <div>
          {cert.description && (
            <p className="text-[#A7C7E7] text-sm mb-2 line-clamp-2">{cert.description}</p>
          )}
          {cert.ipfsHash && (
            <p className="text-[#A7C7E7] text-sm mb-2">
              <span className="font-medium">IPFS:</span> <span className="text-[#B9F6CA] font-mono">{cert.ipfsHash.substring(0, 15)}...</span>
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => viewCertificate(cert)}
          className="px-4 py-2 bg-gradient-to-r from-[#A7C7E7]/20 to-[#B9F6CA]/20 text-[#A7C7E7] rounded-lg border border-[#A7C7E7]/30 hover:bg-[#A7C7E7]/30 transition-all flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Certificate</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] flex flex-col">
      <Head>
        <title>Blockchain Certificates | CryptoCred</title>
        <meta name="description" content="View blockchain certificates by wallet address" />
      </Head>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Certificates</h1>
              <p className="text-[#A7C7E7]">View blockchain certificates by wallet address</p>
            </div>
            {userAddress ? (
              <div className="flex items-center gap-3">
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-[#A7C7E7]/30 flex items-center">
                  <span className="text-[#A7C7E7] text-sm">Connected:</span>
                  <span className="text-white ml-2 font-mono">{userAddress.substring(0, 6)}...{userAddress.substring(userAddress.length - 4)}</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="p-2 rounded-full bg-transparent border border-[#A7C7E7]/30 text-[#A7C7E7] hover:bg-[#A7C7E7]/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="px-4 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>

          <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-semibold text-white mb-4">Search Certificates</h2>
            <form onSubmit={handleWalletSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
                placeholder="Enter wallet address (0x...)"
                className="flex-grow bg-black/60 border border-[#A7C7E7]/50 rounded-lg px-4 py-2 text-white placeholder-[#A7C7E7]/50 focus:outline-none focus:ring-2 focus:ring-[#B9F6CA]/30 focus:border-[#B9F6CA]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
            
            {error && (
              <div className="mt-4 p-4 rounded-xl flex items-start gap-3 bg-red-500/20 text-red-300 border border-red-500/50">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>Error: {error}</div>
              </div>
            )}
          </div>

          {wallet && (
            <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-md">
              <h2 className="text-xl font-semibold text-white mb-2">Certificates for</h2>
              <p className="font-mono text-sm bg-black/40 p-3 rounded-lg mb-6 break-all text-[#B9F6CA] border border-[#A7C7E7]/20">{wallet}</p>

              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B9F6CA]"></div>
                </div>
              ) : certificates.length === 0 ? (
                <div className="text-center py-8 text-[#A7C7E7] bg-black/40 rounded-xl border border-[#A7C7E7]/20">
                  <AlertCircle className="w-12 h-12 mb-4 mx-auto opacity-70" />
                  <p>No certificates found for this wallet address.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert, index) => renderCertificateCard(cert, index))}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 bg-black/80 rounded-3xl shadow-sm p-6 border border-[#A7C7E7] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-white mb-4">Certificate Verification Information</h2>
            <ul className="space-y-2 text-[#A7C7E7]">
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                All certificates are securely stored on the blockchain
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Each certificate has a unique digital signature that can be verified
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Search for certificates by entering an Ethereum wallet address
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Certificate metadata is stored using IPFS for decentralized access
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={closeCertificateModal}
        />
      )}
    </div>
  );
}