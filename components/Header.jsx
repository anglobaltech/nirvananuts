"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/products", label: "Product" },
    { href: "/food-ingredients", label: "Food Ingredients" },
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-amber-50">
      <nav className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/">
            <div className="  ml-15 relative">
              <Image
                src="/nirvana-logo.png"
                alt="logo"
                width={65}
                height={70}
                className="object-contain "
                // style={{ width: , height: "auto" }}
                priority
              />
            </div>
          </a>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-md text-lg font-medium text-gray-900  hover:text-amber-600 transition duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Shop Now Button */}
            {/* <a
              href="/products"
              className="px-4 py-2 rounded-md bg-amber-600 text-white font-semibold hover:bg-amber-700 transition duration-300"
            >
              Shop Now
            </a> */}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-green-200 hover:text-green-800 transition duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Shop Now Button in Mobile */}
            {/* <a
              href="/products"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-amber-400 text-white font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              Shop Now
            </a> */}
          </div>
        </div>
      )}

    </header>

  );
};

export default Header;























