"use client";

import { Trash2, Mail, Phone, MapPin } from "lucide-react";

export default function CustomerTable({ customers, loading, onDelete }) {
  if (loading) {
    return (
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 md:h-20 bg-white/40 backdrop-blur-md animate-pulse rounded-[2rem] border border-white" />
        ))}
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-32 rounded-[3rem] bg-white/20 border border-dashed border-[#D2C1B0]">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68966]">No Customers Found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-0">
      {/* Desktop Table View (Visible on MD screens and up) */}
      <div className="hidden xl:block overflow-hidden bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl shadow-black/[0.02]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D2C1B0]/30">
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Customer</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Contact Details</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Address</th>
              <th className="p-8 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2C1B0]/20">
            {customers.map((user) => (
              <TableRow key={user.id} user={user} onDelete={onDelete} isMobile={false} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Visible only on small screens) */}
      <div className="xl:hidden space-y-4">
        {customers.map((user) => (
          <TableRow key={user.id} user={user} onDelete={onDelete} isMobile={true} />
        ))}
      </div>
    </div>
  );
}

function TableRow({ user, onDelete, isMobile }) {
  const name = user.fullName || user.name || user.displayName || "Unknown Customer";
  const addressParts = [user.street, user.city, user.state, user.pincode].filter(Boolean).join(", ");

  if (isMobile) {
    return (
      <div className="bg-white/50 backdrop-blur-lg border border-white p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2D1B0D] text-[#F4EDE4] italic">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#8B5E3C] border-2 border-white rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-[#2D1B0D] tracking-tight text-lg leading-tight">{name}</h3>
            <p className="text-[8px] font-black uppercase tracking-widest text-[#A68966]">Registered Customer</p>
          </div>
          <button 
            onClick={() => onDelete(user.id)}
            className="ml-auto p-3 bg-red-50 text-red-400 rounded-full border border-red-100 active:bg-red-500 active:text-white transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="space-y-3 border-t border-[#D2C1B0]/20 pt-4">
          <div className="flex items-center gap-3 text-xs text-[#2D1B0D]/80">
            <Mail size={14} className="text-[#8B5E3C]" />
            <span className="truncate">{user.email || "—"}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#2D1B0D]/80">
            <Phone size={14} className="text-[#8B5E3C]" />
            <span>{user.phone || user.mobile || "—"}</span>
          </div>
          <div className="flex items-start gap-3 text-xs text-[#2D1B0D]/70 italic font-serif">
            <MapPin size={14} className="text-[#8B5E3C] mt-0.5" />
            <span className="leading-tight">{addressParts || "Address Not Available"}</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Table Row
  return (
    <tr className="group hover:bg-white/60 transition-colors">
      <td className="p-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md transition-transform group-hover:scale-110" />
            ) : (
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2D1B0D] text-[#F4EDE4] text-lg font-extralight italic shadow-md">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8B5E3C] border-2 border-white rounded-full" />
          </div>
          <div>
            <p className="font-bold text-[#2D1B0D] tracking-tight text-lg">{name}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966] opacity-60">Registered Customer</p>
          </div>
        </div>
      </td>
      <td className="p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#2D1B0D]/80">
          <Mail size={12} className="text-[#8B5E3C]" />
          <span>{user.email || "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#2D1B0D]/80">
          <Phone size={12} className="text-[#8B5E3C]" />
          <span>{user.phone || user.mobile || "—"}</span>
        </div>
      </td>
      <td className="p-8">
        <div className="flex items-start gap-2 max-w-[240px]">
          <MapPin size={12} className="text-[#8B5E3C] mt-1 shrink-0" />
          <p className="text-xs text-[#2D1B0D]/70 leading-relaxed italic font-serif">
            {addressParts || "Address Not Available"}
          </p>
        </div>
      </td>
      <td className="p-8 text-right">
        <button
          onClick={() => onDelete(user.id)}
          className="p-3 bg-red-50 text-red-400 rounded-full border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}