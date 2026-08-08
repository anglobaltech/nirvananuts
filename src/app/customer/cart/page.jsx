"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Please login to view your cart");
        router.push("/login");
        return;
      }

      // Listen to cart
      const cartRef = doc(db, "carts", user.uid);
      const unsubCart = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        } else {
          setCartItems([]);
        }
      }, (error) => {
        console.error("Cart fetch error:", error);
      });

      // Listen to live products for dynamic pricing and stock
      const productsRef = collection(db, "products");
      const unsubProducts = onSnapshot(productsRef, (snap) => {
        const liveProducts = snap.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        setAllProducts(liveProducts);
        setLoading(false);
      }, (error) => {
        console.error("Products fetch error:", error);
        setLoading(false);
      });

      return () => {
        unsubCart();
        unsubProducts();
      };
    });

    return () => unsubAuth();
  }, [router]);

  const updateCartInFirestore = async (newItems) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: newItems }, { merge: true });
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const increaseQty = (itemToUpdate) => {
    const newItems = cartItems.map((item) => {
      if (item.docId === itemToUpdate.docId && item.selectedWeight === itemToUpdate.selectedWeight) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    updateCartInFirestore(newItems);
  };

  const decreaseQty = (itemToUpdate) => {
    if (itemToUpdate.qty <= 1) {
      removeItem(itemToUpdate);
      return;
    }
    const newItems = cartItems.map((item) => {
      if (item.docId === itemToUpdate.docId && item.selectedWeight === itemToUpdate.selectedWeight) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    updateCartInFirestore(newItems);
  };

  const removeItem = (itemToRemove) => {
    const newItems = cartItems.filter(
      (item) => !(item.docId === itemToRemove.docId && item.selectedWeight === itemToRemove.selectedWeight)
    );
    updateCartInFirestore(newItems);
    toast.info("Item removed from cart", { autoClose: 2000 });
  };

  const calculateItemTotal = (item) => {
    const baseTotal = item.price * item.qty;
    let applicableDiscount = 0;

    if (item.tieredDiscounts && item.tieredDiscounts.length > 0) {
      const validTiers = item.tieredDiscounts.filter(tier => item.qty >= tier.qty);
      if (validTiers.length > 0) {
        // Find the maximum discount percentage among valid tiers
        applicableDiscount = Math.max(...validTiers.map(t => Number(t.discount) || 0));
      }
    }

    if (applicableDiscount > 0) {
      return baseTotal - (baseTotal * (applicableDiscount / 100));
    }
    return baseTotal;
  };

  const displayCartItems = cartItems.map(item => {
    const liveProduct = allProducts.find(p => p.docId === (item.docId || item.id));
    if (!liveProduct) return item;
    
    let updatedPrice = item.price;
    if (liveProduct.variants) {
      const variant = liveProduct.variants.find(v => v.label === item.selectedWeight);
      if (variant) updatedPrice = Number(variant.price);
    }
    
    const rawTiers = Array.isArray(liveProduct.tieredDiscounts)
      ? liveProduct.tieredDiscounts
      : Array.isArray(liveProduct.buyMoreSaveMore)
      ? liveProduct.buyMoreSaveMore
      : item.tieredDiscounts;
      
    return {
      ...item,
      name: liveProduct.name || liveProduct.title || item.name,
      mainImage: liveProduct.mainImage || liveProduct.image || item.mainImage,
      price: updatedPrice,
      tieredDiscounts: rawTiers
    };
  });

  const subtotal = displayCartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const totalItems = displayCartItems.reduce((acc, item) => acc + item.qty, 0);

  if (loading) {
    return (
      <main className="min-h-screen relative mt-16 sm:mt-20 bg-gradient-to-br from-amber-50 via-orange-100/70 to-stone-200/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-600 border-t-transparent animate-spin"></div>
          <p className="text-stone-600 font-medium tracking-wider">Loading your cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative mt-16 sm:mt-20 bg-gradient-to-br from-amber-50 via-orange-100/70 to-stone-200/50 overflow-hidden selection:bg-amber-200 pb-20">
      <ToastContainer />
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl">
        <header className="mb-10 lg:mb-14 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-950">
              Shopping Cart
            </h1>
            <p className="mt-2 text-stone-600 font-medium">
              You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Link href="/" className="hidden sm:flex text-amber-700 hover:text-amber-800 font-semibold items-center gap-2 group transition-colors">
              Continue Shopping 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </header>

        {displayCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl shadow-stone-200/40 text-center px-4">
            <div className="w-24 h-24 bg-amber-100/50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-amber-700/50" />
            </div>
            <h2 className="text-2xl font-semibold text-stone-800 mb-3">Your cart is empty</h2>
            <p className="text-stone-500 mb-8 max-w-md">
              Looks like you haven't added any of our premium makhana to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3.5 rounded-xl font-medium shadow-md shadow-amber-600/20 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {displayCartItems.map((item, idx) => (
                <div key={`${item.docId}-${item.selectedWeight}-${idx}`} className="flex flex-col sm:flex-row gap-5 p-5 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg shadow-stone-200/30 group transition-all hover:bg-white/90">
                  <div className="relative h-32 sm:h-40 w-full sm:w-40 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/50">
                    <Image
                      src={item.mainImage || "/placeholder.png"}
                      alt={item.name || "Product Image"}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-800 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-amber-700 mt-1">
                          {item.selectedWeight}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item)}
                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center gap-3 bg-white/80 border border-stone-200 rounded-xl p-1 shadow-inner">
                        <button
                          onClick={() => decreaseQty(item)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-bold text-stone-800">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => increaseQty(item)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-stone-500 font-medium mb-0.5">
                          ₹{item.price} x {item.qty}
                        </div>
                        <div className="text-xl font-black text-stone-900 tracking-tight">
                          ₹{calculateItemTotal(item).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl shadow-stone-200/40 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-stone-600 font-medium">
                    <span>Subtotal</span>
                    <span className="text-stone-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  
                  <div className="pt-4 border-t border-stone-200/60">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-stone-900">Total</span>
                      <span className="text-3xl font-black text-amber-700 tracking-tight">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-2 text-right">Includes all applicable taxes</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-700 to-stone-900 text-white h-14 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-wide">
                  Proceed to Checkout <ArrowRight size={20} />
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 justify-center text-xs font-medium text-stone-500 bg-stone-100/50 py-2 rounded-lg border border-stone-200/50">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
