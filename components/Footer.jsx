"use client";

import Image from "next/image";
import Link from "next/link"; // PERFORMANCE FIXED: Instant routes navigation transitions without frame drops

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-8 px-6 border-t border-gray-800">
      {/* Updated responsive grid mapping to your custom screen breakpoints */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 p-5 gap-10">
        
        {/* COLUMN 1: WHO ARE WE */}
        <div className="flex flex-col gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-white/5 p-1">
            <Image 
              src="/nirvana-logo.avif" 
              alt="Nirvana Nuts Identity Crest" 
              width={56} 
              height={56}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-bold tracking-wide text-white uppercase">Who Are We?</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Welcome to Nirvana Nuts — Where Flavor Meets Wholesome Goodness! We create delicious snacks that nourish your body and delight your taste buds.
          </p>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold tracking-wide text-white uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">About</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Products</Link>
            </li>
            <li>
              <Link href="/food-ingredients" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Food Ingredient</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Contact us</Link>
            </li>
            <li>
              <Link href="/TermsAndConditions" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: OUR PRODUCT CATALOGUE */}
        <div>
          {/* SEO ARCHITECTURE FIXED: Changed catastrophic h1 down to clean component structure h3 */}
          <h3 className="text-lg font-bold tracking-wide text-white uppercase mb-4">Our Products</h3>
          {/* VALIDATION FIXED: Structurally wrapped Link inner components compliant inside li scopes */}
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link href="/plain-makhana" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Classic Salted Makhana</Link>
            </li>
            <li>
              <Link href="/modern-makhana" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Modern Savory Flavors Makhana</Link>
            </li>
            <li>
              <Link href="/sweet-makhana" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Sweet Gourmet Flavors Makhana</Link>
            </li>
            <li>
              <Link href="/fusion-makhana" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Fusion Spicy Makhana</Link>
            </li>
            <li>
              <Link href="/whey-protein" className="hover:text-amber-500 transition-colors duration-200 block py-0.5">Whey Protein</Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: GET IN TOUCH CONTACT HUB */}
        <div>
          <h3 className="text-lg font-bold tracking-wide text-white uppercase mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="leading-relaxed flex gap-2">
              <span aria-hidden="true">📍</span>
              <span>VILL- SEMRA HAT, THANA-TURKULIYA, Semra (East Champaran), Banjaria, East Champaran - 845435, Bihar</span>
            </li>
            <li>
              <a 
                href="https://wa.me/917782069184" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contact sales team via Whatsapp messenger application connection"
                className="hover:text-amber-500 transition-colors duration-200 inline-flex items-center gap-2 py-0.5"
              >
                <span aria-hidden="true">📞</span> (+91) 778 206 9184
              </a>
            </li>
            <li>
              <a 
                href="mailto:info@nirvananuts.in" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Send query notification dispatch electronic mail onto support destination"
                className="hover:text-amber-500 transition-colors duration-200 inline-flex items-center gap-2 py-0.5"
              >
                <span aria-hidden="true">✉️</span> info@nirvananuts.in
              </a>
            </li>
          </ul>

          {/* SOCIAL PROFILE LINKS GATEWAY */}
          {/* Alignment responds to the updated multi-column structure */}
          <div className="flex justify-start xl:justify-end mt-8 gap-4">
            <a 
              href="https://www.instagram.com/nirvana.nuts/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow corporate operations visual log updates on official Instagram profile stream"
              className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 hover:bg-amber-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BASE LEGAL NOTICES COPYRIGHT BAR */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500 tracking-wide">
        <p>© 2026 NIRVANANUTS PRIVATE LIMITED. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;