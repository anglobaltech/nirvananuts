"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { subscribeWishlist, removeFromWishlist } from "@/customerService/wishlistService";
import { auth, db } from "@/lib/firebase";
import { sortProducts, searchProducts } from "@/utils/wishlist";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

// Extracted Pricing Matrix Strategy for lightning-fast item lookups
const calculatePricing = (basePrice, quantity, tiers) => {
  const activeTier = [...tiers]
    .filter((t) => quantity >= t.qty)
    .sort((a, b) => b.qty - a.qty)[0];

  const discount = activeTier?.discount || 0;
  const finalPrice = Math.round(basePrice - (basePrice * discount) / 100);
  const totalPrice = finalPrice * quantity;
  const nextTier = tiers.find((t) => t.qty > quantity);

  return { discount, finalPrice, totalPrice, nextTier };
};

function WishlistCard({ item, handleRemove, handleBuyNow }) {
  const [quantity, setQuantity] = useState(1);

  // FIXED: Stabilized the fallback structural reference to prevent memory reference cascades
  const variants = useMemo(() => {
    return item.variants && item.variants.length > 0
      ? item.variants
      : null;
  }, [item.variants]);

  // FIXED: Extract fallback array gracefully without recreation loops
  const activeVariants = variants || [{ label: "Default", price: item.price }];

  const [selectedWeight, setSelectedWeight] = useState(() => activeVariants[0]);
  
  // Sync selected variant cleanly across state transitions safely
  useEffect(() => {
    if (variants && variants.length > 0) {
      setSelectedWeight(variants[0]);
    }
  }, [variants]);

  const basePrice = Number(selectedWeight?.price || item.price || 0);
  const tiers = item.tieredDiscounts || [];

  // Memorized deep mathematical arrays per single instance render
  const { discount, finalPrice, totalPrice, nextTier } = useMemo(
    () => calculatePricing(basePrice, quantity, tiers),
    [basePrice, quantity, tiers]
  );

  const onCheckoutClick = () => {
    handleBuyNow({
      ...item,
      quantity,
      selectedWeight: selectedWeight?.label || "Default",
      price: finalPrice,
    });
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Viewport Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={item.image || item.mainImage || "/placeholder.png"}
          alt={item.title}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Absolute Control Triggers */}
        <button
          onClick={() =>
  handleRemove(item.id || item.docId)
}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-red-600 shadow-sm hover:shadow transition-all z-10 cursor-pointer"
          title="Delete from wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.34 6m-4.72 0L9 9m12 3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <span className={`absolute bottom-3 left-3 text-[11px] font-bold tracking-wide uppercase px-2 py-1 rounded-md shadow-sm backdrop-blur-md ${
          item.stock ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"
        }`}>
          {item.stock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Information Shell Grid */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 mt-0.5 text-amber-400 text-xs">
            <span>{"★".repeat(item.rating || 4)}</span>
            <span className="text-gray-300">{"★".repeat(5 - (item.rating || 4))}</span>
          </div>
        </div>

        {/* Dynamic Multivariant Attribute Array MAP */}
        {activeVariants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 my-2">
            {activeVariants.map((v) => (
              <button
                key={v.label}
                onClick={() => {
                  setSelectedWeight(v);
                  setQuantity(1);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all cursor-pointer ${
                  selectedWeight?.label === v.label
                    ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Promotional Escalation Alerts */}
        {nextTier && (
          <div className="mt-1 bg-amber-50 text-amber-800 rounded-lg px-2.5 py-1.5 border border-amber-100 text-[11px] font-medium flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Add {nextTier.qty - quantity} more for {nextTier.discount}% OFF
          </div>
        )}

        {/* Pricing Actions Component Group */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-baseline justify-between flex-wrap gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-gray-900">₹{finalPrice}</span>
              {discount > 0 && (
                <span className="text-xs text-gray-400 line-through font-medium">₹{basePrice}</span>
              )}
            </div>
            {discount > 0 && (
              <span className="bg-rose-50 text-rose-600 text-[10px] px-2 py-0.5 rounded-full font-bold border border-rose-100">
                {discount}% OFF
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-3 bg-gray-50/70 rounded-xl p-1.5 border border-gray-100">
            <span className="text-xs text-gray-500 font-medium pl-1">Qty</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-7 h-7 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition flex items-center justify-center text-sm font-semibold text-gray-600 cursor-pointer"
              >
                -
              </button>
              <span className="font-bold text-gray-900 text-sm w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-7 h-7 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition flex items-center justify-center text-sm font-semibold text-gray-600 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={onCheckoutClick}
            disabled={!item.stock}
            className={`w-full mt-3 cursor-pointer py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
              item.stock
                ? "bg-gray-900 text-white hover:bg-black hover:shadow active:scale-[0.99]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Checkout Block (₹{totalPrice})
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let active = true;
        const unsubWishlist = subscribeWishlist(
          (data) => {
            if (!active) return;
            setWishlist(data || []);
            setAuthChecking(false);
            setLoading(false);
          },
          (err) => {
            if (!active) return;
            console.error(err);
            setError("Failed to load wishlist items securely.");
            setAuthChecking(false);
            setLoading(false);
          }
        );

        return () => {
          active = false;
          if (unsubWishlist) unsubWishlist();
        };
      } else {
        toast.error("Please login to view your wishlist");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    const fallbackList = Array.isArray(wishlist) ? wishlist : [];
    let data = searchProducts(fallbackList, search);
    return sortProducts(data, sort);
  }, [wishlist, search, sort]);

  const handleRemove = useCallback(async (id) => {
    try {
      await removeFromWishlist(id);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  }, []);

  const handleBuyNow = useCallback(async (item) => {
    const user = auth.currentUser;
    try {
      const cartItem = {
        docId: item.id,
        name: item.title,
        mainImage: item.image,
        price: item.price,
        qty: item.quantity,
        selectedWeight: item.selectedWeight,
        tieredDiscounts: item.tieredDiscounts || [],
      };

      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          const currentItems = cartSnap.data().items || [];
          await updateDoc(cartRef, {
            items: [...currentItems, cartItem],
          });
        } else {
          await setDoc(cartRef, {
            items: [cartItem],
          });
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        localCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(localCart));
      }

      router.push("/customer/checkout");
    } catch (error) {
      console.error("Checkout redirection failed:", error);
    }
  }, [router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } }
  };

  if (authChecking || loading) return (
    <main className="bg-gray-50/60 min-h-screen pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col h-[400px] bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-4">
              <div className="aspect-square w-full bg-gray-200 animate-pulse rounded-xl" />
              <div className="h-5 bg-gray-200 animate-pulse rounded w-2/3" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
              <div className="h-10 bg-gray-200 animate-pulse rounded-xl w-full mt-auto" />
            </div>
          ))}
        </section>
      </div>
    </main>
  );

  return (
    <main className="bg-gray-50/60 min-h-screen pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-5 border-b mt-10 border-gray-200 pb-6 mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black uppercase tracking-wider mb-4 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Store
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              My Wishlist 
              <span className="ml-2 text-xl font-normal text-gray-400">({filtered.length} items)</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-200 pl-9 pr-4 py-2.5 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition text-sm shadow-sm placeholder:text-gray-400"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition text-sm font-medium shadow-sm text-gray-700 w-full sm:w-48 cursor-pointer"
              >
                <option value="">Sort Options</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {filtered.length === 0 && (
          <section className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 p-8 shadow-sm">
            <div className="p-4 bg-rose-50 text-rose-500 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="text-gray-400 mt-1.5 text-sm max-w-sm">
              Explore your store space and save your preferred products right here.
            </p>
            <Link href="/" className="mt-5 px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold shadow transition active:scale-95">
              Discover Products
            </Link>
          </section>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 && (
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filtered.map((item) => (
                <motion.article
                  key={item.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                >
                  <WishlistCard
                    item={item}
                    handleRemove={handleRemove}
                    handleBuyNow={handleBuyNow}
                  />
                </motion.article>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}