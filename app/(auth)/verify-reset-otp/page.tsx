"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export default function VerifyResetOtpPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      toast.error("Missing email context. Please start over.");
      router.push('/forgot-password');
    }
  }, [email, router]);

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-reset-otp', { email, otp });
      toast.success("Code verified successfully!");
      router.push(`/reset-password?email=${encodeURIComponent(email as string)}&otp=${encodeURIComponent(otp)}`);
    } catch (err: any) {
      toast.error("Error", { 
        description: err.response?.data?.message || "Invalid or expired OTP" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linkedin-bg font-sans">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Verify Code</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Enter the 6-digit code sent to <br/><span className="font-semibold text-gray-700">{email}</span></p>
        
        <div className="space-y-4">
          <Input 
            placeholder="6-digit OTP" 
            type="text" 
            maxLength={6}
            value={otp} 
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
            className="text-center tracking-[0.5em] font-mono text-lg"
          />
          <Button 
            onClick={handleVerifyOtp} 
            disabled={loading || !email} 
            className="w-full bg-linkedin-primary hover:bg-linkedin-primary/90 text-white"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}