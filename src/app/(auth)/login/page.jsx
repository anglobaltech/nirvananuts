"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation"
import { useAuth } from "../../../../contexts/AuthContext"

export default function Page(){

const router = useRouter()
const { user, isLoading: authLoading } = useAuth()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [isLoading,setIsLoading] = useState(false)

const loginUser = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );

    toast.success("Login successful");

  } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("ERROR CODE:", error.code);

  if (error.code === "auth/invalid-email") {
    toast.error("Invalid email format ❌");

  } else if (error.code === "auth/invalid-credential") {

    // 🔍 Check if email exists in Firestore
    const q = query(
      collection(db, "users"),
      where("email", "==", email.trim())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // ❌ user not found
      toast.error("User not found. Please create account ❌");
    } else {
      // ❌ wrong password
      toast.error("Incorrect password ❌");
    }

  } else {
    toast.error("Login failed ❌");
  }
} finally {
  setIsLoading(false);
}
};

// GOOGLE LOGIN
// const signInWithGoogle = async () => {
// setIsLoading(true)
// try{
// const result = await signInWithPopup(auth,new GoogleAuthProvider())
// toast.success("Login Successfully")
// router.push("/admin")
// }catch(error){
// toast.error(error.message)
// }
// setIsLoading(false)
// }

useEffect(() => {
  if (!user) return

  const getRoleAndRedirect = async () => {
    const ref = doc(db, "users", user.uid)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      toast.error("User data not found ❌")
      return
    }

    const role = snap.data().role

    if (role === "admin") {
      router.refresh();
      router.replace("/admin")
    } else {
      router.refresh();
      router.replace("/customer")
    }
  }

  getRoleAndRedirect()
}, [user])


if (authLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-[2px] border-stone-900 border-t-transparent"></div>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Verifying Session</p>
      </div>
    </div>
  )
}

return (
  <main className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 overflow-hidden">
    
    {/* High-End Background Layer */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/shoping.png"
        alt="Premium Storefront Background"
        fill
        priority
        className="object-cover object-center brightness-[0.35]"
      />
      {/* Soft overlay pattern for dynamic depth and contrast */}
      <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/80" />
    </div>

    <ToastContainer position="top-right" autoClose={3000} />
    
    {/* Global Back Navigation Button */}
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

    <section className="relative z-10 w-full max-w-[420px] flex flex-col gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      
      {/* Brand Platform Header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative overflow-hidden rounded-2xl bg-white p-2.5 shadow-xl border border-white/20">
          <Image
            src="/nirvana-logo.avif"
            height={68}
            width={68}
            alt="logo image"
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full rounded-[2rem] border border-white/10 bg-stone-950/60 backdrop-blur-2xl p-6 shadow-2xl shadow-black/50 sm:p-8">
        
        <div className="mb-6 text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-white uppercase tracking-wider">Login</h1>
          <p className="mt-1 text-xs font-medium text-stone-400">Enter your login details below.</p>
        </div>

        <form onSubmit={loginUser} className="space-y-4">
          
          {/* Email Input Group */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-white focus:bg-stone-900 focus:outline-none focus:ring-4 focus:ring-white/[0.03]"
              required
            />
          </div>

          {/* Password Input Group */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-white focus:bg-stone-900 focus:outline-none focus:ring-4 focus:ring-white/[0.03]"
              required
            />
          </div>

          {/* Action Submission Trigger */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 cursor-pointer rounded-xl bg-white p-3.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md transition-all hover:bg-stone-100 active:scale-[0.98] disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed flex items-center justify-center min-h-[48px]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2.5">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent"></span>
                <span className="tracking-wide">Verifying Access...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Action Links */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-5 text-[11px] font-bold tracking-wide">
          <Link href="/forget-password">
            <button className="cursor-pointer text-stone-400 hover:text-white transition-colors">
              Forget Password
            </button>
          </Link>

          <div className="flex items-center gap-1 text-stone-400">
            <span className="font-medium">New customer?</span>
            <Link href="/customerSignup">
              <button className="cursor-pointer text-white hover:underline underline-offset-4">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Commented out Google button section matching design language layout changes */}
        {/* 
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
          <span className="relative bg-stone-950/80 px-3 text-[9px] font-extrabold uppercase tracking-widest text-stone-500">Or Federation Access</span>
        </div>

        <button
          disabled={isLoading}
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? "Connecting..." : "Sign in With Google"}
        </button> 
        */}

      </div>

    </section>
  </main>
)
}