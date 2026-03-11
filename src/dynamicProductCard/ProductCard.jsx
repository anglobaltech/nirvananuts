"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, shopproduct, addToCart }) {

  const [wish,setWish] = useState(false)
  const [quick,setQuick] = useState(false)

  return (

    <>
    
    {/* CARD */}
    <div
      data-aos="fade-up"
      className="group relative bg-white rounded-3xl overflow-hidden 
      shadow-md hover:shadow-2xl transition duration-500 
      hover:-translate-y-2 border border-gray-100"
    >

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* stock */}
        {!product.stock && (
<span className="absolute bottom-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
Out of Stock
</span>
)}

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          20% OFF
        </span>

        {/* Wishlist */}
        <button
          onClick={()=>setWish(!wish)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
        >
          <Heart
            size={18}
            className={wish ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-5 text-left">

        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex gap-1 mt-2 text-yellow-400">
          <Star size={14} fill="currentColor"/>
          <Star size={14} fill="currentColor"/>
          <Star size={14} fill="currentColor"/>
          <Star size={14} fill="currentColor"/>
          <Star size={14}/>
        </div>

        {/* Price */}
        <p className="text-orange-600 font-bold text-lg mt-2">
          ₹{product.price}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4">

<button
onClick={()=>shopproduct(product)}
disabled={!product.stock}
className={`flex-1 py-2 rounded-xl font-medium transition ${
product.stock
? "bg-orange-500 hover:bg-orange-600 text-white"
: "bg-gray-400 text-white cursor-not-allowed"
}`}
>
{product.stock ? "Shop Now" : "Out of Stock"}
</button>

<button
onClick={()=>addToCart(product)}
disabled={!product.stock}
className={`flex items-center justify-center gap-1 px-4 py-2 rounded-xl transition ${
product.stock
? "bg-gray-900 hover:bg-black text-white"
: "bg-gray-400 text-white cursor-not-allowed"
}`}
>
<ShoppingCart size={16}/>
Add
</button>

        </div>

      </div>

    </div>

    </>
  );
}