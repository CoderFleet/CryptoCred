import React, { useState, useEffect } from "react";
import { ShieldCheck, Upload, Menu, AlertCircle, CheckCircle, LogOut, Search, ExternalLink } from "lucide-react";
import Link from 'next/link';
import authService from '../services/auth';
import { useRouter } from 'next/router';

// Header component - reused from FileUploadPage
function Header() {
  const router = useRouter();
  
  const handleLogout = () => {
    authService.logout();
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
                <Link href="/verify" className="text-[#B9F6CA] font-medium border-b-2 border-[#B9F6CA] pb-1">Verify</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium">Contact</Link>
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

// Define interfaces for TypeScript
interface VerificationResult {
  ipfsHash: string;
  certHash: string;
  calculatedHash: string;
  verified: boolean;
  timestamp: number;
}

interface VerificationResponse {
  wallet: string;
  certificates: VerificationResult[];
}

// Certificate Verification Component
const CertificateVerification = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [results, setResults] = useState<VerificationResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if wallet is already connected on page load
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setConnectedWallet(savedAddress);
      setWalletAddress(savedAddress);
    }
  }, []);

  // Connect wallet using the auth service
  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.connectWallet();
      if (result && result.user) {
        const address = result.user.walletAddress || localStorage.getItem('walletAddress');
        setConnectedWallet(address);
        setWalletAddress(address);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(error.message || "Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Disconnect wallet
  const disconnectWallet = () => {
    authService.logout();
    setConnectedWallet(null);
    setWalletAddress('');
    setResults(null);
    setError(null);
  };

  // Verify certificates for the given wallet address
  const verifyCertificates = async () => {
    if (!walletAddress || !isValidEthereumAddress(walletAddress)) {
      setError('Please enter a valid Ethereum wallet address (0x followed by 40 hexadecimal characters)');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults(null);

      const response = await fetch(`http://localhost:5000/verify-certificate/${walletAddress}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('No certificates found for this wallet address.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to verify certificates');
        }
        return;
      }
      
      const data = await response.json();
      setResults(data.certificates);
    } catch (err) {
      setError(`Error verifying certificates: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Check if string is a valid Ethereum address
  const isValidEthereumAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // View certificate on IPFS
  const viewCertificate = (ipfsHash: string) => {
    window.open(`https://scarlet-top-junglefowl-952.mypinata.cloud/ipfs/${ipfsHash}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Certificate Verification</h1>
              <p className="text-[#A7C7E7]">Verify blockchain certificates for any wallet address.</p>
            </div>
            {!connectedWallet ? (
              <button 
                onClick={connectWallet}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-70"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-[#A7C7E7]/30 flex items-center">
                  <span className="text-[#A7C7E7] text-sm">Connected:</span>
                  <span className="text-white ml-2 font-mono">{connectedWallet.substring(0, 6)}...{connectedWallet.substring(connectedWallet.length - 4)}</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="p-2 rounded-full bg-transparent border border-[#A7C7E7]/30 text-[#A7C7E7] hover:bg-[#A7C7E7]/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-md">
            <h3 className="text-white text-lg font-medium mb-4">Enter Wallet Address to Verify</h3>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                value={walletAddress} 
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="flex-1 bg-black/60 border border-[#A7C7E7]/50 rounded-lg px-4 py-3 text-white placeholder-[#A7C7E7]/50 focus:outline-none focus:ring-2 focus:ring-[#B9F6CA]/30 focus:border-[#B9F6CA]"
              />
              <button 
                onClick={verifyCertificates}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 rounded-xl flex items-start gap-3 bg-red-500/20 text-red-300 border border-red-500/50">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}
          </div>
          
          {results && results.length > 0 && (
            <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl overflow-hidden shadow-lg backdrop-blur-md mb-8">
              <div className="p-4 border-b border-[#A7C7E7]/30 bg-[#A7C7E7]/5">
                <h3 className="text-lg text-white font-medium">
                  Verification Results for <span className="font-mono">{connectedWallet || walletAddress}</span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#A7C7E7]/20">
                  <thead className="bg-[#A7C7E7]/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#A7C7E7] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#A7C7E7] uppercase tracking-wider">IPFS Hash</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#A7C7E7] uppercase tracking-wider">Certificate Hash</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#A7C7E7] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#A7C7E7] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A7C7E7]/20">
                    {results.map((cert, index) => (
                      <tr key={index} className="hover:bg-[#A7C7E7]/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {cert.verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#B9F6CA]/20 text-[#B9F6CA] text-xs font-medium border border-[#B9F6CA]/30">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/30">
                              <AlertCircle className="w-3 h-3" /> Invalid
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#A7C7E7] font-mono">{cert.ipfsHash.substring(0, 8)}...{cert.ipfsHash.substring(cert.ipfsHash.length - 8)}</td>
                        <td className="px-6 py-4 text-sm text-[#A7C7E7] font-mono">{cert.certHash.substring(0, 8)}...{cert.certHash.substring(cert.certHash.length - 8)}</td>
                        <td className="px-6 py-4 text-sm text-[#A7C7E7]">{formatDate(cert.timestamp)}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => viewCertificate(cert.ipfsHash)}
                            className="inline-flex items-center gap-1 text-[#B9F6CA] hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {results && results.length === 0 && (
            <div className="w-full bg-black/80 border border-[#A7C7E7] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md mb-8">
              <AlertCircle className="w-12 h-12 mb-4 text-[#A7C7E7]" />
              <h3 className="text-xl font-semibold text-white mb-2">No Certificates Found</h3>
              <p className="text-[#A7C7E7]">No certificates have been issued for this wallet address yet.</p>
            </div>
          )}
          
          <div className="mt-12 bg-black/80 rounded-3xl shadow-sm p-6 border border-[#A7C7E7] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-white mb-4">Verification Guidelines</h2>
            <ul className="space-y-2 text-[#A7C7E7]">
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Enter any Ethereum wallet address to verify certificates issued to that address
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Connect your own wallet to automatically check your certificates
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                Each certificate is verified against the blockchain to ensure authenticity
              </li>
              <li className="flex items-start">
                <span className="text-[#A7C7E7] mr-2">•</span>
                View your original certificates by clicking the "View" button
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificateVerification;