"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistCard from "./WishlistCard";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Please login to view your wishlist");
        router.push("/login");
        return;
      }

      // Listen to wishlist items
      const wishlistRef = doc(db, "wishlists", user.uid);
      const unsubWishlist = onSnapshot(wishlistRef, (docSnap) => {
        if (docSnap.exists()) {
          setWishlistItems(docSnap.data().items || []);
        } else {
          setWishlistItems([]);
        }
      }, (error) => {
        console.error("Wishlist fetch error:", error);
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
        unsubWishlist();
        unsubProducts();
      };
    });

    return () => unsubAuth();
  }, [router]);

  const updateWishlistInFirestore = async (newItems) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const wishlistRef = doc(db, "wishlists", user.uid);
      await setDoc(wishlistRef, { items: newItems }, { merge: true });
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const removeItem = (itemToRemove) => {
    const itemToRemoveId = itemToRemove.docId || itemToRemove.id;
    const newItems = wishlistItems.filter((item) => {
      const itemId = item.docId || item.id;
      return itemId !== itemToRemoveId;
    });
    updateWishlistInFirestore(newItems);
    toast.info("Item removed from wishlist", { autoClose: 2000 });
  };

  const moveToCart = async (itemToMove) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      
      let existingCartItems = [];
      if (cartSnap.exists()) {
        existingCartItems = cartSnap.data().items || [];
      }

      const defaultWeight = "Default";
      const itemToMoveId = itemToMove.docId || itemToMove.id;

      const existingItemIndex = existingCartItems.findIndex(
        (cartItem) => cartItem.docId === itemToMoveId && cartItem.selectedWeight === defaultWeight
      );

      let updatedCartItems;
      if (existingItemIndex > -1) {
        updatedCartItems = [...existingCartItems];
        updatedCartItems[existingItemIndex].qty += 1;
      } else {
        const newCartItem = {
          docId: itemToMoveId,
          name: itemToMove.name || itemToMove.title,
          mainImage: itemToMove.mainImage || itemToMove.image || "/placeholder.png",
          selectedWeight: defaultWeight,
          price: itemToMove.price || (itemToMove.variants?.[0]?.price) || 0,
          qty: 1,
          tieredDiscounts: itemToMove.tieredDiscounts || [] 
        };
        updatedCartItems = [...existingCartItems, newCartItem];
      }

      await setDoc(cartRef, { items: updatedCartItems }, { merge: true });
      
      // Remove from wishlist after adding to cart
      const newWishlistItems = wishlistItems.filter((item) => {
        const itemId = item.docId || item.id;
        return itemId !== itemToMoveId;
      });
      await updateWishlistInFirestore(newWishlistItems);

      toast.success("Item moved to cart!");
    } catch (error) {
      console.error("Error moving item to cart:", error);
      toast.error("Failed to move item to cart");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen relative mt-16 sm:mt-20 bg-gradient-to-br from-amber-50 via-orange-100/70 to-stone-200/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-600 border-t-transparent animate-spin"></div>
          <p className="text-stone-600 font-medium tracking-wider">Loading your wishlist...</p>
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-950 flex items-center gap-3">
              My Wishlist
              <Heart className="text-red-500 fill-red-500/20" size={36} />
            </h1>
            <p className="mt-2 text-stone-600 font-medium">
              You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </header>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl shadow-stone-200/40 text-center px-4">
            <div className="w-24 h-24 bg-red-100/50 rounded-full flex items-center justify-center mb-6">
              <Heart size={48} className="text-red-500/50" />
            </div>
            <h2 className="text-2xl font-semibold text-stone-800 mb-3">Your wishlist is empty</h2>
            <p className="text-stone-500 mb-8 max-w-md">
              Save your favorite makhana flavors here and buy them whenever you're ready.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3.5 rounded-xl font-medium shadow-md shadow-amber-600/20 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Discover Products <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, idx) => {
              const liveProduct = allProducts.find(p => p.docId === (item.docId || item.id));
              const displayProduct = liveProduct ? { ...item, ...liveProduct } : item;

              return (
                <WishlistCard 
                  key={`${item.docId || item.id}-${idx}`} 
                  product={displayProduct} 
                  onRemove={removeItem} 
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default WishlistPage;
