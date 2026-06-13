"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Leaf,
  ShieldCheck,
  HeartPulse,
  Dumbbell,
  ChevronDown,
  Star,
  Heart,
  Gift,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  HelpCircle
} from "lucide-react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  addToWishlist,
  removeFromWishlist,
  subscribeWishlist,
} from "@/customerService/wishlistService";
import { auth, db } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const images = [
//     "/plain-makhana-nirvana-nuts.avif",
//     "/image-quality-02.png",
//     "/image-quality-01.avif",
// ];

const faqs = [
  {
    question: "What is plain makhana?",
    answer: "Plain makhana, also known as fox nuts, is a natural roasted snack made from lotus seeds. It is a healthy alternative to fried snacks and is widely consumed in India.",
  },
  {
    question: "Is makhana healthy?",
    answer: "Yes, makhana is a super healthy snack rich in protein, fiber, and antioxidants. It is low in calories, gluten-free, and ideal for weight loss and daily snacking.",
  },
  {
    question: "Where to buy makhana online in India?",
    answer: "You can buy premium quality makhana online in India from Nirvana Nuts. We offer fresh fox nuts with fast delivery and top-grade quality.",
  },
];

export default function PlainMakhanaPage() {
  const [active, setActive] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [wish, setWish] = useState(false);


  const basePrice = selectedVariant?.price || 0;
  const productDiscount = product?.discount || 0;

  // Filter and sort tiers to find current active tier discount
  const sortedTiers = product?.tieredDiscounts ? [...product.tieredDiscounts].sort((a, b) => a.qty - b.qty) : [];

  const matchedTier = product?.tieredDiscounts
    ?.filter((t) => quantity >= t.qty)
    ?.sort((a, b) => b.qty - a.qty)[0];

  const tierDiscount = matchedTier?.discount || 0;
  const totalDiscount = productDiscount + tierDiscount;

  const discountedPrice = Math.round(
    basePrice - (basePrice * totalDiscount) / 100
  );
  const totalPrice = discountedPrice * quantity;

  // Find the next available discount tier based on current active quantity selection
  const nextTier = sortedTiers.find((t) => t.qty > quantity);
  const isMaxDiscount = sortedTiers.length > 0 && !nextTier;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAction = async (type) => {
    if (!product?.inStock) return;

    try {
      const user = auth.currentUser;

      // 1. AUTHENTICATION GUARD: If customer is not logged in, redirect immediately
      if (!user) {
        toast.error("Please login first");
        window.location.href = "/login";
        return;
      }

      const item = {
        docId: product.docId,
        name: product.name,
        mainImage: active || product.images?.[0] || "/placeholder.png",
        selectedWeight: selectedVariant?.label || "Default",
        price: Number(basePrice),
        qty: Number(quantity),
        tieredDiscounts: product?.tieredDiscounts || [],
      };

      // ==========================================
      // WORKFLOW A: ADD TO CART LAYERS (NO REDIRECT)
      // ==========================================
      if (type === "cart") {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);

        let existingItems = [];
        if (cartSnap.exists()) {
          existingItems = cartSnap.data().items || [];
        }

        // FIXED DUPLICATE BUG: Search for an item matching both ID and weight configuration
        const existingItemIndex = existingItems.findIndex(
          (cartItem) => cartItem.docId === item.docId && cartItem.selectedWeight === item.selectedWeight
        );

        let updatedItems;
        if (existingItemIndex > -1) {
          // If matched, increment the existing quantity integer value
          updatedItems = [...existingItems];
          updatedItems[existingItemIndex].qty += item.qty;
        } else {
          // If unique, append cleanly to the layout array
          updatedItems = [...existingItems, item];
        }

        // Push exclusively to Firestore Carts collection
        await setDoc(cartRef, { items: updatedItems }, { merge: true });

        // Notify user of success WITHOUT executing a route redirect
        toast.success("Added to cart successfully!");
        return;
      }

      // ==========================================
      // WORKFLOW B: BUY NOW EXPRESS (PRODUCTION FIX)
      // ==========================================
      if (type === "buyNow") {
        const checkoutPayload = {
          items: [item],
          checkoutSource: "buyNow"
        };

        // Save object directly into localized Session Memory (Bypasses backend cart array)
        sessionStorage.setItem("directCheckoutItem", JSON.stringify(checkoutPayload));

        toast.success("Redirecting to checkout...");

        // PRODUCTION CLIENT COMPILATION FIX: Force absolute browser redirect handshake
        // This prevents Next.js client routing from racing ahead of Firebase auth status
        window.location.href = "/customer/checkout";
      }

    } catch (error) {
      console.log("Action Execution Failure:", error);
      toast.error("Something went wrong");
    }
  };

  const handleWishlist = async () => {
    try {
      // Check current wishlist state from service
      if (wish) {
        await removeFromWishlist(product.docId);

        setWish(false);
        toast.info("Removed from wishlist");
        return;
      }

      const wishlistItems = await new Promise((resolve) => {
        const unsub = subscribeWishlist((items) => {
          resolve(items);
          unsub();
        });
      });

      const alreadyExists = wishlistItems.some(
        (item) => String(item.id) === String(product.docId)
      );

      if (alreadyExists) {
        toast.info("Already in wishlist");
        setWish(true);
        return;
      }

      await addToWishlist({
        id: product.docId,
        docId: product.docId,
        title: product.name,
        description: product.description,
        image: active || product.images?.[0],
        mainImage: active || product.images?.[0],
        variants: product.variants || [],
        tieredDiscounts:
          product.tieredDiscounts ||
          product.buyMoreSaveMore ||
          [],
        stock: product.inStock ?? true,
        rating: product.rating || 4,
        price: Number(basePrice || 0),
      });

      setWish(true);
      toast.success("Added to wishlist ");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!product?.docId) return;

    const checkWishlist = (items) => {
      const exists = items.some(
        (i) => String(i.id) === String(product.docId)
      );
      setWish(!!exists);
    };

    // 1. realtime sync
    const unsub = subscribeWishlist(checkWishlist);

    return () => unsub && unsub();
  }, [product?.docId]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        const plainProduct = data.find(
          (p) => p.category?.toLowerCase() === "plain-makhana"
        );

        if (plainProduct) {
          setProduct(plainProduct);

          // Dynamic Images
          if (
            plainProduct?.images &&
            Array.isArray(plainProduct.images) &&
            plainProduct.images.length > 0
          ) {
            setImages(plainProduct.images);
            setActive(plainProduct.images[0]);
          }

          // Variants
          if (
            plainProduct?.variants &&
            plainProduct.variants.length > 0
          ) {
            setSelectedVariant(plainProduct.variants[0]);
          }
        }
      } catch (error) {
        console.error("Firebase Product Error:", error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="bg-amber-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <section className="relative overflow-hidden md:mt-15 bg-linear-to-b from-amber-50 to-orange-100/60 border-b border-orange-200/40 py-16 md:py-5">
        {/* Subtle background decorative blobs for a premium feel */}
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 xs:pt-20 lg:px-8 text-center">
          {/* Small Tag/Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-800 mb-2 uppercase tracking-wider border border-amber-500/20">
            ✨ Premium Quality
          </span>

          {/* Main Heading */}
          <h1 className="xs:text-xl text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight tracking-tight">
            Plain Classic Makhana
          </h1>

          {/* Subheading / Description */}
          <p className="mt-2 xs:text-sm text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Sourced from nature, perfectly roasted for maximum crunch. Discover the ultimate guilt-free, nutrient-rich snack.
          </p>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="w-full bg-[#fcfcfd] py-16 lg:py-24 antialiased text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* LEFT SIDE */}
            <div className="lg:col-span-7 space-y-6">

              {/* MAIN IMAGE */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-200/40 shadow-xs group/canvas">

                <button
                  onClick={handleWishlist}
                  className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-300 cursor-pointer"
                >
                  <Heart
                    size={22}
                    className={`transition-all duration-300 ${wish
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                      }`}
                  />
                </button>
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full" />

                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-orange-100/40 blur-3xl rounded-full" />

                <Image
                  src={active || "/plain-makhana-nirvana-nuts.avif"}
                  alt={product?.name || "Plain Makhana"}
                  width={700}
                  height={700}
                  unoptimized
                  className="relative max-h-[75%] max-w-[75%] w-auto h-auto object-contain transition-all duration-700"
                />
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(img)}
                    className={`relative aspect-square rounded-2xl bg-white border transition-all duration-300 cursor-pointer ${active === img
                        ? "border-amber-500 ring-4 ring-amber-500/10"
                        : "border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Product ${i + 1}`}
                      width={200}
                      height={200}
                      unoptimized
                      className="w-full h-full object-contain p-3"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5 space-y-8 lg:pt-2">

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/30">
                    Premium Quality
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  {product?.name || "Plain Makhana"}
                </h1>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="text-xs font-bold text-slate-900">
                    4.9/5.0
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                {product?.description ||
                  "Premium quality roasted fox nuts for healthy snacking."}
              </p>

              <hr className="border-slate-200/60" />

              {/* PRICE */}
              <div className="space-y-6">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Total Price
                    </span>

                    <div className="flex items-baseline gap-2.5">
                      <span className="text-4xl font-black tracking-tight text-slate-900">
                        ₹{discountedPrice}
                      </span>

                      {totalDiscount > 0 && (
                        <span className="text-base line-through font-medium text-slate-400">
                          ₹{basePrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-200/50">
                      Save {totalDiscount}%
                    </div>
                  )}
                </div>

                {/* VARIANTS */}
                {product?.variants && product.variants.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      Select Pack
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      {product.variants.map((variant, index) => {
                        const isSelected =
                          selectedVariant?.label === variant.label;

                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedVariant(variant);
                              setQuantity(1);
                            }}
                            className={`p-3.5 rounded-2xl border text-xs font-bold transition-all duration-300 cursor-pointer ${isSelected
                                ? "border-slate-950 bg-slate-950 text-white"
                                : "border-slate-200 bg-white text-slate-700"
                              }`}
                          >
                            {variant.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* QUANTITY */}
                <div className="grid sm:grid-cols-12 gap-4 items-center">

                  <div className="sm:col-span-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      Quantity
                    </span>

                    <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 h-12">
                      <button
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
                        className="w-9 h-9 flex items-center justify-center cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>

                      <span className="flex-1 font-extrabold text-center text-sm">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* DISCOUNT */}
                  <div className="sm:col-span-8 space-y-2 self-end">
                    {sortedTiers.length > 0 && (
                      <div className="border rounded-xl px-4 h-12 flex items-center gap-2.5 bg-slate-100/60 border-slate-200/80 text-xs">
                        <Gift size={14} />

                        <div className="truncate font-medium">
                          {isMaxDiscount ? (
                            <span>Congratulations! Your exclusive discount is now active 🎉</span>
                          ) : (
                            nextTier && (
                              <span>
                                Add{" "}
                                <strong>
                                  {nextTier.qty - quantity} more
                                </strong>{" "}
                                for{" "}
                                <strong className="text-emerald-600">
                                  {nextTier.discount}% OFF
                                </strong>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="pt-2">
                  {!product?.inStock ? (
                    <button
                      disabled
                      className="w-full h-14 rounded-2xl bg-slate-100 text-slate-400 font-bold"
                    >
                      Out Of Stock
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

                      <button
                        onClick={() => handleAction("cart")}
                        className="w-full sm:w-auto px-6 h-14 rounded-2xl border border-slate-200 bg-white text-slate-800 flex items-center justify-center gap-2 font-bold text-sm cursor-pointer"
                      >
                        <ShoppingBag size={18} />
                        Add To Cart
                      </button>

                      <button
                        onClick={() => handleAction("buyNow")}
                        className="w-full flex-1 flex items-center justify-between pl-6 pr-4 h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition duration-200 cursor-pointer"
                      >
                        <span>Buy Now</span>

                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                          <ArrowRight size={16} />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-slate-200/60" />

              {/* FEATURES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-amber-600" />
                  <span>Premium Quality</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <HelpCircle size={16} className="text-amber-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-20 xs:py-8 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300/30 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 mb-4 tracking-tight">
            Why Choose Premium Plain Makhana?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            Discover the best <span className="font-semibold text-amber-600">plain makhana (fox nuts)</span> in India –
            a high-protein, low-calorie superfood snack. Sourced directly from farmers,
            our makhana ensures <span className="font-semibold">premium quality, purity, and nutrition</span> for your healthy lifestyle.
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "100% Natural Makhana", desc: "Pure fox nuts with no chemicals, no preservatives – a truly natural Indian snack." },
              { icon: ShieldCheck, title: "Hygienic & Premium Quality", desc: "Carefully cleaned, sorted, and packed to maintain freshness and quality." },
              { icon: HeartPulse, title: "Healthy Superfood Snack", desc: "Low fat, high protein, rich in nutrients – perfect for weight loss and fitness." },
              { icon: Dumbbell, title: "Available Across India", desc: "Order premium makhana online in multiple sizes – 100g, 200g, 250g & 500g packs." }
            ].map((item, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="group relative bg-white/60 backdrop-blur-xl border border-white/40 p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-amber-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition"></div>
                <item.icon className="mx-auto text-amber-600 mb-5 group-hover:scale-110 transition" size={42} />
                <h3 className="font-semibold text-lg text-amber-700 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS SPECIFICATIONS */}
      <section className="relative py-24 xs:py-8 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-87.5 h-87.5 bg-amber-300/30 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-87.5 h-87.5 bg-orange-300/30 blur-[130px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-1 xl:grid-cols-2 gap-16 items-center relative z-10">
          <div data-aos="zoom-in" className="relative group">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-amber-300/40 to-orange-300/40 blur-sm opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-xl">
              <Image
                src="/product-01.avif"
                alt="Premium Plain Makhana"
                width={600}
                height={500}
                className="rounded-2xl object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-5 left-5 bg-white/80 backdrop-blur-md px-4 py-1 text-sm font-semibold rounded-full shadow text-amber-700">
                🌿 100% Natural
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Product Details</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-800 mt-2 leading-tight">
              Premium Plain Makhana <br />
              <span className="bg-linear-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                Specifications & Quality
              </span>
            </h2>
            <p className="text-gray-600 mt-5 leading-relaxed">
              Nirvana Nuts delivers <span className="font-semibold text-amber-600">export-quality fox nuts</span> sourced directly from farmers.
              Perfect for daily snacking, fasting, and bulk purchase with guaranteed freshness and purity.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Size", value: "250g, 500g, 1kg " },
                { label: "Moisture", value: "< 5%" },
                { label: "Shelf Life", value: "12 Months" },
                { label: "Storage", value: "Cool & Dry" },
              ].map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-lg font-semibold text-amber-800 group-hover:text-amber-600 transition">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="mt-6 p-4 rounded-2xl bg-linear-to-r from-amber-100 to-orange-100 text-sm text-gray-700 shadow-inner">
              📦 Available in multiple packs: <span className="font-semibold">100g, 200g, 250g, 500g</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE PRODUCTS */}
      <section className="relative py-28 xs:py-8 bg-linear-to-b from-[#f9fafb] via-[#fdfcfb] to-[#f7f7f7] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-200/30 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-20 tracking-tight">
            Explore More Products
          </h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12">
            {[
              { name: "Modern Makhana", desc: "Light, crunchy and perfectly roasted for daily healthy snacking.", img: "/product-02.avif", link: "/modern-makhana" },
              { name: "Sweet Makhana", desc: "A subtle sweetness crafted for guilt-free indulgence.", img: "/product-03.avif", link: "/sweet-makhana" },
              { name: "Fusion Makhana", desc: "Modern flavors designed for a premium experience.", img: "/product-04.avif", link: "/fusion-makhana" },
              { name: "Whey Protein", desc: "Clean, high-quality protein for strength and recovery.", img: "/whey-protein-07.avif", link: "/whey-protein" },
            ].map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="group">
                <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-500 p-4">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-full h-60 object-fill transition duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="mt-6 px-2">
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
                    <Link href={item.link}>
                      <button className="mt-6 w-full py-3 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                        Explore Product
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-linear-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions – Makhana
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl shadow-sm bg-white transition hover:shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left p-5 cursor-pointer"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`px-5 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 pb-5" : "max-h-0"}`}>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="relative py-28 bg-linear-to-b from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-amber-300/40 blur-[120px] rounded-full"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-3">Customer Reviews</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-bold text-amber-800 tracking-tight">
              Loved by Healthy Snack Lovers
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-amber-700/80 mt-4">Real feedback from customers who trust our premium makhana</p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { name: "Vishal Prajapati", review: "Very fresh and crunchy makhana. Perfect for evening snacks. Quality is clearly premium." },
              {
                name: "Varsha",
                review: "I switched from chips to makhana and this is the best brand I’ve tried. Clean and tasty.",
              },
              {
                name: "Harsh Sharma",
                review: "Packaging is great and product quality is consistent. Highly recommended for fitness diet.",
              },
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="group"
              >
                {/* Card */}
                <div className="h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-100 shadow-md hover:shadow-xl transition-all duration-500 p-8 flex flex-col">
                  {/* 👤 Name FIRST */}
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    {item.name}
                  </p>

                  <p className="text-xs text-amber-600 mb-4">
                    Verified Buyer
                  </p>

                  {/* ⭐ rating */}
                  <div className="text-amber-500 text-lg mb-4">
                    ★★★★★
                  </div>

                  {/* 💬 review */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    “{item.review}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 Bottom Rating Summary */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-16 text-center"
          >
            <p className="text-lg font-semibold text-amber-800">
              ⭐ 4.8/5 Average Rating
            </p>
            <p className="text-sm text-amber-700/80 mt-1">
              Based on 1,200+ verified customer reviews
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product?.name || "Plain Makhana",
            image: ["/plain-makhana-nirvana-nuts.avif"],
            description: product?.description || "Premium quality fox nuts",
            brand: {
              "@type": "Brand",
              name: "Nirvana Nuts"
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: String(discountedPrice || "199"),
              availability: product?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "1200"
            }
          })
        }}
      />
    </div>
  );
}