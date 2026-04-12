"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';
import { saveUserToCookies } from '../lib/cookies';
import { useAuth } from '../context/AuthContext';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from "sonner";

export default function AuthHub() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', { email, password });

        // ✅ SUCCESS LOGIN → dashboard
        saveUserToCookies(data.user, data.token);
        login(data.user, data.token);

        toast.success("Welcome back!");
        router.push('/analyzer');
      } else {
        // ✅ REGISTER → verify email
        await api.post('/auth/register', { name, email, password });

        toast.success("Account created! Verify your email.");
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      }
    } catch (err: any) {
      const message = err.response?.data?.message?.toLowerCase() || "";

      if (isLogin) {
        // ❌ INVALID CREDENTIALS
        if (message.includes("invalid") || message.includes("credential")) {
          toast.error("Invalid credentials");
        }
        // ❌ EMAIL NOT VERIFIED
        else if (message.includes("verif")) {
          toast.error("Email not verified", {
            description: "Resending OTP..."
          });

          try {
            await api.post('/auth/resend-otp', { email });
          } catch {}

          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        }
        // ❌ FALLBACK
        else {
          toast.error("Login failed", {
            description: err.response?.data?.message || "Try again"
          });
        }
      } else {
        // ❌ REGISTER ERRORS
        toast.error("Registration failed", {
          description: err.response?.data?.message || "Try again"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linkedin-bg font-sans">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200"
      >
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4 border-b border-gray-200 pb-2">
          <div
            onClick={() => setIsLogin(true)}
            className={`cursor-pointer pb-2 transition ${
              isLogin
                ? 'border-b-2 border-linkedin-primary text-linkedin-primary font-semibold'
                : 'text-gray-500'
            }`}
          >
            Login
          </div>
          <div
            onClick={() => setIsLogin(false)}
            className={`cursor-pointer pb-2 transition ${
              !isLogin
                ? 'border-b-2 border-linkedin-primary text-linkedin-primary font-semibold'
                : 'text-gray-500'
            }`}
          >
            Register
          </div>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* ✅ INTERACTIVE BUTTON */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-black hover:bg-linkedin-primary/90 text-white"
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </motion.div>

          {isLogin && (
            <div className="text-center mt-4">
              <span
                onClick={() => router.push('/forgot-password')}
                className="text-linkedin-primary cursor-pointer text-sm hover:underline"
              >
                Forgot password?
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}