"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { 
  UserPlus, 
  ShieldCheck, 
  UserCog, 
  Trash2, 
  Edit3, 
  Mail, 
  Lock, 
  User,
  X,
  Plus
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // For mobile UX

  const fetchAdmins = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const adminList = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(user => user.role === "admin");
    setAdmins(adminList);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role: "admin",
        createdAt: serverTimestamp()
      });
      resetForm();
      fetchAdmins();
      toast.success("Admin Added Successfully✅");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteAdmin = async (id, uid) => {
    if (!uid) {
      toast.error("UID missing ❌");
      return;
    }
    if (!confirm("Remove this admin?")) return;

    try {
      const res = await fetch("/apiAdmin/deleteAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error);
        return;
      }
      fetchAdmins();
      toast.success("Admin Removed Successfully✅");
    } catch (error) {
      toast.error("System Error");
    }
  };

  const handleEditAdmin = async (id) => {
    if (!name || !email) {
      toast.error("Fill all fields");
      return;
    }
    await updateDoc(doc(db, "users", id), { name, email });
    resetForm();
    fetchAdmins();
    toast.success("Admin Updated Successfully✅");
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setEmail("");
    setPassword("");
    setIsFormOpen(false);
  };

  const startEdit = (admin) => {
    setEditId(admin.id);
    setName(admin.name);
    setEmail(admin.email);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] selection:bg-[#2D1B0D] selection:text-white pb-20 pt-20 px-6 lg:px-16">
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black text-white rounded-full">
                <ShieldCheck size={14} fill="white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5E3C]">Admin Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter italic leading-tight">
              Manage<span className="text-[#A68966] font-serif"> Admin</span>
            </h1>
          </div>

          {!isFormOpen && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center cursor-pointer gap-4 group bg-white/40 hover:bg-white px-8 py-4 rounded-full border border-white/60 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
            >
              Add Admin <Plus size={14} className="group-hover:rotate-90 transition-transform" />
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Create/Edit Section (Floating Glass Card) */}
          {isFormOpen && (
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/[0.03] sticky top-32">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">
                    {editId ? "Edit Admin Details" : "Add New Admin"}
                  </h2>
                  <button onClick={resetForm} className="text-[#A68966] cursor-pointer hover:text-[#2D1B0D]">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" />
                    <input
                      className="w-full bg-white/50 border border-white/60 pl-11 pr-4 py-4 rounded-2xl text-sm outline-none focus:bg-white transition-all shadow-sm italic placeholder:opacity-50"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" />
                    <input
                      className="w-full bg-white/50 border border-white/60 pl-11 pr-4 py-4 rounded-2xl text-sm outline-none focus:bg-white transition-all shadow-sm italic placeholder:opacity-50"
                      placeholder="Email "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {!editId && (
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" />
                      <input
                        type="password"
                        className="w-full bg-white/50 border border-white/60 pl-11 pr-4 py-4 rounded-2xl text-sm outline-none focus:bg-white transition-all shadow-sm italic placeholder:opacity-50"
                        placeholder="Security Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  )}

                  <button
                    onClick={editId ? () => handleEditAdmin(editId) : handleAddAdmin}
                    className="w-full cursor-pointer bg-[#2D1B0D] hover:bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-black/20"
                  >
                    {editId ? "Update Admin" : "Create Admin"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admin List */}
          <div className={`${isFormOpen ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
            
            <div className="overflow-hidden bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl shadow-black/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#D2C1B0]/30">
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Admin Name</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966] hidden sm:table-cell">Contact Information</th>
                      <th className="p-8 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D2C1B0]/20">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="group hover:bg-white/60 transition-colors">
                        <td className="p-8">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2D1B0D] text-[#F4EDE4] text-sm font-extralight italic shadow-md transition-transform group-hover:scale-110">
                              {admin.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-[#2D1B0D] tracking-tight text-lg leading-none">{admin.name}</p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-[#A68966] opacity-60 mt-2">Administrator</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-8 hidden sm:table-cell">
                          <div className="flex items-center gap-2 text-xs text-[#2D1B0D]/80">
                            <Mail size={12} className="text-[#8B5E3C]" />
                            <span>{admin.email}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => startEdit(admin)}
                              className="p-3 bg-white cursor-pointer text-[#2D1B0D] rounded-full border border-[#D2C1B0]/30 hover:bg-[#2D1B0D] hover:text-white transition-all shadow-sm"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => deleteAdmin(admin.id, admin.uid)}
                              className="p-3 bg-red-50 cursor-pointer text-red-400 rounded-full border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}