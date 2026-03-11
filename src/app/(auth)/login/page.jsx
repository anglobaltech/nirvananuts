"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../../contexts/AuthContext"

export default function Page(){

const router = useRouter()
const { user } = useAuth()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [isLoading,setIsLoading] = useState(false)


// EMAIL LOGIN
const loginUser = async (e)=>{
e.preventDefault()

try{

const userCredential = await signInWithEmailAndPassword(auth,email,password)

const uid = userCredential.user.uid

const docRef = doc(db,"users",uid)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){

const role = docSnap.data().role

if(role === "admin"){
router.push("/admin")
}else{
router.push("/customer")
}

}else{
toast.error("User role not found")
}

}catch(error){
toast.error(error.message)
}

}


// GOOGLE LOGIN
const signInWithGoogle = async () => {

setIsLoading(true)

try{

const result = await signInWithPopup(auth,new GoogleAuthProvider())

toast.success("Login Successfully")

router.push("/admin")

}catch(error){

toast.error(error.message)

}

setIsLoading(false)

}


useEffect(()=>{
if(user){
router.push("/admin")
}
},[user,router])


return(

<main className="w-full flex items-center justify-center md:p-24 p-10 bg-gray-300 min-h-screen">

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

<button className="text-white rounded-2xl cursor-pointer bg-blue-600 p-3">
Login
</button>

</form>


<div className="flex justify-between">



<Link href="/forget-password">
<button className="font-semibold cursor-pointer text-sm text-blue-700">
Forget Password?
</button>
</Link>

</div>


<button
disabled={isLoading}
onClick={signInWithGoogle}
className="text-gray-900 cursor-pointer rounded-2xl bg-gray-300 p-3"
>

{isLoading ? "Signing In..." : "Sign in With Google"}

</button>

</div>

</section>

</main>

)

}