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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Wallet } from 'lucide-react';
import AuthLayout from '@/components/auth/auth-layout';
import { authService } from '@/services/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push('/sign-up');
    }
  }, [router]);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    try {
      await authService.register(email, password, role);
      setSuccess('Registration successful! Please log in.');
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await authService.connectWallet();
      setSuccess('Wallet connected successfully!');
      
      // Redirect after successful wallet connection
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Wallet connection failed. Please try again.');
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
          <form onSubmit={handleEmailRegister} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="institute">Educational Institute</SelectItem>
                </SelectContent>
              </Select>
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
              {isLoading ? 'Signing up...' : 'Sign Up'}
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
                    Connect your wallet to sign up using your blockchain identity. This method is secure and doesn't require a password.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wallet-role">Account Type</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="institute">Educational Institute</SelectItem>
                </SelectContent>
              </Select>
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
          Already have an account?{" "}
          <Link href="/sign-in" className="bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-white bg-clip-text text-transparent font-semibold hover:underline dark:from-white dark:via-[#A7C7E7] dark:to-[#B9F6CA]">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}