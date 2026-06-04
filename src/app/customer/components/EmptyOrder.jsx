"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-transparent antialiased">
      <div className="w-full  max-w-md text-center flex flex-col items-center">
        
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-24 h-24 bg-white rounded-3xl border border-gray-200/60 shadow-sm flex items-center justify-center mb-8 group hover:border-black/10 hover:shadow-md transition-all duration-300"
        >
          <ShoppingBag 
            size={32} 
            className="text-gray-400 group-hover:text-black group-hover:scale-105 transition-all duration-300 stroke-[1.5]" 
          />
          {/* Decorative Subtle Accent Tag */}
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white leading-none">0</span>
          </div>
        </motion.div>

        {/* Typography Content Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-light tracking-tight text-gray-900">
            No Orders Record Found
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 max-w-[280px] mx-auto font-light">
            Your system ledger is empty. Start exploring our curated collections to place your first order.
          </p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full"
        >
          <Link href="/" className="inline-block w-full sm:w-auto">
            <button className="group flex cursor-pointer items-center justify-center gap-3 bg-[#111111] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98] shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/10 w-full sm:w-auto">
              Explore Collections
              <ArrowRight 
                size={14} 
                className="group-hover:translate-x-1 transition-transform duration-300 stroke-[2]" 
              />
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}