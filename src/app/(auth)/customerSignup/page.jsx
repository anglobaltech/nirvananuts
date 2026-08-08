"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      // Send OTP via Nodemailer API
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          subject: "Verify Your Account - Nirvana Nuts",
          html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
              <h2 style="color: #8B5E3C;">Account Verification</h2>
              <p>Hi ${fullName},</p>
              <p>Your One-Time Password (OTP) to verify your new Nirvana Nuts account is:</p>
              <h1 style="font-size: 32px; letter-spacing: 5px; color: #2D1B0D; background: #F4EDE4; padding: 10px; border-radius: 8px; display: inline-block;">${code}</h1>
              <p style="color: #666; margin-top: 20px;">Please enter this code on the registration page to complete your signup.</p>
            </div>
          `
        })
      });

      if (!emailRes.ok) throw new Error("Failed to send OTP email");

      toast.success("OTP sent to your email! ✅");
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please check your email address ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    
    if (otp !== generatedOtp) {
      toast.error("Invalid OTP. Please try again ❌");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        mobile,
        email: user.email,
        role: "customer",
        createdAt: new Date(),
      });

      // Send Welcome Email
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: user.email,
            subject: "Welcome to Nirvana Nuts! 🎉",
            html: `
              <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <h1 style="color: #8B5E3C; text-align: center;">Welcome, ${fullName.split(' ')[0]}!</h1>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">We are absolutely thrilled to have you join the <strong>Nirvana Nuts</strong> family!</p>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">Get ready to experience the finest, most premium roasted fox nuts. Whether you crave something sweet, savory, or spicy, we have the perfect crunch waiting for you.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://nirvananuts.in" style="background-color: #8B5E3C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Start Shopping Now</a>
                </div>
                <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">Stay healthy, stay crunchy!<br>— The Nirvana Nuts Team</p>
              </div>
            `
          })
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }

      toast.success("Account Created Successfully! 🎉");

      setTimeout(() => {
        router.push("/customer");
      }, 1500);

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
        setStep(1);
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address");
        setStep(1);
      } else {
        toast.error("Signup failed. Please try again");
        setStep(1);
      }
    }

    setLoading(false);
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/shoping.png"
          alt="Premium Storefront Background"
          fill
          priority
          className="object-cover object-center brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/80" />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Back to Shop */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-stone-950/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-stone-900 transition-all cursor-pointer shadow-lg active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Shop
          </button>
        </Link>
      </div>

      <section className="relative z-10 w-full max-w-[480px]">
        
        {/* Main Card */}
        <div className="w-full rounded-[2rem] border border-white/10 bg-stone-950/60 backdrop-blur-2xl px-6 py-6 shadow-2xl shadow-black/50 sm:px-8 sm:py-7 relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-amber-500/20 blur-[80px] pointer-events-none" />

          {step === 1 ? (
            <>
              {/* Logo & Header */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="relative overflow-hidden rounded-2xl p-2 shadow-xl shrink-0">
                  <Image src="/nirvana-logo.avif" height={56} width={48} alt="Logo" priority className="object-contain" style={{ height: 'auto', width: 'auto' }} />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-white uppercase tracking-wider">Create Account</h1>
                  <p className="mt-0.5 text-xs font-medium text-stone-400">Join Nirvana Nuts — Start your healthy journey</p>
                </div>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-3.5 relative z-10">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"><User size={15} /></div>
                      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-3 py-3 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" placeholder="Your full name" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"><Phone size={15} /></div>
                      <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-3 py-3 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" placeholder="10 digit number" required />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"><Mail size={15} /></div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" placeholder="name@gmail.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Password</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"><Lock size={15} /></div>
                      <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-10 py-3 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" placeholder="Min 6 char" required />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors cursor-pointer">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Confirm</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"><ShieldCheck size={15} /></div>
                      <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-10 py-3 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" placeholder="Re-enter" required />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors cursor-pointer">{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full mt-1 cursor-pointer rounded-xl bg-amber-600 p-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-amber-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-h-[46px] group">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      <span className="tracking-wide">Sending OTP...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send OTP via Email
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-white/10 pt-4 text-[11px] font-bold tracking-wide relative z-10">
                <span className="text-stone-400 font-medium">Already have an account?</span>
                <Link href="/login">
                  <button className="cursor-pointer text-white hover:underline underline-offset-4 transition-colors">Sign In</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8 relative z-10">
                <h1 className="text-2xl font-extralight tracking-tight text-white mb-2 italic">Verify <span className="font-serif">Email</span></h1>
                <p className="text-xs font-medium tracking-widest text-stone-400 uppercase">Enter the 6-digit OTP sent to your email</p>
              </div>

              <form onSubmit={handleVerifyAndSignup} className="relative space-y-6 z-10">
                <div className="space-y-1.5">
                  <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">6-Digit OTP</label>
                  <input type="text" required maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center tracking-[1em] font-bold text-xl text-white placeholder-stone-500 backdrop-blur-md transition-all focus:border-amber-500/50 focus:bg-white/10 focus:outline-none" />
                </div>
                
                <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      <span className="tracking-wide text-xs">Creating Account...</span>
                    </span>
                  ) : "Verify & Create Account"}
                </button>

                <button type="button" onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-white transition-colors mt-4">
                  <ArrowLeft size={14} /> Back
                </button>
              </form>
            </>
          )}

        </div>
      </section>
    </main>
  );
}