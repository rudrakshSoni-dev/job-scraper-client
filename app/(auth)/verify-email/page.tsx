"use client"
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../lib/axios'; // Adjusted path based on your snippet
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

function VerifyEmailForm() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      toast.error("Missing email context. Please register again.");
      router.push('/');
    }
  }, [email, router]);

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-email', { email, otp });
      toast.success("Email verified successfully! You can now log in.");
      router.push('/');
    } catch (err: any) {
      toast.error("Error", { 
        description: err.response?.data?.message || "Invalid or expired OTP" 
      });
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handle the Enter key press ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default browser enter behavior
      // Only fire if the same conditions as the button are met
      if (!loading && email && otp.length === 6) {
        handleVerifyOtp();
      } else if (otp.length > 0 && otp.length < 6) {
        // Optional: show a quick error if they press enter too early
        toast.error("Please enter the full 6-digit code");
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.35 }} 
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Verify Your Email</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        We sent a 6-digit verification code to <br/>
        <span className="font-semibold text-gray-700">{email}</span>
      </p>
      
      <div className="space-y-4">
        <Input 
          placeholder="6-digit code" 
          type="text" 
          maxLength={6}
          value={otp} 
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
          onKeyDown={handleKeyDown} // --- NEW: Attached the listener here ---
          className="text-center tracking-[0.5em] font-mono text-lg"
        />
        
        <Button 
          onClick={handleVerifyOtp} 
          disabled={loading || !email || otp.length < 6} 
          className="w-full bg-black hover:bg-linkedin-primary/90 text-white"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </Button>
        
        <div className="text-center mt-4">
          <span 
            onClick={() => router.push('/')} 
            className="text-gray-500 cursor-pointer text-sm hover:text-linkedin-primary hover:underline transition-colors"
          >
            Back to Login
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linkedin-bg font-sans">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}