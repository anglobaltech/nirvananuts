"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, 
  Heart, User, CreditCard, LogOut, LayoutGrid, X 
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const path = usePathname();
  const [userName, setUserName] = useState("Guest");
  const [isOpen, setIsOpen] = useState(false); // Controls mobile visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserName(user.displayName || "User");
    });
    return () => unsubscribe();
  }, []);

  // Close sidebar when path changes (for mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const links = [
    { name: "Dashboard", href: "/customer", icon: LayoutDashboard },
    { name: "Orders", href: "/customer/orders", icon: ShoppingBag },
    { name: "Cart", href: "/customer/cart", icon: ShoppingCart },
    { name: "Wishlist", href: "/customer/wishlist", icon: Heart },
    { name: "Profile", href: "/customer/profile", icon: User },
    { name: "Checkout", href: "/customer/checkout", icon: CreditCard },
  ];

  return (
    <>
      {/* MOBILE TOGGLE BUTTON - Positioned below header */}
      <div className="lg:hidden fixed mt-5 top-24 left-2 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 bg-[#2D1B0D] text-[#FAF9F6] px-2 py-0.5 rounded-full shadow-2xl shadow-black/20"
        >
          {isOpen ? <X size={18} /> : <LayoutGrid size={18} />}
          <span className="text-[8px] font-medium uppercase tracking-[0.2em]">
            {isOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {/* OVERLAY (Mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#2D1B0D]/40 backdrop-blur-sm z-[41] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR ASIDE */}
      <aside className={`
        fixed lg:sticky top-0 left-0 
        h-screen lg:h-auto lg:min-h-[calc(100vh-120px)]
        bg-[#F4EDE4] border-r border-[#D2C1B0] 
        transition-transform duration-500 ease-in-out z-[42]
        w-[80%] md:w-[40%] lg:w-80
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full p-8 pt-32 lg:pt-8">

 

          {/* NAVIGATION LINKS */}
          <nav className="flex-1 space-y-3 mt-25 overflow-y-auto custom-scrollbar">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = path === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm
                  ${isActive 
                    ? "bg-[#2D1B0D] text-white shadow-xl shadow-[#2D1B0D]/10" 
                    : "text-[#A68966] hover:bg-[#2D1B0D]/5 hover:text-[#2D1B0D]"}`}
                >
                  <Icon size={18} className={isActive ? "text-[#C5A059]" : "text-[#A68966]"} />
                  <span className="tracking-tight">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="pt-6 mt-6 border-t border-[#D2C1B0]/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-[#E8DFD5] text-[#2D1B0D] hover:bg-red-50 hover:text-red-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}