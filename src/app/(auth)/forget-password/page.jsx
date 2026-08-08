"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email ❌");
      return;
    }

    try {
      setLoading(true);
      const q = query(collection(db, "users"), where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No account found with this email ❌");
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      setUserId(userDoc.id);

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      // Send via custom Nodemailer route
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          subject: "Your Password Reset OTP",
          html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
              <h2 style="color: #8B5E3C;">Password Reset Request</h2>
              <p>Your One-Time Password (OTP) for resetting your Nirvana Nuts account is:</p>
              <h1 style="font-size: 32px; letter-spacing: 5px; color: #2D1B0D; background: #F4EDE4; padding: 10px; border-radius: 8px; display: inline-block;">${code}</h1>
              <p style="color: #666; margin-top: 20px;">If you did not request this, please ignore this email.</p>
            </div>
          `
        })
      });

      if (!emailRes.ok) throw new Error("Failed to send email");

      toast.success("OTP sent to your email! ✅");
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      toast.success("OTP Verified! ✅");
      setStep(3);
    } else {
      toast.error("Invalid OTP. Please try again. ❌");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters ❌");
      return;
    }

    try {
      setLoading(true);
      
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      toast.success("Password updated successfully! 🎉");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/shoping.png" alt="Background" fill priority className="object-cover object-center brightness-[0.35]" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/80" />
      </div>

      <ToastContainer position="top-right" autoClose={4000} />
      
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link href="/login">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-stone-950/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-stone-900 transition-all shadow-lg active:scale-95 cursor-pointer">
            <ArrowRight size={14} className="rotate-180" /> Back to Login
          </button>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-[2.5rem] bg-stone-900/40 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl border border-white/10 relative">
          
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-amber-500/20 blur-[80px] pointer-events-none" />

          <div className="relative text-center mb-8">
            <h1 className="text-3xl font-extralight tracking-tight text-white mb-2 italic">
              Reset <span className="font-serif">Password</span>
            </h1>
            <p className="text-xs font-medium tracking-widest text-stone-400 uppercase">
              {step === 1 && "Enter email for OTP"}
              {step === 2 && "Enter the 6-digit OTP"}
              {step === 3 && "Create a new password"}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendOTP} className="relative space-y-6">
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.com" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-stone-500 backdrop-blur-md transition-all focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-amber-600 px-5 py-4 font-bold text-white shadow-lg hover:bg-amber-500 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer">
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="relative space-y-6">
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">6-Digit OTP</label>
                <input type="text" required maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center tracking-[1em] font-bold text-xl text-white placeholder-stone-500 backdrop-blur-md transition-all focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-amber-600 px-5 py-4 font-bold text-white shadow-lg hover:bg-amber-500 transition-all active:scale-[0.98] cursor-pointer">
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="relative space-y-6">
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">New Password</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min 6 characters" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-stone-500 backdrop-blur-md transition-all focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer">
                {loading ? "Updating..." : "Set New Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}