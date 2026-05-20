"use client";

import Image from "next/image";
import { CheckCircle2, Globe, Package, ShieldCheck, Mail, FileText, Beaker, Info } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Whey Protein Concentrate 80 Instant (ENTC)",
    desc: "Whey Protein Concentrate 80 Instant is a high-quality dairy protein derived from fresh milk. It offers excellent solubility, fast absorption, and superior nutritional value, making it ideal for sports nutrition, beverages, and functional foods.",
    image: "/entc-protein.jpeg",
    features: [
      "Highly soluble and instantized for easy mixing",
      "Rich in essential amino acids",
      "Supports muscle growth and recovery",
      "Neutral taste suitable for multiple applications"
    ],
    applications: [
      "Sports nutrition and protein supplements",
      "Dairy beverages and shakes",
      "Bakery and confectionery products",
      "Nutritional fortification"
    ],
    trade: { Packaging: "20 KG Bag", ShelfLife: "24 Months", Origin: "India" },
    specs: { Protein: "80%", Fat: "6-8%", Lactose: "5%", Moisture: "5%" },
    certs: ["ISO", "HACCP", "FSSAI"]
  },
  {
    title: "Whey Protein Concentrate 80 Instant (Valley Queen)",
    desc: "Premium quality whey protein concentrate sourced from trusted global suppliers. Known for its excellent functional properties and consistent quality for industrial use.",
    image: "/whey-protein111.jpeg",
    features: [
      "High protein concentration",
      "Excellent dispersibility",
      "Clean dairy flavor",
      "Heat stable for processing"
    ],
    applications: [
      "Protein powders",
      "Energy bars",
      "Dairy desserts",
      "Food processing industries"
    ],
    trade: { Packaging: "25 KG Bag", ShelfLife: "18 Months", Origin: "USA" },
    specs: { Protein: "80%", Fat: "7%", Lactose: "6%", Moisture: "4%" },
    certs: ["ISO", "GMP", "Halal"]
  },
  {
    title: "Lactose Powder (K-LAC)",
    desc: "High-purity lactose powder widely used as a sweetener and carrier in food and pharmaceutical industries. Offers excellent stability and controlled particle size.",
    image: "/lactose.jpeg",
    features: [
      "High purity lactose content",
      "Low sweetness profile",
      "Excellent flowability",
      "Uniform particle size"
    ],
    applications: [
      "Pharmaceutical tablets",
      "Infant formula",
      "Bakery products",
      "Dairy applications"
    ],
    trade: { Packaging: "25 KG Bag", ShelfLife: "24 Months", Origin: "India" },
    specs: { Purity: "99.8%", Moisture: "0.1%", Protein: "0.02%", pH: "4.5–7.5" },
    certs: ["FSSAI", "ISO", "Pharma Grade"]
  },
  {
    title: "Micellar Casein 85",
    desc: "Slow-digesting milk protein ideal for sustained amino acid release. Perfect for nighttime nutrition and long-lasting protein supply.",
    image: "/macellar-casein.jpeg",
    features: [
      "Slow digestion rate",
      "High protein content",
      "Excellent texture",
      "Supports muscle recovery"
    ],
    applications: [
      "Protein supplements",
      "Meal replacement products",
      "Dairy beverages",
      "Functional foods"
    ],
    trade: { Packaging: "20 KG Bag", ShelfLife: "18 Months", Origin: "Europe" },
    specs: { Protein: "85%", Fat: "1-2%", Lactose: "3%", Moisture: "6%" },
    certs: ["ISO", "Halal", "Kosher"]
  },
  {
    title: "Makhana (Fox Nuts)",
    desc: "Makhana, also known as fox nuts or lotus seeds, is a highly nutritious and natural snack ingredient. It is widely used in healthy snacks and food processing due to its low fat content and high nutritional value.",
    image: "/modern savory flavors makhana.avif",
    features: [
      "100% Natural & Gluten-Free",
      "Rich in Antioxidants",
      "Low Glycemic Index",
      "Premium Grade Sourcing"
    ],
    applications: [
      "Healthy Snacking",
      "Breakfast Cereals",
      "Food Processing",
      "Ayurvedic Formulations"
    ],
    trade: { Packaging: "10-20 KG Bags", ShelfLife: "12 Months", Origin: "India" },
    specs: { Color: "White/Cream", Size: "Handpicked", Type: "Roasted/Raw", Moisture: "≤5%" },
    certs: ["FSSAI", "ISO", "Organic"]
  }
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans p-6 md:p-12 lg:p-16">
      
      {/* --- HEADER --- */}
      <header className="max-w-5xl mt-20 mx-auto text-center mb-20 space-y-4">
        <span className="text-amber-700 font-bold text-xs uppercase tracking-[0.4em]">Industrial Catalogue</span>
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight text-stone-900">Premium <span className="text-amber-700">Ingredients</span></h1>
        <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Supplying premium dairy proteins and specialty ingredients with absolute quality, consistency, and global compliance.
        </p>
      </header>

      {/* --- UNIFIED PRODUCT LIST --- */}
      <div className="max-w-7xl mx-auto space-y-12">
        {products.map((item, i) => (
          <div key={i} className="bg-white flex flex-col lg:flex-row items-stretch">
            
            {/* MEDIUM IMAGE FRAME (Fixed Frame for all products) */}
            <div className="w-full lg:w-72  flex-shrink-0 flex flex-col items-center justify-center p-10 ">
              <div className="relative w-70 h-64 group">
                <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {item.certs.map(c => (
                  <span key={c} className="text-[10px] font-black px-2.5 py-1 bg-white  text-stone-400 uppercase tracking-tighter ">{c}</span>
                ))}
              </div>
            </div>

            {/* FULL WORDING CONTENT AREA */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">{item.title}</h2>
                <p className="text-stone-500 text-base leading-relaxed mb-10 border-l-2 border-amber-700 pl-6">{item.desc}</p>
                
                <div className="grid md:grid-cols-2 gap-10">
                  {/* FEATURES & APPS */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldCheck size={14} /> Key Features
                      </h3>
                      <ul className="space-y-3">
                        {item.features.map((f, idx) => (
                          <li key={idx} className="flex gap-3 text-sm font-semibold text-stone-700">
                            <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info size={14} /> Applications
                      </h3>
                      <ul className="space-y-2">
                        {item.applications.map((a, idx) => (
                          <li key={idx} className="text-sm text-stone-600 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-400" /> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* SPECS & TECHNICALS */}
                  <div className="bg-stone-50 rounded-3xl p-6 md:p-8 border border-stone-100">
                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Beaker size={14} /> Technical Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(item.specs).map(([k, v], idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b border-stone-200/60 pb-2">
                          <span className="text-stone-500 capitalize">{k}</span>
                          <span className="font-bold text-stone-900">{v}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 grid grid-cols-2 gap-4">
                       <div className="text-center p-3 bg-white rounded-xl border border-stone-100">
                          <Package size={14} className="mx-auto mb-1 text-amber-700" />
                          <p className="text-[9px] font-bold text-stone-400 uppercase">{item.trade.Packaging}</p>
                       </div>
                       <div className="text-center p-3 bg-white rounded-xl border border-stone-100">
                          <Globe size={14} className="mx-auto mb-1 text-amber-700" />
                          <p className="text-[9px] font-bold text-stone-400 uppercase">{item.trade.Origin}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION ROW */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/contact"><button className="w-full cursor-pointer sm:w-auto px-10 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-full hover:bg-amber-800 transition-all shadow-lg shadow-stone-200">
                    Request Bulk
                 </button>
                 </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}