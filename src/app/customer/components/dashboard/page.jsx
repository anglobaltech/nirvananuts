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
    <div className="min-h-screen w-full bg-[#FAF9F6] p-6 md:p-12 text-[#2D1B0D]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col mt-30 md:mt-17 md:flex-row justify-between items-end mb-16 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#A68966]"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A68966] font-black">Nirvana Private Portal</span>
          </div>
          <h1 className="text-5xl font-extralight tracking-tighter">
            Welcome <span className="font-serif italic text-[#A68966]">{userData?.fullName || "to Nirvananuts"}</span>
          </h1>
          <p className="text-[#A68966] text-sm mt-2 font-medium tracking-wide">
            Here's what's happening with your account
          </p>
        </motion.div>

        <Link href="/customer/orders">
          <button className="bg-[#2D1B0D] cursor-pointer text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#442C1E] transition-all shadow-xl shadow-[#2D1B0D]/10 flex items-center gap-3">
            <Package size={14} /> Track Orders
          </button>
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* RECENT ORDERS */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-[#E5D5C6]/50">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-sm uppercase tracking-[0.2em] font-black italic">Recent Orders</h2>
            <Link href="/customer/orders" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A68966] hover:text-[#2D1B0D] transition-colors">
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex justify-between items-center p-6 rounded-3xl border border-transparent hover:border-[#F1E9E0] hover:bg-[#FAF9F6]/50 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#F4EDE4] rounded-2xl flex items-center justify-center text-[#2D1B0D]">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-tight italic">{order.items?.[0]?.name || "Order Product"}</p>
                      <p className="text-[10px] text-[#A68966] font-bold uppercase tracking-widest">
                        {order.createdAt?.toDate?.().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) || "Date"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">₹{order.total || order.totalAmount || 0}</p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">
                      {order.status || "Placed"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-xs text-[#A68966] uppercase tracking-widest font-bold opacity-40">No orders yet</p>
            )}
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#2D1B0D] rounded-[2.5rem] p-10 text-center text-[#F4EDE4] relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full border-2 border-[#C5A059] mx-auto p-1 mb-6">
                <div className="w-full h-full bg-[#F4EDE4] rounded-full flex items-center justify-center text-3xl font-black text-[#2D1B0D]">
                  {userData?.fullName?.charAt(0) || "S"}
                </div>
              </div>
              
              <h2 className="text-2xl font-serif italic tracking-tight mb-1">{userData?.fullName || "Guest"}</h2>
              <p className="text-[#A68966] text-[10px] font-bold uppercase tracking-widest mb-6">{userData?.email || user?.email} </p>
              
              {/* <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-10">
                <Crown size={12} /> Gold Member
              </div> */}

              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-8">
                <div>
                  <p className="text-xl font-light">{totalOrders}</p>
                  <p className="text-[8px] uppercase tracking-widest text-[#A68966]">Orders</p>
                </div>
                <div className="border-x border-white/10">
                  <p className="text-xl font-light">{wishlist.length}</p>
                  <p className="text-[8px] uppercase tracking-widest text-[#A68966]">Wishlist</p>
                </div>
                <div>
                  <p className="text-xl font-light">{rewardPoints}</p>
                  <p className="text-[8px] uppercase tracking-widest text-[#A68966]">Points</p>
                </div>
              </div>
            </div>
            {/* Background Light Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-[80px] -mr-16 -mt-16 rounded-full" />
          </div>
          <Link href="/customer/profile">
          <button className="w-full bg-white border cursor-pointer border-[#D2C1B0] text-[#2D1B0D] py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-3">
             <UserIcon size={14} /> Edit Profile
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
}