"use client"
import React, { useState } from "react"
import Image from "next/image"

const Header = () => {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProduct, setMobileProduct] = useState(false)

    const news = [
    "🔥Plain Makhana Available ",
    "✨ Shop Smart, Eat Healthy",
    "🔥Modern Savory Flavors Makhana Available ",
    "🚚 Fast Delivery Across India",
    "🔥Sweet Gourmet Flavors Makhana Available ",
    "🍚 Premium Makhana Available",
    "🔥Fusion Spicy Makhana Available ",
    "💪 20kg Bulk Whey Protein In Stock",
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white   shadow-sm">

        <div className="w-full bg-yellow-900 text-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        
        {/* First Copy */}
        <div className="flex py-1">
          {news.map((item, index) => (
            <span key={index} className="mx-8 font-medium">
              {item}
            </span>
          ))}
        </div>

        {/* Duplicate Copy */}
        <div className="flex py-1">
          {news.map((item, index) => (
            <span key={`dup-${index}`} className="mx-8 font-medium">
              {item}
            </span>
          ))}
        </div>

      </div>
    </div>


      <nav className="max-w-7xl px-3 mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
        <div className="flex justify-around items-center gap-4 ">
          {/* Logo */}
          <a href="/">
            <Image
              src="/nirvana-logo.avif"
              alt="nirvananuts-logo"
              height={60}
              width={75}
              loading="eager"
              className="object-contain  "
            />
          </a>

          <h1 className="text-amber-700 font-bold text-2xl animate-pulse">Nirvana Nuts</h1>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-6">

            <a href="/" className="px-3 py-2 text-lg font-medium text-black hover:bg-linear-to-r from-amber-600 to-amber-300 rounded-2xl transition">
              Home
            </a>

            <a href="/about" className="px-3 py-2 text-lg font-medium text-black hover:bg-linear-to-r from-amber-600 to-amber-300 rounded-2xl transition">
              About us
            </a>

            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="px-3 py-2 text-lg font-medium  text-black hover:bg-linear-to-r from-amber-600 to-amber-300 rounded-2xl transition">
                Product ▾
              </button>

              <div className="absolute left-0 top-full h-4 w-full"></div>

              <div
                className={`absolute left-0 top-full bg-white rounded-xl shadow-xl p-5
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                transition duration-300`}
              >
                <div className="flex flex-col gap-4">
                  <a href="/makhana" className="text-black font-medium  hover:bg-linear-to-r from-amber-600 to-amber-300 p-1.5 rounded-2xl whitespace-nowrap">
                    Makhana
                  </a>
                  <a href="/whey-protein" className="text-black font-medium  hover:bg-linear-to-r from-amber-600 to-amber-300 p-1.5 rounded-2xl whitespace-nowrap">
                    Whey Protein
                  </a>
                </div>
              </div>
            </div>

            <a href="/food-ingredients" className="px-3 py-2 text-lg font-medium text-black hover:bg-linear-to-r from-amber-600 to-amber-300 rounded-2xl transition">
              Food Ingredient
            </a>

            <a href="/contact" className="px-3 py-2 text-lg font-medium text-black hover:bg-linear-to-r from-amber-600 to-amber-300 rounded-2xl transition">
              Contact
            </a>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-3xl text-gray-900"
            >
              ☰
            </button>
          </div>

        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <div className="md:hidden">

        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        ></div>

        {/* Drawer Panel */}
        <div
          className={`fixed top-0 right-0 h-screen w-60 bg-amber-100 text-black z-50
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >

          {/* Drawer Header */}
          <div className="flex justify-between  items-center p-4 border-b border-gray-600">
            <h2 className="font-semibold  text-lg">MENU</h2>
            <button onClick={() => setMobileOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col p-4 gap-4 text-lg">

            <a href="/" onClick={() => setMobileOpen(false)}>
              Home
            </a>

            <a href="/about" onClick={() => setMobileOpen(false)}>
              About Us
            </a>

            {/* Mobile Product Dropdown */}
            <button
              onClick={() => setMobileProduct(!mobileProduct)}
              className="flex justify-between items-center"
            >
              Product
              <span className={`${mobileProduct ? "rotate-180" : ""} transition`}>
                ▼
              </span>
            </button>

            {mobileProduct && (
              <div className="pl-4 flex flex-col gap-2 text-gray-900">
                <a href="/makhana" onClick={() => setMobileOpen(false)}>
                  Makhana
                </a>
                <a href="/whey-protein" onClick={() => setMobileOpen(false)}>
                  Whey Protein
                </a>
              </div>
            )}

            <a href="/food-ingredients" onClick={() => setMobileOpen(false)}>
              Food Ingredient
            </a>

            <a href="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </a>
            <Image src="/nirvana-logo.avif" alt="nirvana logo"  height={60} width={60} className="h-15 w-20 mt-93 ml-15 "/>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
