"use client";

import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CustomerTable from "../component/customerTable";
import { toast } from "react-toastify";
import { Users, Search, Filter, Sparkles } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtered = data.filter((user) => user.role === "customer");
      setCustomers(filtered);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching customers ❌");
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];
    if (search) {
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort === "az") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "newest") {
      result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    return result;
  }, [customers, search, sort]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      setCustomers((prev) => prev.filter((user) => user.id !== id));
      toast.success("Identity Removed from Registry ✅");
    } catch (error) {
      console.error(error);
      toast.error("Process Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] pt-12 md:pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col mt-10 lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[#8B5E3C] mb-2">
              <Users size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Client Relations</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter italic">
              The <span className="font-serif">Registry.</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative group w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" size={16} />
              <input
                type="text"
                placeholder="Search Identity..."
                className="w-full bg-white/40 backdrop-blur-md border border-white/60 pl-11 pr-4 py-3.5 rounded-2xl md:rounded-full text-sm outline-none focus:bg-white transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966] pointer-events-none" size={14} />
              <select
                className="appearance-none w-full bg-white/40 backdrop-blur-md border border-white/60 pl-10 pr-10 py-3.5 rounded-2xl md:rounded-full text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-sm"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Recent Entry</option>
                <option value="az">Alphabetical</option>
              </select>
            </div>
          </div>
        </header>

        <CustomerTable
          customers={filteredCustomers}
          loading={loading}
          onDelete={handleDelete}
        />

        <footer className="mt-20 pt-10 border-t border-[#D2C1B0]/30 flex flex-col items-center opacity-20">
          <Sparkles className="mb-4 text-[#8B5E3C]" size={24} />
          <div className="text-3xl md:text-4xl font-black tracking-[0.5em] italic">NIRVANA NUTS</div>
        </footer>
      </div>
    </div>
  );
}