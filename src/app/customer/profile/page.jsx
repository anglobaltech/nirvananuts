"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MapPin, Shield, Settings, Mail, Phone, 
  ArrowLeft, Edit3, Globe, Bell, ChevronRight 
} from "lucide-react";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("Basic Information");

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
        let firestoreData = docSnap.exists() ? docSnap.data() : {};

        setUserData({
          fullName: firestoreData.fullName || "—",
          email: user.email || "—",
          phone: firestoreData.phone || "—",
          gender: firestoreData.gender || "—",
          street: firestoreData.street || "—",
          city: firestoreData.city || "—",
          state: firestoreData.state || "—",
          pincode: firestoreData.pincode || "—",
          country: firestoreData.country || "—",
          twoFactor: firestoreData.twoFactor ?? false,
          language: firestoreData.language || "English",
          darkMode: firestoreData.darkMode ?? false,
          notifications: firestoreData.notifications ?? true,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user]);

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fdfcfb]">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const sections = [
    { 
      title: "Basic Information", 
      icon: <User size={18} />, 
      data: [
        { label: "Full Name", value: userData.fullName },
        { label: "Email", value: userData.email, icon: <Mail size={14}/> },
        { label: "Phone", value: userData.phone, icon: <Phone size={14}/> },
        { label: "Gender", value: userData.gender },
      ]
    },
    { 
      title: "Address", 
      icon: <MapPin size={18} />, 
      data: [
        { label: "Street", value: userData.street },
        { label: "City", value: userData.city },
        { label: "State", value: userData.state },
        { label: "Pincode", value: userData.pincode },
        { label: "Country", value: userData.country },
      ]
    },
    { 
      title: "Security", 
      icon: <Shield size={18} />, 
      data: [
        { label: "Two-Factor Auth", value: userData.twoFactor ? "Active" : "Inactive" },
      ]
    },
    { 
      title: "Preferences", 
      icon: <Settings size={18} />, 
      data: [
        { label: "Language", value: userData.language, icon: <Globe size={14}/> },
        { label: "Notifications", value: userData.notifications ? "Enabled" : "Disabled", icon: <Bell size={14}/> },
      ]
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F8F7] mt-27 text-[#1a1a1a] selection:bg-black selection:text-white pb-20">
      {/* Top Navigation */}
      <nav className=" top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/customer" className="group flex items-center gap-2 font-medium text-sm tracking-widest uppercase">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
            Back
          </Link>
          <div className="hidden md:block text-xs font-black tracking-[0.3em] uppercase opacity-40">
            User Profile Account
          </div>
          <Link href="/customer/edit-profile">
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-all active:scale-95 shadow-lg shadow-black/10">
              <Edit3 size={14} /> Edit
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Profile Summary & Tabs */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 flex items-center justify-center text-3xl font-light text-gray-400 border border-gray-200">
                {userData.fullName.charAt(0)}
              </div>
              <h1 className="text-3xl font-extralight tracking-tighter mb-1">
                {userData.fullName}
              </h1>
              <p className="text-gray-400 text-sm font-medium mb-6">{userData.email}</p>
              
              <div className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveSection(s.title)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-sm font-medium ${
                      activeSection === s.title 
                      ? "bg-gray-50 text-black translate-x-2" 
                      : "text-gray-400 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {s.icon} {s.title}
                    </span>
                    <ChevronRight size={14} className={activeSection === s.title ? "opacity-100" : "opacity-0"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Placeholder Card */}
            <div className="hidden lg:block bg-black p-8 rounded-[2rem] text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-light italic mb-2">Exclusive Member</h4>
                <p className="text-xs text-gray-400 tracking-widest uppercase mb-6">Nirvana Collection</p>
                <div className="h-px w-full bg-white/20 mb-6" />
                <p className="text-sm leading-relaxed opacity-70">Experience curated luxury and personalized service with your premium account.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>
          </aside>

          {/* RIGHT COLUMN: Detail View */}
          <section className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {sections.map((section) => section.title === activeSection && (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl font-extralight tracking-tight text-gray-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {section.data.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-6 rounded-2xl border border-gray-100 group hover:border-black/10 transition-colors"
                      >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2 flex items-center gap-2">
                          {item.icon} {item.label}
                        </p>
                        <p className="text-lg font-light text-gray-800 break-words">
                          {item.value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Aesthetic Mobile Back Button */}
                  <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-400 text-center italic">
                      Select another tab from the profile menu to view more details.
                    </p>
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