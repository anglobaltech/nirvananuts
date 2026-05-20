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
      router.replace("/admin")
    } else {
      router.replace("/customer")
    }
  }

  getRoleAndRedirect()
}, [user])


if (authLoading) {
  return <div className="text-center p-10">Loading...</div>
}

return(

<main className="w-full flex items-center justify-center md:p-24 p-10 bg-gray-300 min-h-screen">
<ToastContainer position="top-right" autoClose={3000}/>
<section className="flex flex-col gap-3">

<div className="flex justify-center">

<Image
src="/nirvana-logo.avif"
height={100}
width={100}
alt="logo image"
/>

</div>

<div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-110 w-full">

<h1 className="text-black font-bold text-lg">Login with Email</h1>

<form onSubmit={loginUser} className="flex flex-col gap-3">

<input
type="email"
placeholder="Enter Your Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="p-2 rounded-lg border focus:outline-none text-gray-900 w-full"
/>

<input
type="password"
placeholder="Enter Your Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="p-2 rounded-lg border focus:outline-none text-gray-900 w-full"
/>

<button
  type="submit"
  disabled={isLoading}
  className="text-white bg-blue-600 p-3 rounded-2xl disabled:opacity-50"
>
  {isLoading ? "Logging in..." : "Login"}
</button>

</form>


<div className="flex justify-between items-center">

  <Link href="/forget-password">
    <button className="font-semibold cursor-pointer text-sm text-blue-700">
      Forget Password?
    </button>
  </Link>

  <Link href="/customerSignup">
    <button className="text-sm cursor-pointer text-blue-700 hover:underline">
      Create Account
    </button>
  </Link>

</div>


{/* <button
disabled={isLoading}
onClick={signInWithGoogle}
className="text-gray-900 cursor-pointer rounded-2xl bg-gray-300 p-3"
>

{isLoading ? "Signing In..." : "Sign in With Google"}

</button> */}

</div>

</section>

</main>

)

}