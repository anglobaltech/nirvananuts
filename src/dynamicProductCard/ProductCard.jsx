"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Tag, Zap, CheckCircle } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  subscribeWishlist,
} from "@/customerService/wishlistService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function ProductCard({ product, addToCart }) {
  const router = useRouter();
  const [wish, setWish] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const weightVariants = product?.variants?.length > 0 ? product.variants : [
    { label: "250gm", price: Number(product?.price) || 0 },
    { label: "500gm", price: (Number(product?.price) || 0) * 1.9 },
    { label: "1kg", price: (Number(product?.price) || 0) * 3.6 },
    { label: "100kg", price: (Number(product?.price) || 0) * 320 },
  ];

  const [selectedWeight, setSelectedWeight] = useState(weightVariants[0]);

  const isOutOfStock =
  !product?.inStock ||
  product?.variants?.every((v) => Number(v.stock) <= 0);

  const basePrice = selectedWeight.price;
  const tiers = product?.tieredDiscounts || product?.buyMoreSaveMore || [];
  const activeTier = tiers
    .filter((t) => quantity >= t.qty)
    .sort((a, b) => b.qty - a.qty)[0];

  const tierDiscountPercent = activeTier ? activeTier.discount : 0;
  const priceAfterTier = Math.round(basePrice - (basePrice * tierDiscountPercent) / 100);
  const totalPayable = priceAfterTier * quantity;

  const isMaxDiscount = tiers.length > 0 && tierDiscountPercent === Math.max(...tiers.map(t => t.discount));
  const nextTier = tiers.find((t) => t.qty > quantity);

  useEffect(() => {
    const unsub = subscribeWishlist((items) => {
      const exists = items.find((i) => i.id === product.id || i.id === product.docId);
      setWish(!!exists);
    });
    return () => unsub && unsub();
  }, [product.docId]);

  const handleWishlist = async () => {
  try {
    if (wish) {
      await removeFromWishlist(product.docId);
      setWish(false);
    } else {
await addToWishlist({
  id: product.docId,
  title: product.name,
  description: product.description,
  image: product.mainImage,

  variants: product.variants || [],

  tieredDiscounts:
    product.tieredDiscounts ||
    product.buyMoreSaveMore ||
    [],

  stock: true,
  rating: 4,
});

      setWish(true);
    }
  } catch (error) {
    console.log(error);
  }
};

// ProductCard.jsx ke andar handleAction function ko replace karein
const handleAction = async (type) => {
  try {
    const item = {
      docId: product.docId,
      name: product.name,
      mainImage: product.mainImage,
      selectedWeight: selectedWeight.label,
      price: Number(selectedWeight.price),
      qty: Number(quantity),
      tieredDiscounts:
        product?.tieredDiscounts ||
        product?.buyMoreSaveMore ||
        [],
    };

    const user = auth.currentUser;

    if (user) {
      const cartRef = doc(db, "carts", user.uid);

      const cartSnap = await getDoc(cartRef);

      let existingItems = [];

      if (cartSnap.exists()) {
        existingItems = cartSnap.data().items || [];
      }

      const updatedItems = [...existingItems, item];

      await setDoc(
        cartRef,
        { items: updatedItems },
        { merge: true }
      );
    } else {
      const existingCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      localStorage.setItem(
        "cart",
        JSON.stringify([...existingCart, item])
      );
    }

    if (type === "cart") {
      router.push("/customer/cart");
    }

    if (type === "buyNow") {
      router.push("/customer/checkout");
    }

  } catch (error) {
    console.log("Buy Now Error:", error);
  }
};
  return (
    // Height constrained to 520px to keep it "Medium". Overflow-hidden prevents leaks.
    <div className="group relative bg-white rounded-[1.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col w-full max-w-[340px] mx-auto h-[550px]">
      
      {/* COMPACT IMAGE SECTION */}
      <div className="relative h-55 w-full overflow-hidden shrink-0">
        <Image
          src={product?.mainImage || "/placeholder.png"}
          alt={product?.name}
          fill
          className="object-center transition duration-700 group-hover:scale-105"
          priority
        />
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10"
        >
          <Heart size={16} className={wish ? "text-red-500 fill-red-500" : "text-gray-400"} />
        </button>

        {isOutOfStock && (
  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider z-10">
    Out of Stock
  </div>
)}
      </div>

      {/* CONTENT SECTION - Tighter Padding */}
      <div className="p-4 flex flex-col flex-grow bg-white relative">
        <h2 className="text-base font-black text-gray-900 leading-tight mb-1 truncate">
          {product?.name || "Nirvana Nuts"}
        </h2>
        
        {/* DESCRIPTION - Scrollable if too long to keep card height fixed */}
        <div className="h-12 overflow-y-auto mb-2 no-scrollbar">
            <p className="text-[11px] text-gray-500 leading-snug">
                {product?.description || "Premium roasted Nirvana Nuts. Nutrient-rich and perfect for a healthy crunch."}
            </p>
        </div>

        {/* WEIGHT SELECTION GRID - Compact */}
        <div className="grid grid-cols-4 gap-1 mb-2">
          {weightVariants.map((v) => (
            <button
              key={v.label}
              onClick={() => { setSelectedWeight(v); setQuantity(1); }}
              className={`py-1 rounded-lg text-[9px] font-black border transition-all ${
                selectedWeight.label === v.label
                  ? "bg-black text-white border-black"
                  : "bg-gray-50 text-gray-400 border-gray-100"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* PRICE DISPLAY - Condensed */}
        <div className="flex justify-between items-center mb-1 bg-orange-50/50 px-3 py-1 rounded-xl border border-orange-100">
          <div>
            <div className="flex items-center gap-0.5">
              <span className="text-xl font-black text-gray-900">₹{priceAfterTier}</span>
              {tierDiscountPercent > 0 && <span className="text-[10px] text-gray-400 line-through">₹{basePrice}</span>}
            </div>
            <span className="text-[8px] font-bold text-orange-600 uppercase tracking-tighter">Rate</span>
          </div>
          <div className="text-right border-l border-orange-200 pl-3">
            <p className="text-base font-black text-green-600">₹{totalPayable}</p>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Total</span>
          </div>
        </div>

        {/* DISCOUNT GREETING - Reduced Height */}
       <div className=" flex items-center">
          {isMaxDiscount ? (
            <div className="bg-green-50 border border-green-100 px-2 py-1 rounded-lg flex items-center gap-2 w-full">
              <CheckCircle size={12} className="text-green-600" />
              <p className="text-[9px] font-black text-green-700 uppercase">Congratulations! Your exclusive discount is now active 🎉</p>
            </div>
          ) : nextTier ? (
            <div className="bg-orange-50 border border-orange-100 px-2 py-1 rounded-lg flex items-center gap-2 w-full">
              <Tag size={12} className="text-orange-500" />
              <p className="text-[9px] font-bold text-orange-700">
                Add {nextTier.qty - quantity} more to activate {nextTier.discount}% OFF on your order
              </p>
            </div>
          ) : null}
        </div>

        {/* ACTIONS - Pinned to bottom */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-0.5 border border-gray-200">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm font-black text-gray-600">-</button>
            <span className="text-[11px] font-black text-gray-800">{quantity} Pack</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm font-black text-gray-600">+</button>
          </div>

         {isOutOfStock ? (
  <button
    disabled
    className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold text-xs uppercase tracking-wider border border-gray-200/60 cursor-not-allowed flex items-center justify-center gap-2"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
    Out Of Stock
  </button>
) : (
  <div className="flex items-center gap-3 w-full">
    
    {/* ADD TO CART BUTTON */}
    <button
      onClick={() => handleAction("cart")}
      title="Add to Cart"
      className={`p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer active:scale-95 ${
        isMaxDiscount
          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
          : "bg-white border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 shadow-xs"
      }`}
    >
      <ShoppingCart size={18} className="transition-transform duration-300 group-hover:scale-110" />
      {isMaxDiscount && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
    </button>

    {/* BUY NOW BUTTON */}
    <button
      onClick={() => handleAction("buyNow")}
      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-amber-600 transition-all duration-300 shadow-sm shadow-gray-900/10 active:scale-[0.98] group cursor-pointer"
    >
      <Zap size={14} className="fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12" />
      <span>Buy Now</span>
    </button>

  </div>
)}
        </div>
      </div>
    </div>
  );
}