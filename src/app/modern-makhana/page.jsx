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
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const faqs = [
  {
    question: "What makes Modern Makhana different?",
    answer: "Modern Makhana takes the traditional, healthy lotus seed and infuses it with contemporary, gourmet spice blends.",
  },
  {
    question: "Are the flavorings and seasonings natural?",
    answer: "Yes! Our Modern Makhana is prepared using carefully blended clean spices.",
  },
  {
    question: "Can I buy Modern Makhana in bulk across India?",
    answer: "Absolutely. Nirvana Nuts delivers our entire modern snacks range all over India.",
  },
];

export default function ModernMakhanaPage() {
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

  const discountedPrice = Math.round(basePrice - (basePrice * totalDiscount) / 100);
  const totalPrice = discountedPrice * quantity;

  const nextTier = sortedTiers.find((t) => t.qty > quantity);
  const isMaxDiscount = sortedTiers.length > 0 && !nextTier;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
      console.error("Action Execution Failure:", error);
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

        const modernProduct = data.find((p) => p.category === "modern-makhana");

        if (modernProduct) {
          setProduct(modernProduct);
          if (modernProduct?.variants?.length > 0) {
            setSelectedVariant(modernProduct.variants[0]);
          }
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
    <div className="bg-amber-50 selection:bg-amber-500 selection:text-white">
      {/* Dynamic Structured SEO Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product?.name || "Modern Flavored Makhana",
            image: [active || "https://www.nirvananuts.com/product-02.avif"],
            description: product?.description || "Gourmet spiced and roasted premium quality fox nuts built for the modern lifestyle.",
            brand: { "@type": "Brand", name: "Nirvana Nuts" },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: String(discountedPrice || "249"),
              availability: product?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: "https://www.nirvananuts.com/modern-makhana"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "984"
            }
          })
        }}
      />

      {/* TOP HEADER SECTION */}
      <header className="h-80  w-full md:mt-10 bg-linear-to-br from-amber-500 to-amber-400 border-b border-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-3xl md:text-4xl italic text-center items-center font-semibold text-gray-900 leading-tight tracking-tight max-w-5xl mx-auto">
            Modern Flavored Makhana (Fox Nuts) – Gourmet Roasted Healthy Snacks
          </h1>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full bg-[#fcfcfd] py-16 lg:py-24 antialiased text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT SIDE: GALLERY STAGE */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-200/40 shadow-xs group/canvas">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full" />
                <div className="relative w-[75%] h-[75%] transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03]">
                  <Image
                    src={active || "/product-02.avif"}
                    alt={product?.name || "Product Profile View"}
                    fill
                    sizes="(max-w-768px) 100vw, 700px"
                    priority
                    className="object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.08)]"
                  />
                </div>
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(img)}
                    className={`relative aspect-square rounded-2xl bg-white border transition-all duration-300 focus:outline-hidden group/thumb cursor-pointer ${
                      active === img ? "border-amber-500 ring-4 ring-amber-500/10 shadow-sm" : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <div className="relative w-full h-full p-3 transition duration-300 group-hover/thumb:scale-105">
                      <Image
                        src={img}
                        alt={`Product dynamic view ${i + 1}`}
                        fill
                        sizes="150px"
                        className="object-contain p-2"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: PRODUCT DETAILS */}
            <div className="lg:col-span-5 space-y-8 lg:pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/30">
                    Premium Quality
                  </span>
                  <span className="text-xs text-slate-400 font-medium">• Gourmet Flavors India</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
                  {product?.name || "Modern Flavored Makhana"}
                </h2>
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

              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                {product?.description || "Slow-roasted to crispy perfection and tossed in natural artisanal herbs. A flawless high-protein superfood built for sophisticated health-conscious individuals."}
              </p>
              <hr className="border-slate-200/60" />

              {/* PRICING & CONFIGURATION */}
              <div className="space-y-6">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Price</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-4xl font-black tracking-tight text-slate-900">₹{discountedPrice}</span>
                      {totalDiscount > 0 && <span className="text-base line-through font-medium text-slate-400">₹{basePrice}</span>}
                    </div>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-200/50">
                      Save {totalDiscount}% Instantly
                    </div>
                  )}
                </div>

                {/* VARIANTS */}
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
                              isSelected ? "border-slate-950 bg-slate-950 text-white shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
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

                {/* QUANTITY & INCENTIVES */}
                <div className="grid sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400">Quantity</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-2xs h-12">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 cursor-pointer">
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="flex-1 font-extrabold text-slate-900 text-center text-sm">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 cursor-pointer">
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
                            <span className="font-bold text-slate-950">Exclusive discount active 🎉</span>
                          ) : (
                            nextTier && <span>Add <strong className="font-bold text-slate-950">{nextTier.qty - quantity} more</strong> for <strong className="text-emerald-600 font-bold">{nextTier.discount}% off</strong></span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2">
                  {!product?.inStock ? (
                    <button disabled className="w-full h-14 rounded-2xl bg-slate-100 text-slate-400 font-bold tracking-widest uppercase text-xs cursor-not-allowed border border-slate-200/40">
                      Temporary Out Of Stock
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      <button onClick={() => handleAction("cart")} className="w-full sm:w-auto px-6 h-14 rounded-2xl border border-slate-200 bg-white text-slate-800 flex items-center justify-center gap-2 font-bold text-sm cursor-pointer">
                        <ShoppingBag size={18} /> Add To Cart
                      </button>
                      <button onClick={() => handleAction("buyNow")} className="w-full flex-1 flex items-center justify-between pl-6 pr-4 h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition duration-200 cursor-pointer">
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
                <div className="flex items-center gap-2.5"><ShieldCheck size={16} className="text-amber-600" /> <span>Premium Quality Guaranteed</span></div>
                <div className="flex items-center gap-2.5"><HelpCircle size={16} className="text-amber-600" /> <span>24/7 Dedicated Brand Support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="relative py-20 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 mb-4 tracking-tight">Why Choose Premium Modern Makhana?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            Step up your health routine with <span className="font-semibold text-amber-600">Modern Makhana</span>.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Gourmet Spiced Blends", desc: "Crafted beautifully with top-tier spices for an unmatched signature crunch." },
              { icon: ShieldCheck, title: "Strict Quality Control", desc: "Evenly popped, beautifully sorted, and packed defensively to seal peak freshness." },
              { icon: HeartPulse, title: "The Fitness Advantage", desc: "Low glycemic indices, high fibers, and great antioxidants suited for active lifestyles." },
              { icon: Dumbbell, title: "Packs Made For Everyone", desc: "Available for easy tracking in functional sizes, tailored for dynamic snacking routines." }
            ].map((item, i) => (
              <div key={i} data-aos="zoom-in" data-aos-delay={i * 100} className="bg-white/60 backdrop-blur-xl border border-white/40 p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <item.icon className="mx-auto text-amber-600 mb-5" size={42} />
                <h3 className="font-semibold text-lg text-amber-700 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="relative py-24 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div data-aos="zoom-in" className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-xl aspect-square w-full max-w-[600px]">
            <Image src="/product-02.avif" alt="Premium Modern Flavored Makhana" fill className="rounded-2xl object-cover p-4" />
          </div>
          <div data-aos="fade-left">
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Product Details</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 mt-2">Modern Flavored Makhana Specifications</h2>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Size Profile", value: "18–24 mm Premium" },
                { label: "Style", value: "Roasted & Seasoned" },
                { label: "Shelf Life", value: "12 Months" },
                { label: "Allergens", value: "Gluten-Free" },
              ].map((item, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-lg font-semibold text-amber-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="relative py-28 bg-linear-to-b from-[#f9fafb] via-[#fdfcfb] to-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-aos="fade-up" className="text-4xl font-semibold text-center text-gray-900 mb-20">Explore Our Full Range</h2>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { name: "Plain Classic Makhana", desc: "Light, crunchy and perfectly roasted.", img: "/plain-makhana-nirvana-nuts.avif", link: "/plain-makhana" },
              { name: "Sweet Makhana", desc: "Crunchy, lightly sweet quality fox nuts.", img: "/product-03.avif", link: "/sweet-makhana" },
              { name: "Fusion Makhana", desc: "Modern cross-cultural flavors.", img: "/product-04.avif", link: "/fusion-makhana" },
              { name: "Whey Protein", desc: "High-quality supplement for muscle growth.", img: "/whey-protein-07.avif", link: "/whey-protein" },
            ].map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl p-4 flex flex-col justify-between">
                <div className="relative w-full h-60 overflow-hidden rounded-2xl">
                  <Image src={item.img} alt={item.name} fill className="object-cover transition duration-700 hover:scale-[1.05]" />
                </div>
                <div className="mt-6 px-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                  <Link href={item.link}>
                    <button className="mt-6 w-full py-3 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 cursor-pointer">
                      Explore Product →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="bg-linear-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions – Modern Variants</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl bg-white shadow-sm">
                <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center text-left p-5 cursor-pointer">
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

      {/* REVIEWS */}
      <section className="relative py-28 bg-linear-to-b from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-800">Loved by Healthy Snack Lovers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rohit Sharma", review: "Incredibly innovative flavors! The crunch matches up perfectly with the spice blends." },
              { name: "Neha Verma", review: "It's so hard to find flavored fox nuts that don't taste artificial or overly oily. Nirvana Nuts nailed this." },
              { name: "Amit Patel", review: "Premium packaging, rapid delivery across Mumbai, and incredible taste consistency." },
            ].map((item, index) => (
              <div key={index} className="h-full rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-100 p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">{item.name}</p>
                  <p className="text-xs text-amber-600 mb-4">Verified Buyer</p>
                  <div className="text-amber-500 text-lg mb-4">★★★★★</div>
                  <p className="text-gray-700 text-sm leading-relaxed">“{item.review}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


