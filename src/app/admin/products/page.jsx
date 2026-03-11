"use client";

import ProductForm from "../component/ProductForm";
import ProductTable from "../component/ProductTable";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function ProductsPage() {

  useEffect(()=>{
    AOS.init({
      duration:800,
      once:true
    })
  },[])

  return (
<div className="min-h-screen text-gray-800 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-10">

      <div className="max-w-7xl mx-auto space-y-10">

        <h1
        data-aos="fade-down"
        className="lg:text-4xl text-2xl font-bold text-gray-800"
        >
          🛍 Products Management
        </h1>

        <div data-aos="fade-up">
          <ProductForm/>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <ProductTable/>
        </div>

      </div>
    </div>
  );
}