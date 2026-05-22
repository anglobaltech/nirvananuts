"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { createOrder } from "@/customerService/orderService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, ArrowLeft, Plus, Minus, Tag, Zap, 
  ChevronRight, CreditCard, Sparkles, Truck, Trash2 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateOrderId } from "@/services/generateOrderId";

// 1. ISOLATED PURE FUNCTION: Taken out of component memory path to bypass reconciliation
const computeItemCosting = (item) => {
  const basePrice = Number(item.price) || 0;
  const qty = Number(item.qty || item.quantity || 1);
  let discountPercent = 0;
  const discounts = item.tieredDiscounts || [];

  if (discounts.length > 0) {
    const applicableOffer = [...discounts]
      .filter((offer) => qty >= Number(offer.qty))
      .sort((a, b) => Number(b.qty) - Number(a.qty))[0];
    if (applicableOffer) discountPercent = Number(applicableOffer.discount);
  }

  const unitPriceAfterDiscount = Math.round(basePrice - (basePrice * discountPercent) / 100);
  const totalItemPrice = unitPriceAfterDiscount * qty;
  const totalSavings = (basePrice * qty) - totalItemPrice;

  return { totalItemPrice, totalSavings, discountPercent, originalTotal: basePrice * qty };
};

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutSource, setCheckoutSource] = useState("cart"); 
  const [contact, setContact] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      // SECURITY GUARD: If visitor is completely unauthorized, stop execution and route to /login
      if (!u) {
        toast.error("Please login to proceed with checkout");
        router.push("/login");
        setLoading(false);
        return;
      }

      let currentCart = [];
      const directCheckoutData = sessionStorage.getItem("directCheckoutItem");

      // ASSIGNMENT SEPARATION: Check if express route object is present
      if (directCheckoutData) {
        try {
          const parsedData = JSON.parse(directCheckoutData);
          currentCart = parsedData.items || [];
          setCheckoutSource("buyNow");
        } catch (err) {
          console.error("Session checkout parsing failed:", err);
        }
      } else {
        // Fallback option: If no direct purchase item is present, pull full long-term Firestore Cart
        const cartRef = doc(db, "carts", u.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          currentCart = cartSnap.data().items || [];
        }
        setCheckoutSource("cart");
      }

      // FETCH USER PROFILE DETAILS
      const userRef = doc(db, "users", u.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setContact({
          name: data.fullName || "",
          email: u.email || "",
          phone: data.mobile || "",
          address: data.street || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      }

      setCart(currentCart);
      loading && setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // 2. MEMOIZED DATA PROCESSING MATRIX
  const { totals, computedCartItems } = useMemo(() => {
    const computedCartItems = cart.map((item) => ({
      ...item,
      stats: computeItemCosting(item),
    }));

    const totals = computedCartItems.reduce(
      (acc, item) => {
        acc.subtotal += item.stats.originalTotal;
        acc.savings += item.stats.totalSavings;
        acc.final += item.stats.totalItemPrice;
        return acc;
      },
      { subtotal: 0, savings: 0, final: 0 }
    );

    return { totals, computedCartItems };
  }, [cart]);

  const freeShippingThreshold = 500;
  
  const shipping = useMemo(() => {
    return totals.final > freeShippingThreshold || cart.length === 0 ? 0 : 80;
  }, [totals.final, cart.length]);

  const amountToFreeShipping = freeShippingThreshold - totals.final;
  const grandTotal = totals.final + shipping;

  // 3. CACHED EVENT HANDLERS: Handles variations or quantities safely
  const updateQuantity = useCallback(async (index, change) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (!updated[index]) return prevCart;
      
      updated[index] = {
        ...updated[index],
        qty: Math.max(1, (updated[index].qty || 1) + change)
      };

      if (checkoutSource === "cart") {
        if (auth.currentUser) {
          updateDoc(doc(db, "carts", auth.currentUser.uid), { items: updated });
        }
      } else {
        // Save back safely to separate session memory only (Does not pollute database carts collection)
        sessionStorage.setItem("directCheckoutItem", JSON.stringify({ items: updated, checkoutSource: "buyNow" }));
      }
      return updated;
    });
  }, [checkoutSource]);

  const deleteItem = useCallback(async (index) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((_, i) => i !== index);
      
      if (checkoutSource === "cart") {
        if (auth.currentUser) {
          updateDoc(doc(db, "carts", auth.currentUser.uid), { items: updated });
        }
      } else {
        sessionStorage.setItem("directCheckoutItem", JSON.stringify({ items: updated, checkoutSource: "buyNow" }));
      }
      return updated;
    });
    toast.info("Item removed from your bag");
  }, [checkoutSource]);

  const handleOrder = async () => {
    if (cart.length === 0) return toast.error("Your bag is empty");
    if (!contact.name || !contact.address || !contact.phone) return toast.error("Please provide delivery details");
    
    try {
      const orderId = await generateOrderId();
      await createOrder({
        orderId, customerName: contact.name, products: cart, totalAmount: grandTotal, 
        address: contact, status: "Pending", createdAt: new Date()
      });

      // ORDER COMPLETION DATA CLEANUP
      if (checkoutSource === "cart" && auth.currentUser) {
        // Clear active Firestore persistent array on database order completion
        await updateDoc(doc(db, "carts", auth.currentUser.uid), { items: [] });
      } else {
        // Clear quick buy session storage payload only on order complete
        sessionStorage.removeItem("directCheckoutItem");
      }

      toast.success("Securing your order...");
      window.location.href = "/payment";
    } catch (err) { 
      toast.error("Checkout error"); 
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F4EDE4]">
      <div className="text-[#8B5E3C] font-black tracking-[0.5em] text-sm animate-pulse italic">NIRVANA</div>
    </div>
  );

  return (
    <div className="bg-[#F4EDE4] min-h-screen text-[#4A3728] pt-16 md:pt-24 lg:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
        
        {/* LEFT COLUMN: Checkout Details */}
        <div className="order-1 lg:order-1 lg:col-span-7 space-y-8 md:space-y-12">
          <header>
             <Link href="/customer/cart" className="inline-flex mt-25 md:mt-2 items-center gap-2 text-[10px] font-bold text-[#A68966] hover:text-[#8B5E3C] transition-all mb-4 uppercase tracking-[0.3em]">
               <ArrowLeft size={12}/> Review Bag
             </Link>
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#2D1B0D] tracking-tighter italic flex items-center gap-3 sm:gap-4">
                  Checkout <Sparkles className="text-[#8B5E3C] shrink-0" size={24} />
                </h1>
                <p className="text-[#8B5E3C] font-medium text-xs sm:text-sm mt-2 opacity-80">
                   {contact.name ? `Welcome back, ${contact.name.split(' ')[0]}!` : "Almost there! Let's get your snacks home."}
                </p>
             </motion.div>
          </header>

          {/* FREE SHIPPING TRACKER */}
          {shipping > 0 && cart.length > 0 && (
             <div className="bg-white/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/60 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Truck size={14}/> Unlock Free Shipping
                    </span>
                    <span className="text-[10px] md:text-xs font-bold">₹{amountToFreeShipping} away</span>
                </div>
                <div className="w-full bg-[#E8DFD5] h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totals.final / freeShippingThreshold) * 100, 100)}%` }}
                        className="bg-[#8B5E3C] h-full"
                    />
                </div>
             </div>
          )}

          {/* SHIPPING FORM */}
          <section className="space-y-6 md:space-y-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5E3C] flex items-center gap-3">
               01 Delivery Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-8 md:gap-y-10">
              {[
                { id: "name", label: "Full Name" },
                { id: "phone", label: "Mobile Number" },
                { id: "address", label: "Shipping Address", full: true },
                { id: "city", label: "City" },
                { id: "state", label: "State" },
                { id: "pincode", label: "Pincode" }
              ].map((field) => (
                <div key={field.id} className={`relative group ${field.full ? "sm:col-span-2" : ""}`}>
                  <input 
                    type="text"
                    id={field.id}
                    placeholder=" "
                    value={contact[field.id] || ""}
                    onChange={(e) => setContact({...contact, [field.id]: e.target.value})}
                    className="peer w-full bg-transparent border-b border-[#D2C1B0] py-2 md:py-3 outline-none focus:border-[#8B5E3C] transition-all text-sm md:text-base font-medium text-[#2D1B0D]"
                  />
                  <label 
                    htmlFor={field.id}
                    className="absolute left-0 top-2 md:top-3 text-[#A68966] text-[10px] uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 md:peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#8B5E3C] peer-[:not(:placeholder-shown)]:-top-4 md:peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[10px]"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* ITEM REVIEW */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5E3C]">02 Review Selection</h2>
            <div className="space-y-3 md:space-y-4">
              <AnimatePresence mode="popLayout">
                {computedCartItems.length === 0 ? (
                  <div className="text-center py-8 bg-white/20 rounded-3xl border border-dashed border-[#D2C1B0] text-sm text-[#A68966] italic">
                    Your shopping bag is completely empty.
                  </div>
                ) : (
                  computedCartItems.map((item, idx) => (
                    <motion.div 
                      key={`${item.docId || idx}-${item.selectedWeight}`} 
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl md:rounded-3xl bg-white/60 border border-white hover:border-[#8B5E3C]/30 transition-all shadow-sm group/card"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#E8DFD5] shrink-0">
                          <Image src={item.mainImage || "/placeholder.png"} fill className="object-cover" alt="product" priority={idx < 3} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-[#2D1B0D] tracking-tight truncate">{item.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[8px] sm:text-[9px] font-bold text-[#8B5E3C] uppercase tracking-[0.2em]">{item.selectedWeight}</span>
                            {item.stats.discountPercent > 0 && (
                              <span className="text-[9px] sm:text-[10px] text-green-700 font-black italic flex items-center gap-1">
                                <Tag size={9} className="fill-green-700"/> SAVED {item.stats.discountPercent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-2 sm:pt-0 border-t border-[#E8DFD5]/40 sm:border-0">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white rounded-xl border border-[#E8DFD5] p-0.5 sm:p-1">
                            <button onClick={() => updateQuantity(idx, -1)} className="w-7 h-7 cursor-pointer sm:w-8 sm:h-8 flex items-center justify-center text-[#A68966] hover:text-[#8B5E3C] transition-colors"><Minus size={10}/></button>
                            <span className="w-6 sm:w-8 text-center text-xs font-bold">{item.qty || 1}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="w-7 h-7 cursor-pointer sm:w-8 sm:h-8 flex items-center justify-center text-[#A68966] hover:text-[#8B5E3C] transition-colors"><Plus size={10}/></button>
                          </div>
                          
                          <button 
                            onClick={() => deleteItem(idx)}
                            className="w-8 h-8 cursor-pointer rounded-xl flex items-center justify-center bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-200"
                            title="Delete Item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        
                        <div className="text-right min-w-[70px] sm:min-w-[80px]">
                          <p className="text-sm font-black text-[#2D1B0D] italic tracking-tighter">₹{item.stats.totalItemPrice}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sticky Summary Card */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="mt-10 lg:sticky lg:top-24 xl:top-32">
            <div className="backdrop-blur-xl bg-white/40 border border-white/80 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-xl shadow-[#2D1B0D]/5 relative overflow-hidden">
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A68966] mb-6 md:mb-8 border-b border-[#E8DFD5] pb-5">Checkout Summary</h3>
              
              <div className="space-y-4 md:space-y-6 font-medium text-xs sm:text-sm">
                 <div className="flex justify-between text-[#8B5E3C]">
                    <span className="tracking-widest uppercase text-[9px] font-bold">Total Items</span>
                    <span className="text-[#2D1B0D] font-bold">₹{totals.subtotal}</span>
                 </div>
                 
                 {totals.savings > 0 && (
                   <div className="flex justify-between text-green-700 font-bold bg-green-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-100">
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                        <Zap size={12} className="fill-green-700"/> Nirvana Off
                      </span>
                      <span>-₹{totals.savings}</span>
                   </div>
                 )}

                 <div className="flex justify-between text-[#8B5E3C]">
                    <span className="tracking-widest uppercase text-[9px] font-bold">Logistics</span>
                    <span className={shipping === 0 ? "text-green-700 font-black italic" : "text-[#2D1B0D]"}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                 </div>

                 <div className="pt-6 sm:pt-8 mt-4 border-t-2 border-dashed border-[#D2C1B0] flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Payable</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#2D1B0D] tracking-tighter italic">₹{grandTotal}</p>
                 </div>

                 <button 
                  onClick={handleOrder}
                  disabled={cart.length === 0}
                  className="group w-full cursor-pointer mt-6 md:mt-8 bg-[#2D1B0D] text-white py-4 md:py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-[#8B5E3C] shadow-lg shadow-[#2D1B0D]/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                 >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      Secure Checkout <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                 </button>
              </div>

              <div className="mt-8 flex justify-center gap-4 opacity-30 grayscale">
                <CreditCard size={18}/>
                <span className="text-[10px] font-black tracking-tighter uppercase italic border border-current px-1 rounded">Visa</span>
                <span className="text-[10px] font-black tracking-tighter uppercase border border-current px-1 rounded">Amex</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-[#A68966] opacity-60">
              <ShieldCheck size={14}/>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Vault Secure 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}