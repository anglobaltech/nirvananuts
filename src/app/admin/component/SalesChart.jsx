"use client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data = [] }) {
  return (
    <div className="bg-white/50 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] 
                    border border-white shadow-2xl shadow-black/[0.02]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extralight text-[#2D1B0D] tracking-tight italic">
            Sales Report
          </h2>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#A68966] mt-2 font-black opacity-70">
            Market Performance Visualization
          </p>
        </div>
        <div className="px-5 py-2 bg-[#2D1B0D] rounded-full shrink-0">
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white">Live Data Stream</span>
        </div>
      </div>

      {/* Dynamic height based on device */}
      <div className="h-[280px] sm:h-[350px] lg:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.length ? data : [{ name: "No Data", sales: 0 }]}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D2C1B0" />
                <stop offset="50%" stopColor="#8B5E3C" />
                <stop offset="100%" stopColor="#2D1B0D" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#E5E7EB" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#A68966", fontSize: 9, fontWeight: "800" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#A68966", fontSize: 9, fontWeight: "800" }}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#2D1B0D", 
                borderRadius: "20px", 
                border: "none", 
                color: "#fff",
                padding: "10px 20px"
              }}
              itemStyle={{ color: "#F4EDE4", fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{ fill: "#fff", stroke: "#8B5E3C", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: "#2D1B0D", stroke: "#fff", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}