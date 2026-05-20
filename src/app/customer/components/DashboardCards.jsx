"use client";

import { motion } from "framer-motion";

export default function DashboardCard({ title, value, sub, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-[2rem] bg-white border border-[#E5D5C6]/50 shadow-[0_10px_30px_rgba(45,27,13,0.03)] transition-all"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-[10px] uppercase tracking-[0.25em] font-black text-[#A68966] mb-3">
          {title}
        </h3>
        <p className={`text-4xl font-extralight tracking-tighter ${color || "text-[#2D1B0D]"}`}>
          {value}
        </p>
        <p className="text-[10px] text-[#A68966] mt-2 font-bold uppercase tracking-widest opacity-60">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}