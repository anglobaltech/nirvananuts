"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // PERFORMANCE & BEST PRACTICE: Single Page Routing native support
import { ShoppingCart, UserRound, ChevronDown, Menu, X } from "lucide-react"; // A11Y FIXED: Replaced string symbols with clean SVG vectors

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);

  const news = [
    "🔥 Plain Makhana Available",
    "✨ Shop Smart, Eat Healthy",
    "🔥 Modern Savory Flavors Makhana Available",
    "🚚 Fast Delivery Across India",
    "🔥 Sweet Gourmet Flavors Makhana Available",
    "🍚 Premium Makhana Available",
    "🔥 Fusion Spicy Makhana Available",
    "💪 20kg Bulk Whey Protein In Stock",
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm">
      {/* 1. ANNOUNCEMENT BAR (MARQUEE ENGINE) */}
      <div 
        className="w-full bg-yellow-900 text-white overflow-hidden"
        role="region"
        aria-label="Latest Announcements"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {/* First Copy */}
          <div className="flex py-1.5">
            {news.map((item, index) => (
              <span key={index} className="mx-8 font-medium text-xs md:text-sm tracking-wide">
                {item}
              </span>
            ))}
          </div>

          {/* Duplicate Copy */}
          <div className="flex py-1.5" aria-hidden="true">
            {news.map((item, index) => (
              <span key={`dup-${index}`} className="mx-8 font-medium text-xs md:text-sm tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN CORE NAVIGATION BRAND BAR */}
      <nav className="max-w-7xl px-3 mx-auto" aria-label="Main Brand Navigation">
        <div className="flex justify-between items-center px-4 py-3">
          
          {/* LOGO WRAPPER */}
          <div className="flex items-center">
            <Link href="/" aria-label="Nirvana Nuts Home Interface">
              <Image
                src="/nirvana-logo.avif"
                alt="Nirvana Nuts Premium Organic Makhana Logo"
                height={60}
                width={75}
                priority // Performance optimization for Above-The-Fold branding metrics
                className="object-contain"
              />
            </Link>
          </div>

          {/* ================= DESKTOP MENU ENGINE ================= */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="px-3 py-2 text-lg font-medium text-black hover:scale-105 hover:text-amber-600 rounded-2xl transition-all duration-200">
              Home
            </Link>

            <Link href="/about" className="px-3 py-2 text-lg font-medium text-black hover:scale-105 hover:text-amber-600 rounded-2xl transition-all duration-200">
              About us
            </Link>

            {/* PRODUCT DROPDOWN CONTAINER */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button 
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className="px-3 py-2 text-lg font-medium text-black hover:scale-105 hover:text-amber-600 rounded-2xl transition-all duration-200 flex items-center gap-1 cursor-pointer"
              >
                Products
                <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180 text-amber-600" : ""}`} />
              </button>

              {/* Safety Hover Bridge */}
              <div className="absolute left-0 top-full h-4 w-full"></div>

              <div
                className={`absolute left-0 top-full bg-white rounded-xl shadow-xl p-5 border border-neutral-100/80 min-w-[220px]
                ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                transition-all duration-200 z-50`}
              >
                <div className="flex flex-col gap-3">
                  <Link href="/makhana" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Makhana
                  </Link>
                  <Link href="/plain-makhana" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Classic Plain Makhana
                  </Link>
                  <Link href="/modern-makhana" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Modern Savory Makhana
                  </Link>
                  <Link href="/sweet-makhana" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Sweet Gourmet Makhana
                  </Link>
                  <Link href="/fusion-makhana" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Fusion Spicy Makhana
                  </Link>
                  <Link href="/whey-protein" className="text-black text-base font-medium hover:text-amber-600 p-1 rounded-md transition-colors">
                    Whey Protein
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/food-ingredients" className="px-3 py-2 text-lg font-medium text-black hover:scale-105 hover:text-amber-600 rounded-2xl transition-all duration-200">
              Food Ingredient
            </Link>

            <Link href="/contact" className="px-3 py-2 text-lg font-medium text-black hover:scale-105 hover:text-amber-600 rounded-2xl transition-all duration-200">
              Contact us
            </Link>

            <Link href="/customer/cart" aria-label="Open personal shopping cart container" className="p-2 text-black hover:scale-110 hover:text-amber-600 transition-transform">
              <ShoppingCart size={22} />
            </Link>
            
            <Link href="/login" aria-label="Navigate to Profile Account Login Gateway" className="p-2.5 rounded-full font-medium text-black hover:scale-110 bg-amber-300 transition-transform flex items-center justify-center">
              <UserRound size={20} />
            </Link>
          </div>

          {/* ================= MOBILE BUTTON UTILITY PANEL ================= */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/login" aria-label="Profile Gateway login interface" className="p-2 rounded-full text-black bg-amber-300 active:scale-95 transition-transform flex items-center justify-center">
              <UserRound size={18} />
            </Link>
            
            <Link href="/customer/cart" aria-label="Open internal cart" className="p-2 text-black active:scale-95 transition-transform flex items-center justify-center">
              <ShoppingCart size={20} />
            </Link>
            
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation system layout drawer overlay"
              aria-controls="mobile-navigation-drawer"
              aria-expanded={mobileOpen}
              className="p-2 text-gray-900 active:scale-95 transition-transform cursor-pointer"
            >
              <Menu size={26} />
            </button>
          </div>

        </div>
      </nav>

      {/* ================= MOBILE DRAWER INTERFACE MATRIX ================= */}
      <div className="md:hidden" id="mobile-navigation-drawer">
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity duration-300
          ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        ></div>

        {/* Sliding Panel Layer */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-amber-50 text-black z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out flex flex-col justify-between
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div>
            {/* Drawer Header Layout */}
            <div className="flex justify-between items-center p-4 border-b border-amber-200/60 bg-white/80">
              <span className="font-bold tracking-wider text-neutral-800 text-sm">NAVIGATION</span>
              <button 
                type="button"
                onClick={() => setMobileOpen(false)} 
                aria-label="Close navigation system panel layout drawer"
                className="p-1.5 text-neutral-700 hover:text-black active:scale-90 transition-transform cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links Collection Core */}
            <div className="flex flex-col p-5 gap-4 text-base font-semibold text-neutral-900">
              <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                Home
              </Link>

              <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                About Us
              </Link>

              {/* Mobile Submenu Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setMobileProduct(!mobileProduct)}
                aria-expanded={mobileProduct}
                className="flex justify-between items-center w-full text-left font-semibold hover:text-amber-700 transition-colors cursor-pointer"
              >
                Product
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileProduct ? "rotate-180 text-amber-700" : ""}`} />
              </button>

              {mobileProduct && (
                <div className="pl-3 py-1 flex flex-col gap-2.5 border-l-2 border-amber-300 text-sm font-medium text-neutral-700 bg-amber-100/40 rounded-r-lg">
                  <Link href="/makhana" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Makhana
                  </Link>
                  <Link href="/plain-makhana" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Classic Plain Makhana
                  </Link>
                  <Link href="/modern-makhana" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Modern Savory Makhana
                  </Link>
                  <Link href="/sweet-makhana" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Sweet Gourmet Makhana
                  </Link>
                  <Link href="/fusion-makhana" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Fusion Spicy Makhana
                  </Link>
                  <Link href="/whey-protein" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 py-0.5">
                    Whey Protein
                  </Link>
                </div>
              )}

              <Link href="/food-ingredients" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                Food Ingredient
              </Link>

              <Link href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Drawer Corporate Footer Identity */}
          <div className="p-6 border-t border-amber-200/40 flex justify-center bg-white/40">
            <Image 
              src="/nirvana-logo.avif" 
              alt="Nirvana Nuts Identity Seal"  
              height={50} 
              width={65} 
              className="object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;