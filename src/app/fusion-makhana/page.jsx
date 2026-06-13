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
  Star,
  ArrowRight,
  Minus,
  Plus,
  HelpCircle,
  Gift,
  ShoppingBag,
  Heart
} from "lucide-react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/customerService/wishlistService";

const faqs = [
  {
    question: "What is Fusion Makhana?",
    answer:
      "Fusion Makhana combines premium roasted fox nuts with exciting modern flavor blends inspired by global tastes and Indian spices.",
  },
  {
    question: "Is Fusion Makhana healthy?",
    answer:
      "Yes! Fusion Makhana retains the natural nutritional benefits of lotus seeds while offering bold flavors with light and healthy roasting techniques.",
  },
  {
    question: "Where can I buy Fusion Makhana online in India?",
    answer:
      "You can order premium Fusion Makhana online directly from Nirvana Nuts with fast delivery and fresh packaging across India.",
  },
];

export default function FusionSpicyMakhanaPage() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState("/product-04.avif");
  const [openIndex, setOpenIndex] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const basePrice = selectedVariant?.price || 0;
  const productDiscount = product?.discount || 0;

  const sortedTiers = product?.tieredDiscounts ? [...product.tieredDiscounts].sort((a, b) => a.qty - b.qty) : [];
  
  const matchedTier = product?.tieredDiscounts
    ?.filter((t) => quantity >= t.qty)
    ?.sort((a, b) => b.qty - a.qty)[0];

  const tierDiscount = matchedTier?.discount || 0;
  const totalDiscount = productDiscount + tierDiscount;

  const discountedPrice = Math.round(
    basePrice - (basePrice * totalDiscount) / 100
  );

  const nextTier = sortedTiers.find((t) => t.qty > quantity);
  const isMaxDiscount = sortedTiers.length > 0 && !nextTier;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

const toggleWishlist = async () => {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please login first");
    window.location.href = "/login";
    return;
  }

  try {
    const wishlistProduct = {
      id: product.docId,
      title: product.name,
      description: product.description || "",
      image: product.images?.[0] || product.mainImage,
      variants: product.variants || [],
      tieredDiscounts: product.tieredDiscounts || [],
      stock: product.inStock,
      rating: 5,
    };

    if (isInWishlist) {
      await removeFromWishlist(product.docId);
      setIsInWishlist(false);
      toast.info("Removed from wishlist");
    } else {
      await addToWishlist(wishlistProduct);
      setIsInWishlist(true);
      toast.success("Added to wishlist ");
    }
  } catch (error) {
    console.error(error);
    toast.error("Wishlist update failed");
  }
};

  const handleAction = async (type) => {
    if (!product?.inStock) return;

    try {
      const user = auth.currentUser;

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

      if (type === "cart") {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);

        let existingItems = [];
        if (cartSnap.exists()) {
          existingItems = cartSnap.data().items || [];
        }

        const existingItemIndex = existingItems.findIndex(
          (cartItem) => cartItem.docId === item.docId && cartItem.selectedWeight === item.selectedWeight
        );

        let updatedItems;
        if (existingItemIndex > -1) {
          updatedItems = [...existingItems];
          updatedItems[existingItemIndex].qty += item.qty;
        } else {
          updatedItems = [...existingItems, item];
        }

        await setDoc(cartRef, { items: updatedItems }, { merge: true });
        toast.success("Added to cart successfully!");
        return;
      }

      if (type === "buyNow") {
        const checkoutPayload = {
          items: [item],
          checkoutSource: "buyNow"
        };

        sessionStorage.setItem("directCheckoutItem", JSON.stringify(checkoutPayload));
        toast.success("Redirecting to checkout...");
        window.location.href = "/customer/checkout";
      }

    } catch (error) {
      console.log("Action Execution Failure:", error);
      toast.error("Something went wrong");
    }
  };

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

        const fusionProduct = data.find(
          (p) => p.category === "fusion-makhana"
        );

        if (fusionProduct) {
          if (fusionProduct?.images?.length > 0) {
            setImages(fusionProduct.images);
            setActive(fusionProduct.images[0] || fusionProduct.mainImage || "/product-04.avif");
          } else if (fusionProduct?.mainImage) {
            setImages([fusionProduct.mainImage]);
            setActive(fusionProduct.mainImage);
          }
          setProduct(fusionProduct);
          if (fusionProduct?.variants?.length > 0) {
            setSelectedVariant(fusionProduct.variants[0]);
          }

          auth.onAuthStateChanged(async (user) => {
            if (user) {
              const wishlistSnap = await getDoc(doc(db, "wishlists", user.uid));
              if (wishlistSnap.exists()) {
                const items = wishlistSnap.data().items || [];
                const found = items.some((item) => item.id === fusionProduct.docId);
                setIsInWishlist(found);
              }
            }
          });
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
       <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      {/* HEADER TITLE ANCHOR */}
<section className="relative overflow-hidden md:mt-25 md:py-10 bg-linear-to-b from-amber-50 to-orange-100/60 border-b border-orange-200/40 py-16 xs:mt-25 xs:py-10 ">
            {/* Subtle background decorative blobs for a premium feel */}
            <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Small Tag/Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-800 mb-2 uppercase tracking-wider border border-amber-500/20">
                    ✨ Premium Fusion
                </span>

                {/* Main Heading */}
                <h1 className=" xs:text-xl  text-4xl md:text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight tracking-tight">
                    Fusion Flavored Makhana
                </h1>

                {/* Subheading / Description */}
                <p className="xs:text-sm mt-2 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                    Where global culinary trends meet the traditional crunch. Experience an exciting blend of unique, bold seasonings crafted for the mindful snacker.
                </p>
            </div>
        </section>

      {/* MAIN HERO CONFIGURATION INTERACTIVE DISPLAY */}
      <section className="w-full bg-[#fcfcfd] py-16 xs:py-8 lg:py-24 antialiased text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* LEFT COLUMN - CANVAS STAGE AND CONTROL HOVERS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-200/40 shadow-sm group/canvas">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-orange-100/40 blur-3xl rounded-full" />

                <Image
                  src={active || "/product-03.avif"}
                  alt={product?.name || "Fusion Makhana"}
                  width={500}
                  height={500}
                  priority
                  className="relative max-h-[75%] max-w-[75%] w-auto h-auto object-contain transition-all duration-700"
                />

                {/* THE WISHLIST FLOATING ACTIONS CONTAINER */}
                <button
                  onClick={toggleWishlist}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center cursor-pointer transition hover:scale-110 active:scale-95 group/wishlist z-20"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isInWishlist 
                        ? "fill-red-500 text-red-500" 
                        : "text-slate-600 group-hover/wishlist:text-red-500"
                    }`}
                  />
                </button>
              </div>

              {/* DYNAMIC VARIATION GALLERY GRID */}
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(img)}
                    className={`relative aspect-square rounded-2xl bg-white border transition-all duration-300 cursor-pointer overflow-hidden ${
                      active === img
                        ? "border-amber-500 ring-4 ring-amber-500/10"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product Thumbnail ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 15vw"
                      className="object-contain p-3"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN - PRICING ENGINE, QUANTITY TIERS & ACTIONS */}
            <div className="lg:col-span-5 space-y-8 lg:pt-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/30">
                    Premium Quality
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  {product?.name || "Fusion Makhana"}
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
                  "Exciting fusion flavors crafted with premium roasted fox nuts for bold and modern snacking experiences."}
              </p>

              <hr className="border-slate-200/60" />

              {/* BILLING CALCULATION ENGINE */}
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

                {/* SKU WEIGHT SELECTION BUTTONS */}
                {product?.variants && product.variants.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      Select Pack
                    </span>
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
                            className={`p-3.5 rounded-2xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
                              isSelected
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

                {/* INCREMENTAL STEPS AND DISCOUNTS PROMPTING PANEL */}
                <div className="grid sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      Quantity
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 h-12">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
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

                {/* IN STOCK ENGINE TRIGGER PORTS */}
                <div className="pt-2">
                  {!product?.inStock ? (
                    <button
                      disabled
                      className="w-full h-14 rounded-2xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-amber-600" />
                  <span>Premium Quality Certified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HelpCircle size={16} className="text-amber-600" />
                  <span>24/7 Corporate Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARKETING VALUE PROPOSITION */}
      <section className="relative py-20 xs:py-8 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300/30 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 mb-4 tracking-tight">
            Why Choose Premium Fusion Spicy Makhana?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            Discover the ideal sweet twist to <span className="font-semibold text-amber-600">Makhana fox nuts</span> in India. Balanced with clean health profiles, directly supplied, and delivering <span className="font-semibold">guaranteed gourmet satisfaction</span> to power your day without the sugar crashes.
          </p>

          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              { icon: Leaf, title: "Bold Fusion Flavors", desc: "Unique seasoning combinations inspired by international and Indian taste profiles." },
              { icon: ShieldCheck, title: "Premium Roasted Quality", desc: "Perfectly roasted fox nuts processed hygienically for maximum freshness and crunch." },
              { icon: HeartPulse, title: "Healthy Snacking Option", desc: "Low calorie, high protein and packed with nutrients for guilt-free snacking." },
              { icon: Dumbbell, title: "Perfect For Every Mood", desc: "Available in convenient pack sizes ideal for travel, office, gym, and home snacking." },
            ].map((item, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="group relative bg-white/60 backdrop-blur-xl border border-white/40 p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition"></div>
                <item.icon className="mx-auto text-amber-600 mb-5 group-hover:scale-110 transition" size={42} />
                <h3 className="font-semibold text-lg text-amber-700 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS DOCK */}
      <section className="relative py-24 xs:py-8 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-87.5 h-87.5 bg-amber-300/30 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-87.5 h-87.5 bg-orange-300/30 blur-[130px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid xl:grid-cols-2 gap-16 items-center relative z-10">
          <div data-aos="zoom-in" className="relative group">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-300/40 to-orange-300/40 blur-sm opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-xl">
              <Image
                src="/product-03.avif"
                alt="Premium Fusion Makhana Showcase"
                width={600}
                height={500}
                className="rounded-2xl object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div data-aos="fade-left">
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Product Details</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-800 mt-2 leading-tight">
              Premium Sweet Makhana <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                Specifications & Flavor Fusion
              </span>
            </h2>
            <p className="text-gray-600 mt-5 leading-relaxed">
              Nirvana Nuts Fusion Makhana blends innovative seasoning techniques with premium quality fox nuts to create an unforgettable healthy snacking experience.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Flavor Style", value: "Fusion Seasoned" },
                { label: "Texture", value: "Light & Crunchy" },
                { label: "Shelf Life", value: "12 Months" },
                { label: "Storage", value: "Cool & Dry Place" },
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

            <div data-aos="fade-up" data-aos-delay="300" className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 text-sm text-gray-700 shadow-inner">
              📦 Available in multiple packs: <span className="font-semibold"> 250g, 500g, 1kg</span>
            </div>

          </div>
        </div>
      </section>

      {/* CROSS SITE EXPLORATION */}
      <section className="relative py-28 xs:py-8 bg-linear-to-b from-[#f9fafb] via-[#fdfcfb] to-[#f7f7f7] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-200/30 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 data-aos="fade-up" className="text-4xl xs:text-2xl md:text-4xl font-semibold text-center text-gray-900 mb-20 xs:mb-10 tracking-tight">
            Explore More Products
          </h2>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4  gap-12">
            {[
              { name: "Plain Classic Makhana", desc: "Premium quality roasted fox nuts for daily healthy snapping.", img: "/plain-makhana-nirvana-nuts.avif", link: "/plain-makhana" },
              { name: "Modern Spicy Makhana", desc: "Light, crunchy and perfectly roasted for daily healthy snacking.", img: "/product-02.avif", link: "/modern-makhana" },
              { name: "Sweet Makhana", desc: "Modern flavors designed for a premium experience.", img: "/product-04.avif", link: "/sweet-makhana" },
              { name: "Whey Protein", desc: "Clean, high-quality protein for strength and recovery.", img: "/whey-protein-07.avif", link: "/whey-protein" },
            ].map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="group">
                <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-500 p-4">
                  <div className="overflow-hidden rounded-2xl relative h-60 w-full">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-fill transition duration-700 ease-out group-hover:scale-[1.05]"
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

      {/* SEO ACCESSIBLE FAQS */}
      <section className="bg-linear-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="xs:text-2xl text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions – Fusion Spicy Makhana
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

            {/* SOCIAL PROOF REVIEWS SYSTEM */}
      <section className="relative py-28 xs:py-8 bg-linear-to-b from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-amber-300/40 blur-[120px] rounded-full"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-3">Customer Reviews</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="xs:text-xl text-4xl md:text-4xl font-bold text-amber-800 tracking-tight">
              Loved by Healthy Snack Lovers
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-amber-700/80 mt-4">Real feedback from customers who trust our premium makhana</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { name: "Ravi Gupta", review: "Amazing flavor combinations and super crunchy texture. Perfect healthy replacement for fried snacks." },
              { name: "Soniya Sharma", review: "Fusion Makhana tastes unique and premium. The seasoning balance is honestly excellent." },
              { name: "Aditya Mittal", review: "Loved the freshness and modern taste profiles. Definitely ordering again for office snacking." },
            ].map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 120} className="group">
                <div className="h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-100 shadow-md group-hover:shadow-xl transition-all duration-500 p-8 flex flex-col">
                  <p className="text-sm font-semibold text-amber-800 mb-1">{item.name}</p>
                  <p className="text-xs text-amber-600 mb-4">Verified Buyer</p>
                  <div className="text-amber-500 text-lg mb-4">★★★★★</div>
                  <p className="text-gray-700 text-sm leading-relaxed">“{item.review}”</p>
                </div>
              </div>
            ))}
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-16 text-center">
            <p className="text-lg font-semibold text-amber-800">⭐ 4.8/5 Average Rating</p>
            <p className="text-sm text-amber-700/80 mt-1">Based on 1,200+ verified customer reviews</p>
          </div>
        </div>
      </section>

      {/* SCHEMA STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product?.name || "Fusion Flavored Makhana",
            "image": images.length > 0 ? images : ["/product-03.avif"],
            "description": product?.description || "Slow-roasted and coated in signature sweet blends.",
            "brand": {
              "@type": "Brand",
              "name": "Nirvana Nuts"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": String(discountedPrice || "199"),
              "availability": product?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1200"
            }
          })
        }}
      />
    </div>
  );
}