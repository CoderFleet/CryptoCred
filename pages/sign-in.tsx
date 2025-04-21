"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Wallet, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/auth-layout';
import { authService } from '@/services/auth';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  // Check if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      redirectBasedOnUserRole();
    }
    
    // Check if wallet is already connected
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, [router]);

  // Function to handle redirection based on user role
  const redirectBasedOnUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User Role:', user.role);
    if (user.role === 'institute') {
      router.push('/file-upload');
    } else if (user.role === 'student') {
      router.push('/files');
    } else {
      // Default redirection if role is not specified
      router.push('/verify');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await authService.login(email, password);
      setSuccess('Login successful!');
      
      // Redirect after successful login based on user role
      setTimeout(() => {
        redirectBasedOnUserRole();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };


  const handleWalletConnect = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
  
    try {
      if (!window.ethereum || typeof window.ethereum.request !== 'function') {
        throw new Error('MetaMask is not installed or not properly configured.');
      }
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setWalletAddress(address);
      console.log('Connected Wallet Address:', address);
  
      // Fetch nonce directly with axios
      const nonceResponse = await axios.get(`http://localhost:5000/auth/wallet-nonce?address=${address}`);
      const nonce = nonceResponse.data.nonce;
      console.log('Nonce:', nonce);
  
      const messageToSign = `Authenticate with CryptoCred: ${nonce}`;
  
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageToSign, address],
      });
      console.log("signature",signature);
      const authResponse = await axios.post('http://localhost:5000/auth/wallet-auth', {
        address,
        signature,
      });
  
      console.log('Auth Response:', authResponse.data);
  
      if (authResponse.data.token) {
        localStorage.setItem('token', authResponse.data.token);
        localStorage.setItem('user', JSON.stringify(authResponse.data.user));
        localStorage.setItem('walletAddress', address);
  
        setSuccess('Wallet connected successfully!');
  
        setTimeout(() => {
          redirectBasedOnUserRole();
        }, 1000);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
  
      if (err.code === 4001) {
        setError('You rejected the connection request. Please approve MetaMask connection to continue.');
      } else if (err.code === -32002) {
        setError('MetaMask is already processing a connection request. Please check your MetaMask extension.');
      } else {
        setError(err.message || 'Wallet connection failed. Please try again.');
      }
  
      setIsLoading(false);
    }
  };
  
  const disconnectWallet = () => {
    localStorage.removeItem('walletAddress');
    setWalletAddress('');
  };

  return (
    <AuthLayout>
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200/60 backdrop-blur border border-gray-300/40 rounded-xl shadow-sm">
          <TabsTrigger className="data-[state=active]:bg-white/60 data-[state=active]:font-semibold rounded-xl transition-all" value="email">Email</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="default" className="bg-green-500/20 text-green-300 border border-green-500/50">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="wallet">
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">
                    Connect your wallet to sign in using your blockchain identity. This method is secure and doesn't require a password.
                  </p>
                </div>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="default" className="bg-green-500/20 text-green-300 border border-green-500/50">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            {walletAddress ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg border border-border">
                  <div className="truncate">
                    <p className="text-xs text-muted-foreground">Connected Wallet</p>
                    <p className="font-mono text-sm truncate">{walletAddress}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
                
                <Button 
                  onClick={handleWalletConnect} 
                  className="w-full gap-2" 
                  variant="gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      Sign In with Wallet
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleWalletConnect} 
                className="w-full gap-2" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </>
                )}
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <Separator className="my-4" />
        <p className="text-center text-sm text-white dark:text-white">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-white bg-clip-text text-transparent font-semibold hover:underline dark:from-white dark:via-[#A7C7E7] dark:to-[#B9F6CA]">
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}