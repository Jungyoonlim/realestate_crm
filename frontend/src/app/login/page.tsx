"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();

  // Automatically redirect to dashboard on page load
  useEffect(() => {
    // Set a fake token to simulate being logged in
    localStorage.setItem('token', 'fake-jwt-token');
    
    // Short delay for a smoother UX before redirect
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 500);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  // Allow user to manually navigate if automatic redirect doesn't work
  const handleManualLogin = () => {
    localStorage.setItem('token', 'fake-jwt-token');
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Redirecting...</h1>
        <p className="text-gray-600">You are being automatically logged in.</p>
        <Button onClick={handleManualLogin} className="w-full">
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}