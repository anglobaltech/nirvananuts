"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MapPin, Mail, Phone, ArrowLeft, 
  Edit3, ChevronRight, ShieldCheck
} from "lucide-react";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("Identity Profile");

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
        const firestoreData = docSnap.exists() ? docSnap.data() : {};

        setUserData({
          fullName: firestoreData.fullName || "—",
          email: user.email || "—",
          mobile: firestoreData.mobile || "—",
          gender: firestoreData.gender || "—",
          street: firestoreData.address || "—",
          city: firestoreData.city || "—",
          state: firestoreData.state || "—",
          pincode: firestoreData.pincode || "—",
          country: firestoreData.country || "—",
        });
      } catch (err) {
        console.error("Error retrieving profile data:", err);
      }
    };
    
    fetchUser();
  }, [user]);

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-black/5 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const sections = [
    { 
      title: "Identity Profile", 
      icon: <User size={18} />, 
      data: [
        { label: "Full Name", value: userData.fullName },
        { label: "Email Address", value: userData.email, icon: <Mail size={13}/> },
        { label: "Phone Connection", value: userData.mobile, icon: <Phone size={13}/> },
        { label: "Gender Identity", value: userData.gender },
      ]
    },
    { 
      title: "Location & Logistics", 
      icon: <MapPin size={18} />, 
      data: [
        { label: "Street Address", value: userData.address },
        { label: "City", value: userData.city },
        { label: "State / Province", value: userData.state },
        { label: "Postal / Zip Code", value: userData.pincode },
        { label: "Country", value: userData.country },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#F6F5F2] text-[#111111] selection:bg-black selection:text-white pb-24 antialiased">
      {/* Top Header Navigation */}
      <nav className=" mt-30 border-b border-gray-100 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/customer" className="group flex items-center gap-3 font-semibold text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors">
            <div className="p-2 rounded-full border border-gray-100 bg-white group-hover:border-black/20 transition-colors shadow-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform"/>
            </div>
            Back
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase opacity-40">
            <ShieldCheck size={12} className="text-black" />
            Verified Account Workspace
          </div>
          <Link href="/customer/edit-profile">
            <button className="flex items-center gap-2 cursor-pointer bg-[#111111] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98] shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/10">
              <Edit3 size={13} /> Edit Profile
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Structural Body */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE PANEL */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200/60 shadow-sm shadow-black/[0.01]">
              {/* Profile Avatar Cluster */}
              <div className="relative w-20 h-20 bg-[#F6F5F2] rounded-2xl mb-6 flex items-center justify-center text-3xl font-extralight text-gray-400 border border-gray-200/80 uppercase tracking-tighter">
                {userData.fullName.charAt(0)}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              
              <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-1">
                {userData.fullName}
              </h1>
              <p className="text-gray-400 text-xs font-medium tracking-wide mb-8">{userData.email}</p>
              
              {/* Dashboard Segment Filters */}
              <div className="space-y-1.5">
                {sections.map((s) => {
                  const isSelected = activeSection === s.title;
                  return (
                    <button
                      key={s.title}
                      onClick={() => setActiveSection(s.title)}
                      className={`w-full flex items-center cursor-pointer justify-between p-4 rounded-xl transition-all text-xs uppercase tracking-wider font-semibold ${
                        isSelected 
                        ? "bg-[#111111] text-white shadow-lg shadow-black/10 translate-x-1" 
                        : "text-gray-400 bg-transparent hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {s.icon} {s.title}
                      </span>
                      <ChevronRight size={14} className={`transition-transform duration-300 ${isSelected ? "opacity-100 rotate-90" : "opacity-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Dynamic Graphic Accent */}
            <div className="hidden lg:block bg-gradient-to-br from-[#1c1c1c] to-black p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-black/5">
              <div className="relative z-10">
                <h4 className="text-lg font-light tracking-wide mb-1">Executive Access</h4>
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-8">Nirvana Network tier</p>
                <div className="h-px w-full bg-white/10 mb-6" />
                <p className="text-xs leading-relaxed text-gray-400 font-light">
                  Your profile parameter architecture is structured securely within private clouds. Modify core nodes dynamically using standard access permissions.
                </p>
              </div>
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-neutral-800 rounded-full blur-3xl opacity-40" />
            </div>
          </aside>

          {/* RIGHT VIEWPORT PANEL */}
          <section className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {sections.map((section) => section.title === activeSection && (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.610, 0.355, 1.000] }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-200/60 pb-4 mb-2">
                    <h2 className="text-3xl font-light tracking-tight text-gray-900">
                      {section.title}
                    </h2>
                  </div>

                  {/* Core Key-Value Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.data.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-6 rounded-2xl border border-gray-200/50 hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.02] transition-all duration-300"
                      >
                        <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-extrabold mb-2.5 flex items-center gap-2">
                          {item.icon} {item.label}
                        </p>
                        <p className="text-base font-normal text-gray-800 break-words tracking-tight">
                          {item.value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}