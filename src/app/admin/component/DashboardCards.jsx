"use client";
import { motion } from "framer-motion";

export default function DashboardCards({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-white 
                 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-black/[0.03] 
                 flex flex-col justify-between min-h-[160px] sm:h-44 group transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="p-2.5 sm:p-3 bg-[#F4EDE4] rounded-xl sm:rounded-2xl text-[#2D1B0D] 
                        group-hover:bg-[#2D1B0D] group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#8B5E3C] animate-pulse" />
      </div>

      <div className="space-y-1 mt-4 sm:mt-0">
        <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#A68966]">
          {title}
        </h2>
        <p className="text-2xl sm:text-3xl font-extralight text-[#2D1B0D] tracking-tighter italic leading-none">
          {value}
        </p>
      </div>
      
      {/* Ghost Icon Decor - Scale down on smaller cards */}
      <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 text-7xl sm:text-9xl 
                      opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-700">
        {icon}
      </div>
    </motion.div>
  );
}