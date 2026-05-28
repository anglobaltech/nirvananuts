"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { ArrowLeft, Save,Sparkles, ShieldCheck,} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {getAuth,onAuthStateChanged,} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth();
const InputField = ({
  label,
  name,
  type = "text",
  disabled = false,
  required = false,
  value,
  onChange,
}) => (
  <div className="relative group">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      disabled={disabled}
      required={required}
      className={`peer w-full bg-transparent border-b border-[#D2C1B0] py-3 outline-none transition-all text-lg font-medium text-[#2D1B0D]
      ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "focus:border-[#8B5E3C]"
      }`}
    />

    <label className="absolute left-0 top-3 text-[#A68966] text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#8B5E3C] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

export default function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    twoFactor: false,
    language: "English",
    darkMode: false,
    notifications: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (err) { console.error(err); }
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not logged in");
    setLoading(true);

    try {
      const safeData = {
  fullName: form.fullName || "",
  mobile: form.mobile || "",
  gender: form.gender || "",

  address: form.address || "",
  city: form.city || "",
  state: form.state || "",
  pincode: form.pincode || "",
  country: form.country || "",

  updatedAt: new Date(),
};

     await setDoc(
  doc(db, "users", user.uid),
  {
    ...safeData,
    email: user.email,
  },
  { merge: true }
);

      toast.success("Profile Updated Successfully✅");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <main className="min-h-screen mt-27  bg-[#F4EDE4] text-[#4A3728] selection:bg-[#8B5E3C] selection:text-white">
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="light"
/>
      {/* Navigation Header */}
      <nav className=" top-0 left-0 w-full z-50 bg-[#F4EDE4]/80 backdrop-blur-md border-b border-[#D2C1B0]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/customer/profile" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966] hover:text-[#2D1B0D] transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Cancel
          </Link>
          <div className="text-[10px] font-black tracking-[0.5em] text-[#8B5E3C] italic hidden md:block">NIRVANA EDITORIAL</div>
          <div className="w-20 md:hidden" /> {/* Spacer */}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-10 pb-20 px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
        
        {/* Left Branding Side */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-extralight text-[#2D1B0D] tracking-tighter italic leading-tight">
              Refine Your <br />
              <span className="ml-12 font-serif tracking-normal text-6xl">Essence.</span>
            </h1>
            <p className="mt-6 text-[#8B5E3C] font-medium leading-relaxed opacity-80 max-w-xs">
              Personalize your account details and secure your digital presence in our private sanctuary.
            </p>
          </motion.div>
          
          <div className="hidden lg:block pt-10">
            <div className="p-8 rounded-[2rem] bg-[#2D1B0D] text-white space-y-4 relative overflow-hidden">
               <ShieldCheck className="text-[#8B5E3C] mb-2" size={32} />
               <h3 className="text-sm font-bold tracking-widest uppercase">Privacy Vault</h3>
               <p className="text-xs opacity-60 leading-relaxed">Your data is encrypted using 256-bit industrial standards. Changes take effect across all synced devices immediately.</p>
               <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#8B5E3C]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-20">
            
            {/* Section 01: Identity */}
            <section className="space-y-12">
              <div className="flex items-center gap-4 border-b border-[#D2C1B0]/30 pb-4">
                <span className="text-[10px] font-black text-[#8B5E3C] tracking-[0.4em]">01</span>
                <h2 className="text-xs font-black uppercase tracking-[0.4em]">Identity</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <InputField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
                <InputField label="Email Address" name="email" value={form.email} onChange={handleChange} disabled />
                <InputField label="Contact Number" name="mobile" value={form.mobile} onChange={handleChange} required />
                <div className="relative group">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-[#D2C1B0] py-3 outline-none focus:border-[#8B5E3C] appearance-none text-lg font-medium text-[#2D1B0D]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="absolute left-0 -top-5 text-[10px] text-[#A68966] uppercase tracking-widest">Gender</label>
                </div>
              </div>
            </section>

            {/* Section 02: Logistics */}
            <section className="space-y-12">
              <div className="flex items-center gap-4 border-b border-[#D2C1B0]/30 pb-4">
                <span className="text-[10px] font-black text-[#8B5E3C] tracking-[0.4em]">02</span>
                <h2 className="text-xs font-black uppercase tracking-[0.4em]">Address Details</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="md:col-span-2">
                  <InputField label="Street Address" name="address" value={form.address} onChange={handleChange} />
                </div>
                <InputField label="City" name="city" value={form.city} onChange={handleChange} />
                <InputField label="State / Province" name="state" value={form.state} onChange={handleChange} />
                <InputField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
                <InputField label="Country" name="country" value={form.country} onChange={handleChange} />
              </div>
            </section>


            {/* Action Footer */}
            <div className="pt-12 border-t border-[#D2C1B0]/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3 text-[#A68966] opacity-60"></div>
              <button 
                type="submit" 
                disabled={loading}
                className="group w-full cursor-pointer md:w-auto bg-[#2D1B0D] text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-[#8B5E3C] active:scale-[0.98] shadow-xl shadow-black/10 flex items-center justify-center gap-3"
              >
                {loading ? "Syncing..." : "Commit Changes"}
                <Save size={14} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}