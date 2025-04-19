"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Award, Info, Wallet } from 'lucide-react';
import AuthLayout from '@/components/auth/auth-layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulating login API call
    try {
      // In a real app, this would be an API call
      console.log('Logging in with:', email, password);
      
      // Show simulated loading for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - would redirect to dashboard in real app
      setIsLoading(false);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate wallet connection
      console.log('Connecting wallet...');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
    } catch (err) {
      setError('Wallet connection failed. Please try again.');
      setIsLoading(false);
    }
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
            
            <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
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
            
            <Button 
              onClick={handleWalletConnect} 
              className="w-full gap-2" 
              variant="gradient"
              disabled={isLoading}
            >
              <Wallet className="w-4 h-4" />
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
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
