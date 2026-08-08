"use client";

import Image from "next/image";
import { ShoppingBag, Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function WishlistCard({ product, onRemove }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  
  const normalizedProduct = {
    ...product,
    docId: product.docId || product.id,
    name: product.name || product.title,
    mainImage: product.mainImage || product.image || "/placeholder.png",
    price: Number(product.price || (product.variants?.[0]?.price) || 0),
  };

  const weightVariants = useMemo(() => {
    return normalizedProduct.variants && normalizedProduct.variants.length > 0 
      ? normalizedProduct.variants 
      : [
          { label: "250gm", price: normalizedProduct.price },
          { label: "500gm", price: normalizedProduct.price * 1.9 },
        ];
  }, [normalizedProduct.variants, normalizedProduct.price]);

  const [selectedWeight, setSelectedWeight] = useState(() => weightVariants[0]);

  useEffect(() => {
    setSelectedWeight(weightVariants[0]);
  }, [weightVariants]);

  const isOutOfStock =
    (!normalizedProduct.inStock && normalizedProduct.inStock !== undefined && normalizedProduct.stock !== true)
    || (Array.isArray(normalizedProduct.variants) &&
      normalizedProduct.variants.length > 0 && 
      normalizedProduct.variants.every((v) => Number(v.stock) <= 0));

  const basePrice = Number(selectedWeight?.price || 0);

  const tiers = useMemo(() => {
    const rawTiers = Array.isArray(normalizedProduct.tieredDiscounts)
      ? normalizedProduct.tieredDiscounts
      : Array.isArray(product.buyMoreSaveMore)
      ? product.buyMoreSaveMore
      : [];
    return [...rawTiers].sort((a, b) => Number(a?.qty || 0) - Number(b?.qty || 0));
  }, [normalizedProduct.tieredDiscounts, product.buyMoreSaveMore]);
    
  const activeTier = useMemo(() => {
    return tiers
      .filter((t) => t && quantity >= Number(t.qty || 0))
      .sort((a, b) => Number(b.qty || 0) - Number(a.qty || 0))[0];
  }, [tiers, quantity]);

  const tierDiscountPercent = activeTier ? Number(activeTier.discount || 0) : 0;
  const priceAfterTier = Math.round(basePrice - (basePrice * tierDiscountPercent) / 100);
  const totalPayable = priceAfterTier * quantity;

  const validDiscounts = useMemo(() => {
    return tiers
      .filter((t) => t && t.discount != null)
      .map((t) => Number(t.discount));
  }, [tiers]);

  const isMaxDiscount =
    validDiscounts.length > 0 &&
    tierDiscountPercent === Math.max(...validDiscounts);
  
  const nextTier = useMemo(() => {
    return tiers.find((t) => t && Number(t.qty || 0) > quantity);
  }, [tiers, quantity]);

  const moveToCart = async () => {
    if (isOutOfStock) return;
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please login first");
        return;
      }

      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      
      let existingCartItems = [];
      if (cartSnap.exists()) {
        existingCartItems = cartSnap.data().items || [];
      }

      const itemToMoveId = normalizedProduct.docId;
      const weightLabel = selectedWeight?.label || "Default";

      const existingItemIndex = existingCartItems.findIndex(
        (cartItem) => cartItem.docId === itemToMoveId && cartItem.selectedWeight === weightLabel
      );

      let updatedCartItems;
      if (existingItemIndex > -1) {
        updatedCartItems = [...existingCartItems];
        updatedCartItems[existingItemIndex].qty += quantity;
      } else {
        const newCartItem = {
          docId: itemToMoveId,
          name: normalizedProduct.name,
          mainImage: normalizedProduct.mainImage,
          selectedWeight: weightLabel,
          price: basePrice,
          qty: quantity,
          tieredDiscounts: tiers 
        };
        updatedCartItems = [...existingCartItems, newCartItem];
      }

      await setDoc(cartRef, { items: updatedCartItems }, { merge: true });
      
      onRemove(product); 
      toast.success("Item moved to cart!");
    } catch (error) {
      console.error("Error moving item to cart:", error);
      toast.error("Failed to move item to cart");
    }
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col w-full max-w-[340px] mx-auto">

      {/* Image Container */}
      <div className="relative h-64 w-full shrink-0 bg-[#7c9071]">
        <Image
          src={normalizedProduct.mainImage}
          alt={normalizedProduct.name || "Product Image"}
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Trash Button */}
        <button 
          onClick={() => onRemove(product)}
          className="absolute top-4 right-4 flex items-center justify-center bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-sm z-10 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>

        {/* OUT OF STOCK Badge */}
        {isOutOfStock && (
          <div className="absolute bottom-4 left-4 bg-[#f8315f] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-md uppercase tracking-wider z-10">
            Out of Stock
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow bg-white">
        
        {/* Title */}
        <h2 className="text-[19px] font-bold text-slate-900 leading-tight mt-5 px-5">
          {normalizedProduct.name || "Nirvana Nuts"}
        </h2>
        
        {/* Stars */}
        <div className="flex items-center gap-1 mt-2 px-5">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < (normalizedProduct.rating || 4) ? "text-[#fbbf24]" : "text-gray-200"}`}>★</span>
            ))}
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-3 mt-5 px-5">
          {weightVariants.map((v) => {
            const isSelected = selectedWeight?.label === v.label;
            return (
              <button
                key={v.label}
                onClick={() => { setSelectedWeight(v); setQuantity(1); }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                  isSelected
                    ? "bg-[#0f172a] text-white border-[#0f172a]"
                    : "bg-white text-slate-500 border-slate-200"
                }`}
              >
                {v.label}
              </button>
            )
          })}
        </div>

        {/* Promo Banner */}
        <div className="mt-5 px-5">
          {isMaxDiscount ? (
            <div className="bg-[#fffdf0] border border-[#fef08a] rounded-xl px-4 py-2.5 flex items-center gap-2.5 w-full">
              <CheckCircle size={14} className="text-[#d97706]" />
              <p className="text-[13px] font-medium text-[#b45309]">Max discount active</p>
            </div>
          ) : (nextTier && (Number(nextTier.qty || 0) - quantity > 0)) ? (
            <div className="bg-[#fffdf0] border border-[#fef08a] rounded-xl px-4 py-2.5 flex items-center gap-2.5 w-full">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <p className="text-[13px] font-medium text-[#b45309]">
                Add {Number(nextTier.qty || 0) - quantity} more for {nextTier.discount}% OFF
              </p>
            </div>
          ) : (
            <div className="h-[42px]"></div>
          )}
        </div>

        {/* Price */}
        <div className="mt-5 px-5 flex items-baseline gap-2">
          <span className="text-[28px] font-black text-slate-900 tracking-tight">₹{priceAfterTier}</span>
          {tierDiscountPercent > 0 && <span className="text-sm text-slate-400 line-through">₹{basePrice}</span>}
        </div>

        {/* Qty Selector */}
        <div className="mt-5 mx-5 flex items-center justify-between border border-slate-100 bg-[#fafafa]/50 rounded-xl px-4 py-2">
          <span className="text-sm font-medium text-slate-500">Qty</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 text-lg font-medium hover:bg-slate-50 transition-colors"
            >
              -
            </button>
            <span className="text-sm font-bold text-slate-900 w-4 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 text-lg font-medium hover:bg-slate-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Checkout Block Button */}
        <div className="mt-5 mb-5 px-5">
          <button
            onClick={moveToCart}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[15px] transition-all ${
              isOutOfStock
                ? "bg-slate-100 text-slate-400 border border-slate-200/60 cursor-not-allowed"
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] active:scale-[0.98]"
            }`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>Checkout Block (₹{totalPayable})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
