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

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );

    const ref = doc(db, "users", userCredential.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      toast.error("User data not found");
      return;
    }

    const role = snap.data().role;

    toast.success("Login successful");

    // IMPORTANT FIX
    setTimeout(() => {
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/customer";
      }
    }, 1000);

  } catch (error) {
    toast.error(error.message);
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

// useEffect(() => {
//   if (!user) return

//   const getRoleAndRedirect = async () => {
//     const ref = doc(db, "users", user.uid)
//     const snap = await getDoc(ref)

//     if (!snap.exists()) {
//       toast.error("User data not found ❌")
//       return
//     }

//     const role = snap.data().role

//     if (role === "admin") {
//       router.replace("/admin")
//     } else {
//       router.replace("/customer")
//     }
//   }

//   getRoleAndRedirect()
// }, [user])


if (authLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Loading...</p>
      </div>
    </div>
  )
}

return (
  <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8 md:p-24">
    <ToastContainer position="top-right" autoClose={3000} />
    
    <section className="w-full max-w-md flex flex-col gap-6">
      
      {/* Logo Container */}
      <div className="flex justify-center">
        <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
          <Image
            src="/nirvana-logo.avif"
            height={80}
            width={80}
            alt="logo image"
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1.5 text-sm text-slate-500">Login with your email credentials</p>
        </div>

        <form onSubmit={loginUser} className="flex flex-col gap-4">
          
          {/* Email Input Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Password Input Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full cursor-pointer rounded-xl bg-blue-600 p-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Action Links */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium">
          <Link href="/forget-password">
            <button className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors">
              Forgot Password?
            </button>
          </Link>

          <div className="flex items-center gap-1 text-slate-500">
            <span>New here?</span>
            <Link href="/customerSignup">
              <button className="cursor-pointer font-semibold text-blue-600 hover:underline">
                Create Account
              </button>
            </Link>
          </div>
        </div>

        {/* Commented out Google button styled to match the new layout */}
        {/* 
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
          <span className="relative bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">Or continue with</span>
        </div>

        <button
          disabled={isLoading}
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign in With Google"}
        </button> 
        */}

      </div>

    </section>
  </main>
)
}