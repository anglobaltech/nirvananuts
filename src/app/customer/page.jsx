"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserOrders } from "@/customerService/orderServiceCustomer";
import { UserRound, MapPin, Mail, Phone, Package, LogOut, ChevronRight, Clock, CheckCircle2, Truck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }
      setUser(currentUser);
      
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const userOrders = await getUserOrders(currentUser.uid);
        setOrders(userOrders || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
      
      setLoading(false);
    });

    return () => unsubAuth();
  }, [router]);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await auth.signOut();
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4EDE4] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8B5E3C]/30 border-t-[#8B5E3C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#F4EDE4] flex flex-col items-center justify-center gap-4">
        <p className="text-[#8B5E3C] font-black uppercase tracking-widest text-xs">Profile Not Found</p>
        <button onClick={handleLogout} className="px-6 py-2 bg-[#2D1B0D] text-white rounded-full">Sign Out</button>
      </div>
    );
  }

  const name = userData.fullName || userData.name || userData.displayName || "Valued Customer";
  const addressParts = [userData.street, userData.city, userData.state, userData.pincode].filter(Boolean).join(", ");

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "Out for Delivery":
      case "Shipped": return <Truck size={16} className="text-amber-500" />;
      default: return <Clock size={16} className="text-[#8B5E3C]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] pt-28 pb-20 px-4 md:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[#8B5E3C] mb-2">
              <UserRound size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Client Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter italic text-[#2D1B0D]">
              Welcome, <span className="font-serif">{name.split(" ")[0]}.</span>
            </h1>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B5E3C] hover:text-red-500 transition-colors bg-white/40 px-5 py-2.5 rounded-full border border-white/60 shadow-sm w-fit"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/50 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-[#2D1B0D]/5">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  {userData.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#2D1B0D] text-[#F4EDE4] flex items-center justify-center text-3xl font-extralight italic shadow-md border-4 border-white">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-[#2D1B0D] tracking-tight">{name}</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A68966] mt-1">Premium Member</p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/60">
                  <div className="w-10 h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#8B5E3C]" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966]">Email</p>
                    <p className="text-sm font-medium text-[#2D1B0D] truncate">{userData.email || "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/60">
                  <div className="w-10 h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966]">Phone</p>
                    <p className="text-sm font-medium text-[#2D1B0D]">{userData.phone || userData.mobile || "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/60">
                  <div className="w-10 h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966]">Shipping Address</p>
                    <p className="text-xs font-serif italic text-[#2D1B0D]/80 leading-relaxed mt-0.5">
                      {addressParts || "No address provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-[#2D1B0D] text-[#F4EDE4] p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5E3C] blur-[60px] opacity-40 rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A68966] mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/customer/cart" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <span className="text-sm font-medium">View Cart</span>
                  <ChevronRight size={16} className="text-[#A68966] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/customer/wishlist" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <span className="text-sm font-medium">View Wishlist</span>
                  <ChevronRight size={16} className="text-[#A68966] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <span className="text-sm font-medium">Continue Shopping</span>
                  <ChevronRight size={16} className="text-[#A68966] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Orders */}
          <div className="lg:col-span-8">
            <div className="bg-white/50 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-[#2D1B0D]/5 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extralight tracking-tight text-[#2D1B0D] italic">
                  Order <span className="font-serif">History</span>
                </h2>
                <div className="bg-[#F4EDE4] text-[#8B5E3C] px-4 py-1.5 rounded-full text-xs font-bold">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-20 bg-white/40 rounded-3xl border border-white/60">
                  <div className="w-16 h-16 bg-[#F4EDE4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-[#8B5E3C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D1B0D] mb-2">No Orders Yet</h3>
                  <p className="text-sm text-[#2D1B0D]/60 max-w-sm mx-auto mb-6">Looks like you haven't made your first purchase. Explore our premium selection!</p>
                  <Link href="/">
                    <button className="px-8 py-3 bg-[#2D1B0D] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#8B5E3C] transition-colors">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    const date = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    }) : "Recent";

                    return (
                      <div key={order.id} className="bg-white/60 rounded-3xl p-5 md:p-6 border border-white shadow-sm hover:shadow-md transition-shadow group">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#D2C1B0]/30">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966] mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                            <p className="text-sm font-medium text-[#2D1B0D]">{date}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-white shadow-sm">
                            {getStatusIcon(order.status)}
                            <span className="text-xs font-bold text-[#2D1B0D] uppercase tracking-wider">{order.status}</span>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          {order.products?.map((prod, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-xl bg-[#F4EDE4] border border-white shadow-sm relative overflow-hidden shrink-0">
                                <Image
                                  src={prod.mainImage || prod.image || "/placeholder.png"}
                                  alt={prod.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="text-sm font-bold text-[#2D1B0D] line-clamp-1">{prod.name || prod.title}</h4>
                                <p className="text-xs text-[#A68966] mt-0.5">
                                  {prod.selectedWeight || "Standard"} × {prod.qty}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-[#2D1B0D]">₹{prod.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4EDE4]/50 p-4 rounded-2xl">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">Payment</p>
                            <p className="text-sm font-bold text-[#2D1B0D] uppercase">{order.payment || "COD"}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">Total Amount</p>
                            <p className="text-xl font-black text-[#2D1B0D]">₹{order.totalAmount}</p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
