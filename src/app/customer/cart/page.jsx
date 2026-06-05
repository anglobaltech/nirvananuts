"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Truck, Tag, Leaf, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true); // PRODUCTION FIX
  const [user, setUser] = useState(null);

  const normalize = (item) => ({
    ...item,
    qty: Number(item.qty || 1),
    price: Number(item.price) || 0,
    selectedWeight: item.selectedWeight || "Standard",
    tieredDiscounts: Array.isArray(item.tieredDiscounts) ? item.tieredDiscounts : [],
    mainImage: item.mainImage || "/placeholder.png",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        try {
          const docRef = doc(db, "carts", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const firebaseCart = docSnap.data().items || [];
            const mergedCart = [...firebaseCart, ...localCart].map(normalize);
            setCartItems(mergedCart);
            await updateDoc(docRef, { items: mergedCart });
            localStorage.removeItem("cart");
          } else {
            const initialCart = localCart.map(normalize);
            await setDoc(docRef, { items: initialCart });
            setCartItems(initialCart);
          }
        } catch (error) {
          console.error("Error managing cart data:", error);
        } finally {
          setAuthChecking(false); // Auth resolved, data ready
          setLoading(false);
        }
      } else {
        // PRODUCTION INTERCEPT: Explicit unauthenticated status returned from Firebase
        toast.error("Please login to view your cart");
        window.location.href = "/login"; // Absolute relocation for production stability
      }
    });
    return () => unsubscribe();
  }, []);

  // --- ENHANCED PRICING ENGINE ---
  const calculatePricing = (item) => {
    const basePrice = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    let discountPercent = 0;

    if (item.tieredDiscounts.length > 0) {
      const applicableOffer = item.tieredDiscounts
        .filter((offer) => qty >= Number(offer.qty))
        .sort((a, b) => Number(b.qty) - Number(a.qty))[0];

      if (applicableOffer) discountPercent = Number(applicableOffer.discount);
    }

    const unitPriceAfterDiscount = Math.round(basePrice - (basePrice * discountPercent) / 100);
    const totalItemPrice = unitPriceAfterDiscount * qty;
    const totalSavings = (basePrice * qty) - totalItemPrice;

    return {
      unitPriceAfterDiscount,
      totalItemPrice,
      totalSavings,
      discountPercent,
      isDiscounted: totalSavings > 0,
      originalTotal: basePrice * qty
    };
  };

  const updateQuantity = async (index, change) => {
    const updated = [...cartItems];
    updated[index].qty = Math.max(1, updated[index].qty + change);
    setCartItems(updated);
    if (user) await updateDoc(doc(db, "carts", user.uid), { items: updated });
    else localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = async (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    if (user) await updateDoc(doc(db, "carts", user.uid), { items: updated });
    else localStorage.setItem("cart", JSON.stringify(updated));
    toast.info("Item removed from cart");
  };

  // CLEAN SEPARATION ACTION FOR CHECKOUT
  const handleCheckoutNavigation = () => {
    // Remove single instant buy items so checkout defaults to fetching the database cart
    sessionStorage.removeItem("directCheckoutItem");
    router.push("/customer/checkout");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + calculatePricing(item).totalItemPrice, 0);
  const totalSavings = cartItems.reduce((acc, item) => acc + calculatePricing(item).totalSavings, 0);
  const shipping = subtotal > 500 || cartItems.length === 0 ? 0 : 80;
  const finalTotal = subtotal + shipping;

  // BLOCK RENDERING IN PRODUCTION UNTIL FIRESTORE AND AUTH HANDSHAKE COMPLETES
  if (authChecking || loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA] pt-24 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mt-6 lg:mt-12 mx-auto">
        
        {/* Header - Scaled down text sizing for small devices */}
        <header className="flex items-center mt-15 justify-between mb-6 lg:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">Cart</h1>
            <p className="text-[11px] sm:text-sm text-gray-500 font-medium">Review your selection of Nirvana Nuts</p>
          </div>
          <Link href="/" className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform sm:w-[16px] sm:h-[16px]" />
            back
          </Link>
        </header>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl lg:rounded-[3rem] p-6 sm:p-12 lg:p-20 text-center border border-gray-100 shadow-sm">
            <div className="bg-gray-50 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-gray-300">
              <ShoppingBag size={28} className="sm:w-[40px] sm:h-[40px]" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Your cart is feeling light.</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Add some healthy crunch to get things moving!</p>
            <Link href="/" className="bg-black text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold hover:opacity-90 transition-opacity inline-block">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12  gap-6 xl:gap-10 items-start">
            
            {/* Left Side: Product List */}
            <section aria-label="Shopping Cart Items" className="lg:col-span-7 space-y-4 lg:space-y-6">
              {cartItems.map((item, index) => {
                const stats = calculatePricing(item);
                return (
                  <article key={index} className="group bg-white rounded-2xl lg:rounded-[2rem] p-4 sm:p-6 flex flex-col lg:flex-row items-center gap-4 sm:gap-6 border border-transparent hover:border-orange-100 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                    
                    {/* Item Discount Ribbon */}
                    {stats.isDiscounted && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10">
                        <Sparkles size={10} /> {stats.discountPercent}% OFF
                      </div>
                    )}

                    {/* Responsive Image Container: Full width on mobile, static on desktop */}
                    <div className="relative w-full lg:w-32 h-44 xs:h-52 sm:h-64 lg:h-32 bg-[#F3F4F6] rounded-xl lg:rounded-3xl overflow-hidden shrink-0">
                      <Image
                        src={item.mainImage}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 128px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={item.name || "Nirvana Nuts Snack Pack Product Image"}
                      />
                    </div>

                    {/* Product Content Details Wrapper */}
                    <div className="flex-grow w-full flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h2 className="text-base sm:text-lg font-black text-gray-900 break-words line-clamp-2 pr-2">{item.name}</h2>
                        <button type="button" onClick={() => removeItem(index)} className="w-8 h-8 shrink-0 cursor-pointer rounded-xl flex items-center justify-center bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-200">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-900 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                          {item.selectedWeight}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Pack size</span>
                      </div>

                      {/* Dynamic Discount Message Notification */}
                      {item.tieredDiscounts?.length > 0 && (() => {
                        const sortedOffers = [...item.tieredDiscounts].sort(
                          (a, b) => Number(a.qty) - Number(b.qty)
                        );

                        const nextOffer = sortedOffers.find(
                          (offer) => item.qty < Number(offer.qty)
                        );

                        const currentOffer = sortedOffers
                          .filter((offer) => item.qty >= Number(offer.qty))
                          .sort((a, b) => Number(b.qty) - Number(a.qty))[0];

                        return (
                          <div className="mb-3">
                            {nextOffer ? (
                              <div className="bg-orange-50 border border-orange-100 text-orange-700 text-[10px] sm:text-xs font-bold px-3 py-2 rounded-xl">
                                Add{" "}
                                <span className="text-black">
                                  {Number(nextOffer.qty) - item.qty}
                                </span>{" "}
                                more for{" "}
                                <span className="text-green-600">
                                  {nextOffer.discount}% OFF
                                </span>
                              </div>
                            ) : currentOffer ? (
                              <div className="bg-green-50 border border-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-3 py-2 rounded-xl">
                                Congratulations! Your {currentOffer.discount}% discount is active 🎉
                              </div>
                            ) : null}
                          </div>
                        );
                      })()}
                      
                      {/* Price Action Strip - Keeps Toggles & Totals Aligned */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 lg:border-none">
                        <div className="flex items-center bg-gray-50 rounded-xl p-0.5 border border-gray-100">
                          <button type="button" onClick={() => updateQuantity(index, -1)} className="w-8 h-8 text-black cursor-pointer flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Minus size={12}/></button>
                          <span className="w-8 text-center font-black text-sm text-gray-900">{item.qty}</span>
                          <button type="button" onClick={() => updateQuantity(index, 1)} className="w-8 h-8 text-black cursor-pointer flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Plus size={12}/></button>
                        </div>

                        <div className="text-right">
                          {stats.isDiscounted && (
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.price * item.qty}
                              </span>
                              <span className="text-[9px] text-green-600 font-black uppercase">
                                {stats.discountPercent}% OFF
                              </span>
                            </div>
                          )}
                          <span className="text-xl font-black text-gray-900 tracking-tighter">
                            ₹{stats.totalItemPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Right Side: Enhanced Summary Sidebar Block */}
            <aside aria-label="Order Checkout Summary" className="lg:col-span-5 w-full">
              <div className="bg-white rounded-2xl lg:rounded-[3rem] p-4 sm:p-8 lg:p-10 shadow-lg shadow-orange-100/40 border border-orange-50 lg:sticky lg:top-32">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 mb-4 lg:mb-8 flex items-center gap-2 uppercase tracking-tight">
                    Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-500 font-bold text-xs sm:text-sm">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal + totalSavings}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="p-3 bg-green-50 rounded-xl border border-green-100 my-2">
                      <div className="flex justify-between text-green-700 font-black text-xs">
                        <span className="flex items-center gap-1.5"><Tag size={13}/> Nirvana Savings</span>
                        <span>-₹{totalSavings}</span>
                      </div>
                      <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest mt-1">Tiered Discount Applied</p>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-500 font-bold text-xs sm:text-sm">
                    <span>Delivery Fee</span>
                    <span className={shipping === 0 ? "text-green-600 font-black" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="h-px bg-gray-100 my-3" />
                  
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Payable</span>
                      {totalSavings > 0 && <span className="text-[9px] text-green-600 font-black uppercase">Tax Included</span>}
                    </div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter">₹{finalTotal}</span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleCheckoutNavigation}
                  className="w-full cursor-pointer bg-black text-white py-4 lg:py-6 rounded-xl lg:rounded-[2rem] font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                >
                  Checkout <Zap size={15} className="fill-yellow-400 text-yellow-400 border-none group-hover:scale-125 transition-transform" />
                </button>

                {/* Trust Badges Footer Grid */}
                <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-1 px-1">
                   <div className="flex flex-col items-center gap-1">
                     <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-sm"><ShieldCheck size={16}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider text-center leading-tight">Secure<br/>Checkout</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                     <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm"><Truck size={16}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider text-center leading-tight">Express<br/>Shipping</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                     <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shadow-sm"><Leaf size={16}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider text-center leading-tight">Fresh<br/>Stock</span>
                   </div>
                </div>
              </div>
            </aside>

          </div>
        )}
      </div>
    </main>
  );
}