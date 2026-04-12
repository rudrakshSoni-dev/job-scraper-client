"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../lib/axios";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function VerifyResetOtpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/verify-reset-otp", { email, otp });

      toast.success("OTP verified");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl border w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Verify Reset OTP
        </h2>

        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-black text-white"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}