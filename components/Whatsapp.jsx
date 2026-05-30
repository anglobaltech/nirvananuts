"use client";

import React from 'react';
import Image from 'next/image';

const Whatsapp = () => {
  return (
    // DIV instead of section for a tiny, non-content layout component
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-4">

      {/* WHATSAPP TRIGGER */}
      <a
        href="https://wa.me/917782069184"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Nirvana Nuts support"
        className="group focus:outline-hidden"
      >
        <div className="bg-white shadow-xl rounded-full p-3 transition-all duration-300 group-hover:scale-110 group-focus:ring-2 group-focus:ring-emerald-500 hover:shadow-2xl flex items-center justify-center">
          <Image
            src="/whatsapp-image.webp"
            alt="WhatsApp Support Icon"
            width={30}
            height={30}
            loading="lazy" // PERFORMANCE FIXED: Lazy load floating widgets to keep initial bundle light
            className="object-contain"
          />
        </div>
      </a>

      {/* DIRECT DIALER TRIGGER */}
      <a
        href="tel:+917782069184"
        aria-label="Call Nirvana Nuts customer service instantly"
        className="group focus:outline-hidden"
      >
        <div className="bg-white shadow-xl rounded-full p-3 transition-all duration-300 group-hover:scale-110 group-focus:ring-2 group-focus:ring-amber-500 hover:shadow-2xl flex items-center justify-center">
          <Image
            src="/dialer-icon.avif"
            alt="Phone Call Dialer Icon"
            width={30}
            height={30}
            loading="lazy" // PERFORMANCE FIXED: Optimizes Largest Contentful Paint (LCP)
            className="object-contain"
          />
        </div>
      </a>

    </div>
  );
};

export default Whatsapp;