"use client";
import DashboardCards from "../component/DashboardCards";
import SalesChart from "../component/SalesChart";
import { useDashboard } from "../../../services/dashboardService";
import { TrendingUp, ShoppingBag, Users, Package, ChevronRight, Zap } from "lucide-react";

export default function DashboardPage() {
  const { totalSales, orders, customers, products, salesData, loading } = useDashboard();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F4EDE4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-t-2 border-[#2D1B0D] rounded-full animate-spin" />
          <p className="text-[9px] font-black tracking-[0.5em] text-[#8B5E3C] uppercase">Synchronizing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] selection:bg-[#2D1B0D] selection:text-white pb-10 sm:pb-20">
      
      <header className="pt-20 sm:pt-20 pb-8 sm:pb-12 px-6 lg:px-16 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-black text-white rounded-full">
              <Zap size={10} fill="white" />
            </div>
            <span className="text-[8px] sm:text-[10px]  font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#8B5E3C]">
              Business Overview
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tighter italic leading-tight">
            Dashboard<span className="text-[#A68966] font-serif">.</span>
          </h1>
        </div>
      </header>

      <main className="px-6 lg:px-16 max-w-screen-2xl mx-auto space-y-8 sm:space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8">
          <DashboardCards 
            title="Total Sales" 
            value={`₹${totalSales?.toLocaleString()}`} 
            icon={<TrendingUp size={22} />} 
          />
          <DashboardCards 
            title="Total Orders" 
            value={orders} 
            icon={<ShoppingBag size={22} />} 
          />
          {/* Customer Base quantity is pulled live from Firebase Users collection */}
          <DashboardCards 
            title="Total Customers" 
            value={customers} 
            icon={<Users size={22} />} 
          />
          <DashboardCards 
            title="Available Products" 
            value={products} 
            icon={<Package size={22} />} 
          />
        </div>

        <div className="pt-2 sm:pt-4 overflow-hidden">
          {salesData && <SalesChart data={salesData} />}
        </div>

      </main>
    </div>
  );
}