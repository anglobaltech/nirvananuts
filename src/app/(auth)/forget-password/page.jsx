"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      setMessage("Password reset email sent successfully!");
      setEmail("");

    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">
            {message}
          </p>
        )}

        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </a>
        </div>

      </div>
    </div>
  );
}