"use client";

import ProductForm from "../component/ProductForm";
import ProductTable from "../component/ProductTable";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Package, Sparkles } from "lucide-react";
import {ToastContainer } from "react-toastify";


export default function ProductsPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-expo"
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#2D1B0D] pb-24 selection:bg-[#2D1B0D] selection:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20 pt-16">
        
        {/* Header Section */}
        <header className="space-y-6" data-aos="fade-down">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D1B0D] text-white rounded-full">
              <Sparkles size={14} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5E3C]">
              Product Management
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter italic leading-tight">
            Product <span className="text-[#A68966] font-serif">Inventory</span>
          </h1>
          <p className="max-w-md text-sm text-[#2D1B0D]/60 leading-relaxed font-light">
            Manage your products, Product Options, and Discounts & Offers from a One Place.
          </p>
        </header>

        {/* Form Section */}
        <div data-aos="fade-up" className="relative">
          <ProductForm />
        </div>

        {/* Table Section */}
        <div data-aos="fade-up" data-aos-delay="200">
          <ProductTable />
        </div>

      </div>
    </div>
  );
}