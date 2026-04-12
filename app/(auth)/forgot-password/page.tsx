"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '../../lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success("OTP sent to your email!");
      router.push(`/verify-reset-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error("Error", { 
        description: err.response?.data?.message || "Failed to send reset email" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linkedin-bg font-sans">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Enter your email and we'll send you a code to reset your password.</p>
        
        <div className="space-y-4">
          <Input 
            placeholder="Email address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Button 
            onClick={handleSendOtp} 
            disabled={loading} 
            className="w-full bg-linkedin-primary hover:bg-linkedin-primary/90 text-white"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
          <div className="text-center mt-4">
            <span onClick={() => router.push('/')} className="text-linkedin-primary cursor-pointer text-sm hover:underline">
              Back to Login
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}