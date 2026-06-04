"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getUserOrders } from "@/customerService/orderServiceCustomer";
import { getWishlist } from "@/customerService/wishlistService";
import DashboardCard from "../DashboardCards"; // Path based on your structure
import Link from "next/link";
import { Package, Crown, ArrowRight, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setLoading(false);
        return;
      }
      setUser(u);
      // FETCH USER PROFILE
      const userRef = doc(db, "users", u.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
      try {
        const orderData = await getUserOrders(u.uid);
        setOrders(orderData || []);
        const wishlistData = await getWishlist(u.uid);
        setWishlist(wishlistData || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, curr) => acc + (curr.total || curr.totalAmount || 0), 0);
  const rewardPoints = Math.floor(totalSpent / 10);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="w-6 h-6 border-2 border-[#2D1B0D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#2D1B0D] p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 2xl:p-16 4xl:p-24">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6 mt-24 md:mt-20 lg:mt-16 xl:mt-12 4xl:mt-20 mb-10 lg:mb-16 4xl:mb-24">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full xl:w-auto">
          <div className="flex items-center gap-2 mb-2 lg:mb-3">
            <span className="text-[9px] sm:text-[10px] 4xl:text-sm uppercase tracking-[0.3em] text-[#A68966] font-black">
              Nirvana Private Portal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl 4xl:text-7xl font-extralight tracking-tighter leading-tight">
            Welcome <span className="font-serif italic text-[#A68966]">{userData?.fullName || "to Nirvananuts"}</span>
          </h1>
          <p className="text-[#A68966] text-xs sm:text-sm 4xl:text-lg mt-2 font-medium tracking-wide">
            Here's what's happening with your account
          </p>
        </motion.div>

        <Link href="/customer/orders" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-[#2D1B0D] cursor-pointer text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[10px] 4xl:text-xs font-black uppercase tracking-[0.2em] hover:bg-[#442C1E] transition-all shadow-xl shadow-[#2D1B0D]/10 flex items-center justify-center gap-3">
            <Package size={14} /> Track Orders
          </button>
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 4xl:gap-12 mb-10 lg:mb-16 4xl:mb-24">
        <DashboardCard 
          title="Total Orders" 
          value={totalOrders} 
          sub="Your total purchases" 
          color="text-[#A68966]"
        />
        <DashboardCard 
          title="Total Spent" 
          value={`₹${totalSpent.toLocaleString()}`} 
          sub="Across all orders" 
          color="text-[#A68966]"
        />
        <DashboardCard 
          title="Wishlist" 
          value={wishlist.length} 
          sub="Saved items" 
          color="text-[#A68966]"
        />
        <DashboardCard 
          title="Reward Points" 
          value={rewardPoints} 
          sub="Earned points" 
          color="text-[#C5A059]"
        />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10 4xl:gap-16">
        
        {/* RECENT ORDERS */}
        <div className="order-2 xl:order-1 xl:col-span-8 bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 4xl:p-16 border border-[#E5D5C6]/50">
          <div className="flex justify-between items-center mb-6 lg:mb-10">
            <h2 className="text-xs sm:text-sm 4xl:text-lg uppercase tracking-[0.2em] font-black italic">Recent Orders</h2>
            <Link href="/customer/orders" className="group flex items-center gap-2 text-[9px] sm:text-[10px] 4xl:text-xs font-black uppercase tracking-widest text-[#A68966] hover:text-[#2D1B0D] transition-colors">
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-transparent hover:border-[#F1E9E0] hover:bg-[#FAF9F6]/50 transition-all group">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F4EDE4] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#2D1B0D] shrink-0">
                      <Package size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm uppercase tracking-tight italic break-all">
                        {order.items?.[0]?.name || "Order Product"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] 4xl:text-xs text-[#A68966] font-bold uppercase tracking-widest mt-0.5">
                        {order.createdAt?.toDate?.().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) || "Date"}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto pl-14 sm:pl-0">
                    <p className="font-black text-xs sm:text-sm 4xl:text-lg">₹{order.total || order.totalAmount || 0}</p>
                    <span className="inline-block text-[8px] sm:text-[9px] 4xl:text-xs font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 sm:py-1 rounded mt-1">
                      {order.status || "Placed"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-[10px] sm:text-xs text-[#A68966] uppercase tracking-widest font-bold opacity-40">
                No orders yet
              </p>
            )}
          </div>
        </div>

        {/* PROFILE SIDEBAR */}
        <div className="order-1 xl:order-2 xl:col-span-4 flex flex-col gap-4 sm:gap-6 4xl:gap-10">
          <div className="bg-[#2D1B0D] rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 4xl:p-16 text-center text-[#F4EDE4] relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 4xl:w-32 4xl:h-32 rounded-full border-2 border-[#C5A059] mx-auto p-1 mb-4 sm:mb-6">
                <div className="w-full h-full bg-[#F4EDE4] rounded-full flex items-center justify-center text-2xl sm:text-3xl 4xl:text-4xl font-black text-[#2D1B0D]">
                  {userData?.fullName?.charAt(0) || "S"}
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl 4xl:text-4xl font-serif italic tracking-tight mb-1">
                {userData?.fullName || "Guest"}
              </h2>
              <p className="text-[#A68966] text-[9px] sm:text-[10px] 4xl:text-sm font-bold uppercase tracking-widest mb-6 break-all">
                {userData?.email || user?.email} 
              </p>

              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 sm:pt-8">
                <div>
                  <p className="text-lg sm:text-xl 4xl:text-3xl font-light">{totalOrders}</p>
                  <p className="text-[8px] 4xl:text-xs uppercase tracking-widest text-[#A68966] mt-1">Orders</p>
                </div>
                <div className="border-x border-white/10">
                  <p className="text-lg sm:text-xl 4xl:text-3xl font-light">{wishlist.length}</p>
                  <p className="text-[8px] 4xl:text-xs uppercase tracking-widest text-[#A68966] mt-1">Wishlist</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl 4xl:text-3xl font-light">{rewardPoints}</p>
                  <p className="text-[8px] 4xl:text-xs uppercase tracking-widest text-[#A68966] mt-1">Points</p>
                </div>
              </div>
            </div>
            {/* Background Light Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-[80px] -mr-16 -mt-16 rounded-full" />
          </div>

          <Link href="/customer/profile" className="w-full">
            <button className="w-full bg-white border cursor-pointer border-[#D2C1B0] text-[#2D1B0D] py-4 sm:py-5 rounded-xl sm:rounded-2xl text-[10px] 4xl:text-xs font-black uppercase tracking-[0.2em] hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-3">
              <UserIcon size={14} /> Edit Profile
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}