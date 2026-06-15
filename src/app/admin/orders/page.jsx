"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrder, deleteOrder } from "@/services/orderService";
import { 
  Package, 
  Trash2, 
  ChevronRight, 
  MapPin, 
  Phone, 
  CheckCircle2,
  PhoneCall
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Saare available statuses ki list dropdown ke liye
  const allStatuses = ["Order Received", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  const getNextStatus = (status) => {
    switch (status) {
      case "Order Received": return "Confirmed";
      case "Confirmed": return "Packed";
      case "Packed": return "Shipped";
      case "Shipped": return "Out for Delivery";
      case "Out for Delivery": return "Delivered";
      default: return null;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, { status });
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      toast.success("Shipment record deleted successfully", { theme: "colored" });
      fetchOrders();
    } catch (error) {
      toast.error("Failed to delete shipment record", { theme: "colored" });
    }
  };

  // Status Badge and Selector Section
  const StatusSelector = ({ currentStatus, orderId, isMobile = false }) => {
    const colors = {
      Delivered: "bg-[#2D1B0D] text-white border-[#2D1B0D]",
      Placed: "bg-[#F4EDE4] text-[#8B5E3C] border-[#8B5E3C]/20",
      Shipped: "bg-[#8B5E3C]/10 text-[#8B5E3C] border-[#8B5E3C]/20",
      Accepted: "bg-blue-50 text-blue-700 border-blue-200",
      Packed: "bg-amber-50 text-amber-700 border-amber-200",
      "Out for Delivery": "bg-purple-50 text-purple-700 border-purple-200",
    };

    return (
      <div className={`flex flex-col gap-1.5 ${isMobile ? "w-full" : "w-36"}`}>
        {!isMobile && (
          <span className="text-[8px] font-black uppercase tracking-wider text-[#A68966]">
            Change Status
          </span>
        )}
        <div className="relative inline-block w-full">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(orderId, e.target.value)}
            className={`w-full cursor-pointer appearance-none rounded-xl border px-3 py-2 pr-8 text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] ${
              colors[currentStatus] || "bg-gray-50 text-gray-700 border-gray-200"
            }`}
          >
            {allStatuses.map((status) => (
              <option key={status} value={status} className="bg-white text-[#2D1B0D] font-sans">
                {status}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 opacity-60">
            <ChevronRight size={12} className="rotate-90 transform" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] pt-24 pb-20 px-4 lg:px-12">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-[#8B5E3C] mb-2">
              <Package size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Order Management</span>
            </div>
            <h1 className="text-5xl font-extralight tracking-tighter italic">
              Order <span className="font-serif">Registry</span>
            </h1>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">Total Orders</p>
            <p className="text-2xl font-light italic">{orders.length} Orders</p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-8 h-8 border-t-2 border-[#2D1B0D] rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Loading Orders...</p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden xl:block overflow-hidden bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl shadow-black/[0.03]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D2C1B0]/30">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Order ID</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Customer</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Phone Number</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Delivery Address</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Products</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Total Amount</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Status</th>
                    <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest text-[#A68966]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D2C1B0]/20">
                  {orders.length === 0 ? (
                    <tr><td colSpan="8" className="p-20 text-center italic opacity-40">No Orders Found</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/50 transition-colors group">
                        <td className="p-6 font-mono text-[10px] opacity-40 tracking-tighter">#{order.orderId || order.id.slice(0, 8)}</td>
                        <td className="p-6">
                          <p className="font-bold text-sm tracking-tight">{order.customerName}</p>
                          <p className="text-[10px] text-[#A68966]">{order.email}</p>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2 text-xs font-medium opacity-80">
                             <PhoneCall size={12} className="text-[#8B5E3C]" />
                             {order.phone || order.address?.phone || "N/A"}
                           </div>
                        </td>
                        <td className="p-6">
                          <p className="text-[11px] leading-relaxed max-w-[180px] opacity-70 italic font-serif">
                            {order.address && typeof order.address === "object"
                              ? `${order.address.address}, ${order.address.city}`
                              : "N/A"}
                          </p>
                        </td>
                        <td className="p-6">
                          <div className="flex -space-x-3 hover:space-x-1 transition-all">
                            {(order.products || []).map((prod, idx) => (
                              <img 
                                key={idx} 
                                src={prod.mainImage || "/placeholder.png"} 
                                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                                title={prod.name}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-6 font-light italic text-lg text-[#2D1B0D]">₹{order.totalAmount}</td>
                        <td className="p-6">
                          {/* Naya Status Selector Component Desktop ke liye */}
                          <StatusSelector currentStatus={order.status} orderId={order.id} />
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className=" cursor-pointer p-3 text-red-200 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid gap-6 xl:hidden">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl shadow-black/[0.02]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[9px] font-black text-[#A68966] uppercase tracking-[0.2em] mb-1">Ref #{order.orderId || order.id.slice(0, 5)}</p>
                      <h3 className="text-2xl font-extralight italic leading-tight">{order.customerName}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 border-y border-[#D2C1B0]/30 py-6 my-6">
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <Phone size={14} className="text-[#A68966]" /> {order.phone || "No Phone Provided"}
                    </div>
                    <div className="flex items-start gap-3 text-xs opacity-70">
                      <MapPin size={14} className="text-[#A68966] mt-1 shrink-0" />
                      <span className="italic font-serif leading-relaxed">
                        {order.address
                          ? `${order.address.address || ""}, ${order.address.city || ""}`
                          : "Address Not Available"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(order.products || []).map((prod, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <img src={prod.mainImage} className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          <div>
                            <p className="text-xs font-bold tracking-tight">{prod.name}</p>
                            <p className="text-[10px] opacity-40 uppercase tracking-widest">{prod.qty} Quantity</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium italic">₹{prod.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#D2C1B0]/30 flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#A68966] tracking-widest mb-1">Total Amount</p>
                      <p className="text-2xl font-light italic">₹{order.totalAmount}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      className="p-4 cursor-pointer bg-red-50  text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Naya Status Selector Component Mobile Bottom ke liye */}
                  <div className="mt-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966] mb-2">Change Order Status</p>
                    <StatusSelector currentStatus={order.status} orderId={order.id} isMobile={true} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}