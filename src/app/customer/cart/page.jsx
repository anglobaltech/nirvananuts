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
    <main className="min-h-screen bg-[#F8F9FA] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mt-10 mx-auto">
        
        {/* Header - Page Context Semantic Identity */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Cart</h1>
            <p className="text-gray-500 font-medium">Review your selection of Nirvana Nuts</p>
          </div>
          <Link href="/" className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </header>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is feeling light.</h2>
            <p className="text-gray-500 mb-8">Add some healthy crunch to get things moving!</p>
            <Link href="/" className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform inline-block">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Product List with Discount Badges */}
            <section aria-label="Shopping Cart Items" className="lg:col-span-7 space-y-6">
              {cartItems.map((item, index) => {
                const stats = calculatePricing(item);
                return (
                  <article key={index} className="group bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6 border border-transparent hover:border-orange-100 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                    
                    {/* Item Discount Ribbon */}
                    {stats.isDiscounted && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-2xl flex items-center gap-1 z-10">
                        <Sparkles size={10} /> {stats.discountPercent}% OFF
                      </div>
                    )}

                    <div className="relative w-32 h-32 bg-[#F3F4F6] rounded-3xl overflow-hidden shrink-0">
                      <Image 
                        src={item.mainImage} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={item.name || "Nirvana Nuts Snack Pack Product Image"} 
                      />
                    </div>

                    <div className="flex-grow w-full">
                      <div className="flex justify-between items-start mb-1">
                        <h2 className="text-lg font-black text-gray-900">{item.name}</h2>
                        <button type="button" onClick={() => removeItem(index)} className="w-8 h-8 mt-1 cursor-pointer rounded-xl flex items-center justify-center bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-200">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-gray-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {item.selectedWeight}
                        </span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Pack size</span>
                      </div>

                      {/* Dynamic Discount Message */}
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
                          <div className="mb-4">
                            {nextOffer ? (
                              <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold px-4 py-3 rounded-2xl">
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
                              <div className="bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-4 py-3 rounded-2xl">
                                Congratulations! Your {currentOffer.discount}% discount is active 🎉
                              </div>
                            ) : null}
                          </div>
                        );
                      })()}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                          <button type="button" onClick={() => updateQuantity(index, -1)} className="w-10 h-10 text-black cursor-pointer flex items-center justify-center hover:bg-white rounded-xl transition-colors"><Minus size={14}/></button>
                          <span className="w-12 text-center font-black text-gray-900">{item.qty}</span>
                          <button type="button" onClick={() => updateQuantity(index, 1)} className="w-10 text-black h-10 cursor-pointer flex items-center justify-center hover:bg-white rounded-xl transition-colors"><Plus size={14}/></button>
                        </div>

                        <div className="text-right">
                          {stats.isDiscounted && (
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.price * item.qty}
                              </span>
                              <span className="text-[10px] text-green-600 font-black uppercase">
                                {stats.discountPercent}% OFF
                              </span>
                            </div>
                          )}
                          <span className="text-2xl font-black text-gray-900 tracking-tighter">
                            ₹{stats.totalItemPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Right Side: Enhanced Order Summary Layout block */}
            <aside aria-label="Order Checkout Summary" className="lg:col-span-5">
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-orange-100/50 border border-orange-50 sticky top-32">
                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                    Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-bold text-sm">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal + totalSavings}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100 mb-4">
                      <div className="flex justify-between text-green-700 font-black text-sm">
                        <span className="flex items-center gap-2"><Tag size={16}/> Nirvana Savings</span>
                        <span>-₹{totalSavings}</span>
                      </div>
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Tiered Discount Applied</p>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-500 font-bold text-sm">
                    <span>Delivery Fee</span>
                    <span className={shipping === 0 ? "text-green-600 font-black" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="h-px bg-gray-100 my-4" />
                  
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Payable</span>
                      {totalSavings > 0 && <span className="text-[10px] text-green-600 font-black uppercase">Tax Included</span>}
                    </div>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{finalTotal}</span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleCheckoutNavigation}
                  className="w-full cursor-pointer bg-black text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                >
                  Checkout <Zap size={18} className="fill-yellow-400 text-yellow-400 border-none group-hover:scale-125 transition-transform" />
                </button>

                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center px-2">
                   <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-sm"><ShieldCheck size={20}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest text-center">Secure<br/>Checkout</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm"><Truck size={20}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest text-center">Express<br/>Shipping</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shadow-sm"><Leaf size={20}/></div>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest text-center">Fresh<br/>Stock</span>
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