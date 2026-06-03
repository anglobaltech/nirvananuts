"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // PERFORMANCE & BEST PRACTICE: Single Page Routing native support
import { ShoppingCart, UserRound, ChevronDown, Menu, X, Heart } from "lucide-react"; // Added Heart for Wishlist
import { subscribeWishlist } from "@/customerService/wishlistService"; // Firebase wishlist subscriber
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);

  // --- NEW STATES FOR REAL-TIME COUNTS ---
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // --- REAL-TIME LISTENERS FOR WISHLIST & CART ---
  useEffect(() => {
    // 1. Wishlist Real-time Subscriber
    const unsubWishlist = subscribeWishlist((items) => {
      setWishlistCount(items?.length || 0);
    });

    // 2. Firebase Cart Quantity Listener
    let unsubCart = () => {};
    
    const setupCartListener = () => {
      const user = auth.currentUser;
      if (user) {
        unsubCart = onSnapshot(doc(db, "carts", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const items = docSnap.data().items || [];
            // Cart ke saare items ki quantity (+qty) ka total sum nikalna
            const totalQty = items.reduce((total, item) => total + (Number(item.qty) || 0), 0);
            setCartCount(totalQty);
          } else {
            setCartCount(0);
          }
        });
      } else {
        setCartCount(0);
      }
    };

    // Firebase Auth State Tracker: Login hote hi cart listener activate hoga
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setupCartListener();
      } else {
        setCartCount(0);
        unsubCart();
      }
    });

    return () => {
      unsubWishlist && unsubWishlist();
      unsubCart && unsubCart();
      unsubAuth && unsubAuth();
    };
  }, []);

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
      width={70}
      height={60}
      priority
      style={{
        width: "70px",
        height: "60px",
      }}
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

            {/* FIXED: Added Wishlist Icon with Count Badge for Desktop */}
            <Link href="/customer/wishlist" aria-label="Open wishlist" className="relative p-2 text-black hover:scale-110 hover:text-red-500 transition-all">
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* FIXED: Added Count Badge for Cart Icon in Desktop */}
            <Link href="/customer/cart" aria-label="Open personal shopping cart container" className="relative p-2 text-black hover:scale-110 hover:text-amber-600 transition-all">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {cartCount}
                </span>
              )}
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

            {/* FIXED: Added Wishlist Icon with Count Badge for Mobile */}
            <Link href="/customer/wishlist" aria-label="Open wishlist" className="relative p-2 text-black active:scale-95 transition-all flex items-center justify-center">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* FIXED: Added Count Badge for Cart Icon in Mobile */}
            <Link href="/customer/cart" aria-label="Open internal cart" className="relative p-2 text-black active:scale-95 transition-all flex items-center justify-center">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-black text-white text-[9px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {cartCount}
                </span>
              )}
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

              {/* FIXED: Mobile Drawer me bhi explicit links structure built-in hai */}
              {mobileProduct && (
                <div className="pl-3 py-1 flex flex-col gap-2.5 border-l-2 border-amber-300 text-sm font-medium text-neutral-700 bg-amber-100/40 rounded-r-lg">
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

              {/* FIXED: Added Wishlist Link inside Mobile Drawer for easier access */}
              <Link href="/customer/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center justify-between hover:text-amber-700 transition-colors">
                <span>My Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white font-black text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>
                )}
              </Link>

              <Link href="/food-ingredients" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                Food Ingredient
              </Link>

              <Link href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-amber-700 transition-colors">
                Contact
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;