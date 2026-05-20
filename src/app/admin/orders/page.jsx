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

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNextStatus = (status) => {
    switch (status) {
      case "Placed": return "Accepted";
      case "Accepted": return "Packed";
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
    await updateOrder(id, { status });
    fetchOrders();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this shipment record?")) {
      await deleteOrder(id);
      fetchOrders();
    }
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      Delivered: "bg-[#2D1B0D] text-white",
      Placed: "bg-[#F4EDE4] text-[#8B5E3C] border border-[#8B5E3C]/20",
      Shipped: "bg-[#8B5E3C]/10 text-[#8B5E3C]",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${colors[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] pt-24 pb-20 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-[#8B5E3C] mb-2">
              <Package size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Logistics Portal</span>
            </div>
            <h1 className="text-5xl font-extralight tracking-tighter italic">
              Order <span className="font-serif">Registry</span>
            </h1>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">Total Volume</p>
            <p className="text-2xl font-light italic">{orders.length} Shipments</p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-8 h-8 border-t-2 border-[#2D1B0D] rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Syncing Records...</p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden lg:block overflow-hidden bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl shadow-black/[0.03]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D2C1B0]/30">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Reference</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Client</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Contact</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Destination</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Manifest</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Valuation</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[#A68966]">Status</th>
                    <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest text-[#A68966]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D2C1B0]/20">
                  {orders.length === 0 ? (
                    <tr><td colSpan="8" className="p-20 text-center italic opacity-40">Registry is empty</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/50 transition-colors group">
                        <td className="p-6 font-mono text-[10px] opacity-40 tracking-tighter">#{order.orderId || order.id.slice(0, 8)}</td>
                        <td className="p-6">
                          <p className="font-bold text-sm tracking-tight">{order.customerName}</p>
                          <p className="text-[10px] text-[#A68966]">{order.customerEmail}</p>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2 text-xs font-medium opacity-80">
                             <PhoneCall size={12} className="text-[#8B5E3C]" />
                             {order.customerPhone || "N/A"}
                           </div>
                        </td>
                        <td className="p-6">
                          <p className="text-[11px] leading-relaxed max-w-[180px] opacity-70 italic font-serif">
                            {order.address && typeof order.address === "object"
                              ? `${order.address.street}, ${order.address.city}`
                              : "N/A"}
                          </p>
                        </td>
                        <td className="p-6">
                          <div className="flex -space-x-3 hover:space-x-1 transition-all">
                            {(order.products || []).map((prod, idx) => (
                              <img 
                                key={idx} 
                                src={prod.image || "/no-image.png"} 
                                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                                title={prod.name}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-6 font-light italic text-lg text-[#2D1B0D]">₹{order.totalAmount}</td>
                        <td className="p-6">
                          <div className="space-y-2">
                            <StatusBadge status={order.status} />
                            {getNextStatus(order.status) && (
                              <button
                                onClick={() => handleStatusChange(order.id, getNextStatus(order.status))}
                                className="flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter text-[#8B5E3C] hover:text-[#2D1B0D] transition-colors"
                              >
                                Advance <ChevronRight size={10} />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="p-3 text-red-200 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
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
            <div className="grid gap-6 lg:hidden">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl shadow-black/[0.02]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[9px] font-black text-[#A68966] uppercase tracking-[0.2em] mb-1">Ref #{order.orderId || order.id.slice(0, 5)}</p>
                      <h3 className="text-2xl font-extralight italic leading-tight">{order.customerName}</h3>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="space-y-4 border-y border-[#D2C1B0]/30 py-6 my-6">
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <Phone size={14} className="text-[#A68966]" /> {order.customerPhone || "No Phone Provided"}
                    </div>
                    <div className="flex items-start gap-3 text-xs opacity-70">
                      <MapPin size={14} className="text-[#A68966] mt-1 shrink-0" />
                      <span className="italic font-serif leading-relaxed">{order.address?.street}, {order.address?.city}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(order.products || []).map((prod, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <img src={prod.image} className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          <div>
                            <p className="text-xs font-bold tracking-tight">{prod.name}</p>
                            <p className="text-[10px] opacity-40 uppercase tracking-widest">{prod.quantity} Units</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium italic">₹{prod.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#D2C1B0]/30 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#A68966] tracking-widest mb-1">Total Valuation</p>
                      <p className="text-2xl font-light italic">₹{order.totalAmount}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {getNextStatus(order.status) && (
                    <button
                      onClick={() => handleStatusChange(order.id, getNextStatus(order.status))}
                      className="w-full mt-6 bg-[#2D1B0D] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-[#2D1B0D]/20 hover:bg-[#8B5E3C] transition-all flex items-center justify-center gap-2"
                    >
                      Advance: {getNextStatus(order.status)} <CheckCircle2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}