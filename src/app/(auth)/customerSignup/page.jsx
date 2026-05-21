"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
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

      toast.success("Account Created 🎉");

      setTimeout(() => {
        router.push("/customer");
      }, 1500);

    } catch (error) {

  if (error.code === "auth/email-already-in-use") {
    toast.error("This email is already registered");
  } 
  
  else if (error.code === "auth/weak-password") {
    toast.error("Password should be at least 6 characters");
  } 
  
  else if (error.code === "auth/invalid-email") {
    toast.error("Please enter a valid email address");
  } 
  
  else {
    toast.error("Signup failed. Please try again");
  }
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <ToastContainer position="top-right" />

      <div className="w-full max-w-6xl my-40 grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div
          className="hidden md:flex flex-col justify-end p-10 text-white bg-cover object-fill bg-center"
          style={{
            backgroundImage:
              "url('/create-account-bg.jpg')",
          }}
        >
          <div className="bg-black/40 p-6 rounded-xl">
            <h1 className="text-3xl font-bold mb-2">
              Shop smarter, faster 🛍️
            </h1>
            <p className="text-sm">
              Discover premium products, great deals, and seamless checkout experience.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12">

          <h2 className="text-2xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Start your journey in seconds
          </p>

<form onSubmit={handleSignup} className="space-y-6">

  {/* Full Name */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">
      Full Name
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-10 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
      <span className="text-gray-400 mr-3">👤</span>
      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-900 text-sm"
        placeholder="Enter your full name"
        required
      />
    </div>
  </div>

  {/* Email */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">
      Email Address
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-10 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
      <span className="text-gray-400 mr-3">📧</span>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-900 text-sm"
        placeholder="Enter your email"
        required
      />
    </div>
  </div>

  {/* Mobile */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">
      Mobile Number
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-10 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
      <span className="text-gray-400 mr-3">📱</span>
      <input
        type="tel"
        onChange={(e) => setMobile(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-900 text-sm"
        placeholder="Enter mobile number"
        required
      />
    </div>
  </div>

  {/* Password */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">
      Password
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-10 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
      <span className="text-gray-400 mr-3">🔒</span>
      <input
        type={showPass ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-900 text-sm"
        placeholder="Enter password"
        required
      />
      <span
        onClick={() => setShowPass(!showPass)}
        className="text-gray-500 cursor-pointer text-sm"
      >
        {showPass ? "Hide" : "Show"}
      </span>
    </div>
  </div>

  {/* Confirm Password */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">
      Confirm Password
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-10 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
      <span className="text-gray-400 mr-3">🔐</span>
      <input
        type={showConfirm ? "text" : "password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-900 text-sm"
        placeholder="Confirm password"
        required
      />
      <span
        onClick={() => setShowConfirm(!showConfirm)}
        className="text-gray-500 cursor-pointer text-sm"
      >
        {showConfirm ? "Hide" : "Show"}
      </span>
    </div>
  </div>

  {/* Button */}
  <button
    disabled={loading}
    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 shadow-md disabled:opacity-50"
  >
    {loading ? "Creating..." : "Create Account"}
  </button>

</form>
        </div>
      </div>

    </div>
  );
}