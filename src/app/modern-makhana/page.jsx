"use client";

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
  Gift,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";

const faqs = [
  {
    question: "What makes Modern Makhana different?",
    answer:
      "Modern Makhana takes the traditional, healthy lotus seed and infuses it with contemporary, gourmet spice blends.",
  },
  {
    question: "Are the flavorings and seasonings natural?",
    answer:
      "Yes! Our Modern Makhana is prepared using carefully blended clean spices.",
  },
  {
    question: "Can I buy Modern Makhana in bulk across India?",
    answer:
      "Absolutely. Nirvana Nuts delivers our entire modern snacks range all over India.",
  },
];

export default function ModernMakhanaPage() {
  // DYNAMIC IMAGES STATE
  const [images, setImages] = useState([]);
  const [active, setActive] = useState("");

  const [openIndex, setOpenIndex] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const basePrice = selectedVariant?.price || 0;
  const productDiscount = product?.discount || 0;

  const sortedTiers = product?.tieredDiscounts
    ? [...product.tieredDiscounts].sort((a, b) => a.qty - b.qty)
    : [];

  const matchedTier = product?.tieredDiscounts
    ?.filter((t) => quantity >= t.qty)
    ?.sort((a, b) => b.qty - a.qty)[0];

  const tierDiscount = matchedTier?.discount || 0;
  const totalDiscount = productDiscount + tierDiscount;

  const discountedPrice = Math.round(
    basePrice - (basePrice * totalDiscount) / 100
  );

  const totalPrice = discountedPrice * quantity;

  const nextTier = sortedTiers.find((t) => t.qty > quantity);
  const isMaxDiscount = sortedTiers.length > 0 && !nextTier;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 const handleAction = async (type) => {
     if (!product?.inStock) return;
 
     try {
 
         const item = {
             docId: product.docId,
             name: product.name,
             mainImage: active || product.images?.[0],
             selectedWeight: selectedVariant?.label || "Default",
             price: Number(basePrice),
             qty: Number(quantity),
             tieredDiscounts: product?.tieredDiscounts || [],
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
             toast.success("Added to cart!");
             window.location.href = "/customer/cart";
         }
 
         if (type === "buyNow") {
             toast.success("Redirecting to checkout...");
             window.location.href = "/customer/checkout";
         }
 
     } catch (error) {
         console.log("Cart Error:", error);
         toast.error("Something went wrong");
     }
 };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        const modernProduct = data.find(
          (p) => p.category === "modern-makhana"
        );

        if (modernProduct) {
          setProduct(modernProduct);

          if (modernProduct?.variants?.length > 0) {
            setSelectedVariant(modernProduct.variants[0]);
          }

          // MULTIPLE IMAGE SUPPORT
          if (modernProduct?.images?.length > 0) {
            setImages(modernProduct.images);
            setActive(modernProduct.images[0]);
          } else if (modernProduct?.mainImage) {
            setImages([modernProduct.mainImage]);
            setActive(modernProduct.mainImage);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, []);

    return (
        <div className="bg-amber-50">
            {/* TOP HEADER SECTION */}
            <section className="h-80 w-full bg-linear-to-br from-amber-500 to-amber-400 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-3xl md:text-4xl italic font-semibold mt-38 text-center text-gray-900 leading-tight tracking-tight max-w-7xl">
                        Modern Flavored Makhana (Fox Nuts) – Gourmet Roasted Healthy Snacks
                    </h1>
                </div>
            </section>

            {/* HERO SECTION */}
<section className="w-full bg-[#fcfcfd] py-16 lg:py-24 antialiased text-slate-900 selection:bg-amber-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* STRUCTURAL SPLIT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT SIDE: LUXURY GALLERY STAGE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* LARGE HERO DISCOVERY VIEW */}
            <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-200/40 shadow-xs group/canvas">
              {/* Intentional ambient light architecture */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full transition-transform duration-1000 group-hover/canvas:translate-x-12" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-orange-100/40 blur-3xl rounded-full transition-transform duration-1000 group-hover/canvas:-translate-x-12" />

              <img
                src={active || "/product-02.avif"}
                alt={product?.name || "Product Profile View"}
                className="relative max-h-[75%] max-w-[75%] w-auto h-auto object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.08)] transition-all duration-700 ease-out group-hover/canvas:scale-[1.03]"
              />
            </div>

            {/* SYMMETRICAL SUB-GRID THUMBNAILS */}
            <div className="grid grid-cols-4 gap-4">
              {images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(img)}
                  className={`relative aspect-square rounded-2xl bg-white border transition-all duration-300 focus:outline-hidden group/thumb cursor-pointer ${
                    active === img
                      ? "border-amber-500 ring-4 ring-amber-500/10 shadow-sm"
                      : "border-slate-200 hover:border-slate-400 hover:shadow-xs"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product dynamic view ${i + 1}`}
                    className="w-full h-full object-contain p-3 mix-blend-multiply transition duration-300 group-hover/thumb:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: PREMIUM METROPOLITAN DETAILS */}
          <div className="lg:col-span-5 space-y-8 lg:pt-2">
            
            {/* BRANDING HEADER SYSTEM */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/30">
                  Premium Quality
                </span>
                <span className="text-xs text-slate-400 font-medium">• Gourmet Flavors India</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
                {product?.name || "Modern Flavored Makhana"}
              </h1>

              {/* REFINED RATING LABELS */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900">4.9/5.0</span>
                <span className="text-xs text-slate-400 font-medium">(984 Verified Customers)</span>
              </div>
            </div>

            {/* DESCRIPTION ACCENT */}
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              {product?.description || "Slow-roasted to crispy perfection and tossed in natural artisanal herbs. A flawless high-protein superfood built for sophisticated health-conscious individuals."}
            </p>

            <hr className="border-slate-200/60" />

            {/* MANAGEMENT CORE CONTEXT (PRICING & INTERACTIVES) */}
            <div className="space-y-6">
              
              {/* EXPLICIT CLEAN PRICING STACK */}
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Price</span>
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
                  <div className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-200/50 shadow-2xs">
                    Save {totalDiscount}% Instantly
                  </div>
                )}
              </div>

              {/* CONDITIONAL FLAVOR / CONTAINER VARIANT BLOCK */}
              {product?.variants && product.variants.length > 0 && (
                <div className="space-y-2.5">
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">Select Packaging Configuration</span>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant, index) => {
                      const isSelected = selectedVariant?.label === variant.label;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setQuantity(1);
                          }}
                          className={`p-3.5 rounded-2xl border text-xs font-bold tracking-wide text-left transition-all duration-300 focus:outline-hidden cursor-pointer ${
                            isSelected
                              ? "border-slate-950 bg-slate-950 text-white shadow-md shadow-slate-950/10"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block">{variant.label}</span>
                          <span className={`block text-[10px] mt-0.5 font-normal ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            Standard Weight Pack
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* INTEGRATED MULTI-FUNCTION GRID (QUANTITY & QUANTUM INCENTIVES) */}
              <div className="grid sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 space-y-2">
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">Quantity</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-2xs h-12">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 active:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                    >
                      <Minus size={12} strokeWidth={2.5} />
                    </button>
                    <span className="flex-1 font-extrabold text-slate-900 text-center text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 active:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-2 self-end">
                  {sortedTiers.length > 0 && (
                    <div className="border rounded-xl px-4 h-12 flex items-center gap-2.5 bg-slate-100/60 border-slate-200/80 text-slate-800 text-xs">
                      <Gift size={14} className="shrink-0 text-slate-900" />
                      <div className="truncate font-medium">
                        {isMaxDiscount ? (
                          <span className="font-bold text-slate-950">Congratulations! Your exclusive discount is now active 🎉</span>
                        ) : (
                          nextTier && (
                            <span>Add <strong className="font-bold text-slate-950">{nextTier.qty - quantity} more</strong> for <strong className="text-emerald-600 font-bold">{nextTier.discount}% off</strong></span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* LUXURY INTERACTION BUTTON ARCHITECTURE */}
              <div className="pt-2">
                {!product?.inStock ? (
                  <button
                    disabled
                    className="w-full h-14 rounded-2xl bg-slate-100 text-slate-400 font-bold tracking-widest uppercase text-xs cursor-not-allowed border border-slate-200/40"
                  >
                    Temporary Out Of Stock
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    
                    {/* BAG ADD ACTION */}
                    <button
                      onClick={() => handleAction("cart")}
                      className="w-full sm:w-auto px-6 h-14 rounded-2xl border border-slate-200 bg-white text-slate-800 hover:text-slate-900 hover:border-slate-950 active:scale-98 transition duration-200 flex items-center justify-center gap-2 font-bold text-sm cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag size={18} />
                      <span className="sm:hidden">Add To Bag</span>
                    </button>

                    {/* EXPRESS DIRECT ACTION CHEVRON BUTTON */}
                    <button
                      onClick={() => handleAction("buyNow")}
                      className="w-full flex-1 flex items-center justify-between pl-6 pr-4 h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-wider text-sm transition duration-200 group/btn cursor-pointer shadow-lg shadow-amber-500/10 active:scale-98"
                    >
                      <span>Proceed to Checkout</span>
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-slate-200/60" />

            {/* DISCRETE SIMPLIFIED BRAND ASSURANCES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                <span>Premium Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HelpCircle size={16} className="text-amber-600 shrink-0" />
                <span>24/7 Dedicated Brand Support</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

            {/* FEATURES VALUES SECTION */}
            <section className="relative py-20 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/30 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300/30 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 mb-4 tracking-tight">
                        Why Choose Premium Modern Makhana?
                    </h2>
                    <p className="text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
                        Step up your health routine with <span className="font-semibold text-amber-600">Modern Makhana</span> – 
                        where premium natural nutrients meet incredibly unique flavor craftsmanship. Perfect for those who refuse to compromise on either health or delicious gourmet flavor profiles.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: "Gourmet Spiced Blends", desc: "Crafted beautifully with top-tier spices for an unmatched signature crunch and savor." },
                            { icon: ShieldCheck, title: "Strict Quality Control", desc: "Evenly popped, beautifully sorted, and packed defensively to seal peak freshness." },
                            { icon: HeartPulse, title: "The Fitness Advantage", desc: "Low glycemic indices, high fibers, and great antioxidants suited for active lifestyles." },
                            { icon: Dumbbell, title: "Packs Made For Everyone", desc: "Available for easy tracking in functional sizes, tailored for dynamic snacking routines." }
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
            <section className="relative py-24 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-87.5 h-87.5 bg-amber-300/30 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-87.5 h-87.5 bg-orange-300/30 blur-[130px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div data-aos="zoom-in" className="relative group">
                        <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-amber-300/40 to-orange-300/40 blur-sm opacity-70 group-hover:opacity-100 transition"></div>
                        <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-xl">
                            <Image
                                src="/product-02.avif"
                                alt="Premium Modern Flavored Makhana"
                                width={600}
                                height={500}
                                className="rounded-2xl object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-5 left-5 bg-white/80 backdrop-blur-md px-4 py-1 text-sm font-semibold rounded-full shadow text-amber-700">
                                🌿 Premium Flavors
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-left">
                        <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Product Details</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-800 mt-2 leading-tight">
                            Modern Flavored Makhana <br />
                            <span className="bg-linear-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                                Specifications & Taste Mastery
                            </span>
                        </h2>
                        <p className="text-gray-600 mt-5 leading-relaxed">
                            Nirvana Nuts crafts our seasoned variants carefully to balance dietary cleanliness with intense flavor depth. Sourced ethically and tossed consistently for uniform seasoning dispersion.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                { label: "Size Profile", value: "18–24 mm Premium" },
                                { label: "Style", value: "Roasted & Seasoned" },
                                { label: "Shelf Life", value: "12 Months" },
                                { label: "Allergens", value: "Gluten-Free" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    data-aos="fade-up"
                                    box-id={i}
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
                            📦 Handled with state-of-the-art hygiene standards in completely secure facility packs.
                        </div>

                        <div data-aos="fade-up" data-aos-delay="400" className="mt-8 flex items-center gap-4">
                            <Link href="/customer/cart">
                                <button className="relative cursor-pointer px-7 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-amber-600 to-orange-500 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                                    Shop Collection
                                </button>
                            </Link>
                            <span className="text-sm text-gray-500">🚚 Real-time tracking across all regions</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPLORE MORE COLLECTION PANELS */}
            <section className="relative py-28 bg-linear-to-b from-[#f9fafb] via-[#fdfcfb] to-[#f7f7f7] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-200/30 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-20 tracking-tight">
                        Explore Our Full Range
                    </h2>

                    <div className="grid md:grid-cols-4 gap-12">
                        {[
                            { name: "Plain Classic Makhana", desc: "Light, crunchy and perfectly roasted without any added spice lines.", img: "/plain-makhana-nirvana-nuts.avif", link: "/plain-makhana" },
                            { name: "Sweet Makhana", desc: "Sweet Makhana is a crunchy, lightly sweet, healthy snack made from premium quality fox nuts.", img: "/product-03.avif", link: "/sweet-makhana" },
                            { name: "Fusion Makhana", desc: "Modern cross-cultural flavors designed for a premium experience.", img: "/product-04.avif", link: "/fusion-makhana" },
                            { name: "Whey Protein", desc: "Whey protein is a high-quality supplement that supports muscle growth, recovery, and strength.", img: "/whey-protein-07.avif", link: "/whey-protein" },
                        ].map((item, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="group">
                                <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-500 p-4">
                                    <div className="overflow-hidden rounded-2xl">
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-60 object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
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

            {/* FAQ ACCORDION SECTION */}
            <section className="bg-linear-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                        Frequently Asked Questions – Modern Variants
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
                        <p data-aos="fade-up" className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-3">
                            Customer Reviews
                        </p>
                        <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-bold text-amber-800 tracking-tight">
                            Loved by Healthy Snack Lovers
                        </h2>
                        <p data-aos="fade-up" data-aos-delay="200" className="text-amber-700/80 mt-4">
                            Real feedback from customers who trust our premium modern flavors
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                name: "Rohit Sharma", 
                                review: "Incredibly innovative flavors! The crunch matches up perfectly with the spice blends. Hands down the ultimate mid-day crunch alternative to unhealthy potato chips." 
                            },
                            {
                                name: "Neha Verma",
                                review: "It's so hard to find flavored fox nuts that don't taste artificial or overly oily. Nirvana Nuts nailed this. The seasoning coating is light, perfectly uniform, and delicious.",
                            },
                            {
                                name: "Amit Patel",
                                review: "Premium packaging, rapid delivery across Mumbai, and incredible taste consistency. Unlocking the tiered wholesale discount when purchasing bulk packs makes it a stellar deal.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                                className="group"
                            >
                                <div className="h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-100 shadow-md hover:shadow-xl transition-all duration-500 p-8 flex flex-col justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-amber-800 mb-1">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-amber-600 mb-4">
                                            Verified Buyer
                                        </p>
                                        <div className="text-amber-500 text-lg mb-4">
                                            ★★★★★
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            “{item.review}”
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="mt-16 text-center"
                    >
                        <p className="text-lg font-semibold text-amber-800">
                            ⭐ 4.8/5 Average Rating
                        </p>
                        <p className="text-sm text-amber-700/80 mt-1">
                            Based on 984+ verified customer reviews
                        </p>
                    </div>
                </div>
            </section>

            {/* PRODUCT METADATA SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        name: product?.name || "Modern Flavored Makhana",
                        image: ["/product-02.avif"],
                        description: product?.description || "Gourmet spiced and roasted premium quality fox nuts built for the modern lifestyle.",
                        brand: {
                            "@type": "Brand",
                            name: "Nirvana Nuts"
                        },
                        offers: {
                            "@type": "Offer",
                            priceCurrency: "INR",
                            price: String(discountedPrice || "249"),
                            availability: product?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        },
                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: "4.8",
                            reviewCount: "984"
                        }
                    })
                }}
            />
        </div>
    );
}