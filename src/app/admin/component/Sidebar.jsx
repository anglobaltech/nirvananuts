"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  UserRound,
  ArrowRight
} from "lucide-react";

import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuList = [
    { name: "Dashboard", link: "/admin", icon: <LayoutDashboard size={18} strokeWidth={1.5} /> },
    { name: "Products", link: "/admin/products", icon: <PackageOpen size={18} strokeWidth={1.5} /> },
    { name: "Orders", link: "/admin/orders", icon: <ShoppingCart size={18} strokeWidth={1.5} /> },
    { name: "Customers", link: "/admin/customer", icon: <UserRound size={18} strokeWidth={1.5} /> },
    { name: "Admins", link: "/admin/admins", icon: <ShieldCheck size={18} strokeWidth={1.5} /> }
  ];

  const handleLogout = async () => {
    try {
      await toast.promise(signOut(auth), {
        loading: "Terminating session...",
        success: "Logged out successfully",
        error: (e) => e.message,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };


  

  return (
    <>
      {/* MOBILE & TABLET HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40   px-5 py-3 flex items-center justify-between">
        <button 
          onClick={() => setOpen(true)} 
          className="text-[#2D1B0D] p-2 hover:bg-white/50 rounded-full cursor-pointer transition-colors"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0   backdrop-blur-sm z-40  lg:hidden transition-opacity duration-500"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-[#F4EDE4] text-[#2D1B0D] flex flex-col
          border-r border-[#D2C1B0]/30 transform transition-transform duration-500 ease-in-out
          w-[280px] sm:w-[300px] lg:w-72
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO SECTION - DESKTOP */}
        <div className="relative flex flex-col items-center pt-12 pb-10">
          <button 
            onClick={() => setOpen(false)} 
            className="lg:hidden absolute top-6 right-6 text-[#A68966] hover:text-[#2D1B0D] transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="relative">
            <Image
              src="/nirvana-logo.avif"
              alt="logo"
              width={70}
              height={70}
              className="mix-blend-multiply hover:rotate-6 transition-transform duration-500"
            />
          </div>
          <div className="mt-5 text-center px-4">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#A68966] mb-1">Administrative Registry</p>
            <h2 className="text-2xl font-serif italic tracking-tighter">Nirvana Nuts</h2>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-6 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {menuList.map((item, key) => {
            const active = pathname === item.link;

            return (
              <Link href={item.link} key={key} onClick={() => setOpen(false)}>
                <li
                  className={`
                    group flex items-center gap-4 px-5 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest
                    transition-all duration-300 mb-1
                    ${active
                      ? "bg-[#2D1B0D] text-white shadow-lg shadow-black/10"
                      : "text-[#A68966] hover:bg-white/60 hover:text-[#2D1B0D]"
                    }
                  `}
                >
                  <span className={`${active ? "text-[#8B5E3C]" : "group-hover:scale-110 transition-transform"}`}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.name}</span>
                  {active && <ArrowRight size={12} className="text-[#8B5E3C]" />}
                </li>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER & LOGOUT */}
        <div className="p-6 border-t border-[#D2C1B0]/20">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-full
              bg-white border border-red-50 text-red-400 text-[10px] font-black uppercase tracking-widest
              hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-500
              shadow-sm group active:scale-95 cursor-pointer"
          >
            <LogOut size={16} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform" />
            End Session
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;