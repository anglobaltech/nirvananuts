"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown } from "lucide-react"


const Header = () => {
  const [open,setOpen]= useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProduct, setMobileProduct] = useState(false)

  return (
    <header className='fixed w-full top-0 left-0 z-50 bg-amber-50'>
      <nav className='max-w-7xl px-3 mx-auto '>
        <div>
        <div className='flex justify-between items-center px-4 py-3 mx-auto '>
          <a href="/">
          <div className=' relative'>
            <Image src="/nirvana-logo.avif" alt='nirvananuts-logo' height={60} width={75} className=' object-contain' />
          </div>
          </a>

          <div className='hidden md:flex items-center gap-6 '>
            <a href="/" className='px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300'>Home</a>
            <a href="/about" className='px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300'>About us</a>
            <div className='relative'
              onMouseEnter={()=>setOpen(true) }
              onMouseMove={()=>setOpen(true)}
              onMouseLeave={()=>setOpen(false)}>
              <button className='px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300'>Product▾</button>
              <div className="absolute left-0 top-full h-4  w-full"></div>
              <div  className={`absolute   left-0 top-full bg-white  rounded-xl shadow-xl p-5 gap-2
              ${open ? "opacity-100 visible" : "opacity-0 invisible"}
              `}>
              <div className='flex flex-col gap-4  '>
              <a href="/makhana" className="text-black font-medium hover:text-amber-600 transition whitespace-nowrap">Makhana </a> 
              <a href="/whey-protein" className="text-black  font-medium hover:text-amber-600 transition whitespace-nowrap">Whey Protein</a>
              </div>
              </div>
            </div>
            <a href="/food-ingredients" className='px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300'>Food Ingredient</a>
            <a href="/contact" className='px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300'>Contact</a>
          </div>

 {/* Mobile Toggle Button */}
<div className="md:hidden">
  <button
    onClick={() => setMobileOpen(prev => !prev)}
    className="text-gray-900 text-3xl"
  >
    {mobileOpen ? "✕" : "☰"}
  </button>
</div>


        </div>
</div>
      </nav>

      {mobileOpen && (
  <div className="md:hidden  bg-gray-100 py-4">
    <div className="flex flex-col gap-4 px-4 ">

      <a href="/" 
         onClick={() => setMobileOpen(false)}
         className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
        Home
      </a>

      <a href="/about"
         onClick={() => setMobileOpen(false)}
         className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
        About Us
      </a>

      {/* Product Dropdown */}
<button
  onClick={() => setMobileProduct(!mobileProduct)}
  className="flex justify-between items-center text-lg font-medium text-gray-900 hover:text-amber-600 transition"
>
  Product
  <span className={`text-sm transition-transform ${mobileProduct ? "rotate-180" : ""}`}>
    ▼
  </span>
</button>

{mobileProduct && (
  <div className="pl-4 flex flex-col gap-2">

    <a href="/makhana"
       onClick={() => setMobileOpen(false)}
       className="text-gray-700 hover:text-amber-600 transition">
      Makhana
    </a>

    <a href="/whey-protein"
       onClick={() => setMobileOpen(false)}
       className="text-gray-700 hover:text-amber-600 transition">
      Whey Protein
    </a>

  </div>
)}


      <a href="/food-ingredients"
         onClick={() => setMobileOpen(false)}
         className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
        Food Ingredient
      </a>

      <a href="/contact"
         onClick={() => setMobileOpen(false)}
         className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
        Contact
      </a>

    </div>
  </div>
)}
    </header>
  )
}

export default Header