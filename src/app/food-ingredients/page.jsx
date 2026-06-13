"use client";

import Image from "next/image";
import { CheckCircle2, Globe, Package, ShieldCheck, Beaker, Info, Calendar } from "lucide-react";
import Link from "next/link";

const products = [
  {
    category: "Protein Supplement",
    title: "Whey Protein Concentrate 80 Instant (ENTC)",
    subtitle: "High Purity. Consistent Performance.",
    make: "ENTC Dairy Solutions",
    desc: "Whey Protein Concentrate 80% is obtained by removing non-protein components from whey through advanced membrane filtration. The product is instantized for superior solubility and delivers consistent performance across food, nutrition, and industrial applications. Imported from Poland.",
    image: "/entc-protein.jpeg",
    features: [
      "Protein ≥ 80.18% (Dry Matter)",
      "Fat content approx. 7.38%",
      "Excellent solubility (99.90%)",
      "Instantized powder for easy mixing",
      "Low microbial count & high safety standards"
    ],
    applications: [
      "Protein supplements, sports nutrition",
      "Bakery products, dairy blends",
      "Nutritional formulations"
    ],
    trade: { Packaging: "20 Kg Bag", Market: "All India", MinOrder: "100 Kg" },
    specs: { 
      Form: "Powder", 
      Flavor: "Original", 
      Origin: "Poland", 
      Solubility: "99.90%", 
      "Scorched Particles": "Disc A",
      "Age Group": "Adults"
    },
    certs: ["Food Grade", "Imported", "High Protein"]
  },
  {
    category: "Protein Supplement",
    title: "Whey Protein Concentrate 80 Instant (Valley Queen)",
    subtitle: "Reliable Quality. Global Standard.",
    make: "Valley Queen",
    desc: "This WPC 80 Instantized protein is manufactured by Valley Queen, USA. It delivers consistent batch quality, excellent solubility, and meets global microbiological and compositional standards for industrial and nutritional applications.",
    image: "/whey-protein111.jpeg",
    features: [
      "Protein ≥ 80%",
      "Instantized for superior solubility",
      "Low microbial count & safe for food use",
      "Moisture ≤ 6.5% and Fat ≤ 8.0%",
      "Imported from USA with consistent quality"
    ],
    applications: [
      "Food processing, protein blends",
      "Beverages, bakery",
      "Nutritional products"
    ],
    trade: { Packaging: "20 Kg Bag", Market: "All India", MinOrder: "100 Kg" },
    specs: { 
      Form: "Powder", 
      Origin: "USA", 
      Protein: "≥ 80%", 
      Moisture: "≤ 6.5%", 
      Fat: "≤ 8.0%", 
      "Scorched Particles": "A / B" 
    },
    certs: ["Imported", "USA Origin", "Food Grade"]
  },
  {
    category: "Dairy Ingredient",
    title: "Lactose (K-LAC)",
    subtitle: "High Purity. Reliable Performance.",
    make: "Ba'emek Advanced Technologies Ltd.",
    desc: "K-LAC 2040 Lactose (200 Mesh) is a refined milk sugar produced from whey using advanced processing techniques. It offers high purity, uniform particle size, and excellent flowability, making it ideal for food, nutraceutical, and pharmaceutical applications. Imported from Israel.",
    image: "/lactose.jpeg",
    features: [
      "Lactose ≥ 99.3% purity",
      "Fine particle size (200 mesh) for uniform blending",
      "Low moisture content for better stability",
      "Free-flowing powder with consistent bulk density",
      "Suitable for food and pharmaceutical applications"
    ],
    applications: [
      "Infant formula, pharmaceutical tablets",
      "Bakery products, confectionery",
      "Dairy formulations"
    ],
    trade: { Packaging: "25 Kg Bag", Market: "All India", MinOrder: "100 Kg" },
    specs: { 
      Form: "Powder", 
      Origin: "Israel", 
      "Particle Size": "200 Mesh", 
      "Bulk Density": "0.74 g/ml", 
      "pH (5% Solution)": "5.85", 
      "Allergen Info": "Contains Milk" 
    },
    certs: ["Food Grade", "Pharma Grade", "Imported"]
  },
  {
    category: "Slow-Release Protein",
    title: "Micellar Casein 85",
    subtitle: "Sustained Release. Superior Nutrition.",
    make: "Inleit",
    desc: "InLeit MC85 Micellar Casein is produced in Spain using gentle filtration processes that preserve its native protein structure. It offers high protein content, excellent solubility, and low fat levels, making it ideal for sustained protein delivery in nutritional and functional food applications.",
    image: "/macellar-casein.jpeg",
    features: [
      "Protein ≥ 86% (Dry Matter)",
      "Slow digestion for sustained amino acid release",
      "Low fat content (≤ 2.5%)",
      "Excellent solubility and dispersibility",
      "High microbiological safety standards"
    ],
    applications: [
      "Protein supplements, meal replacements",
      "High-protein snacks",
      "Dairy formulations"
    ],
    trade: { Packaging: "20 Kg Bag", Market: "All India", MinOrder: "100 Kg" },
    specs: { 
      Form: "Powder", 
      Origin: "Spain",
      "Protein (DM)": "86.34%", 
      "Protein (As Is)": "81.60%", 
      Lactose: "5.43%", 
      Fat: "0.77%", 
      Moisture: "5.46%" 
    },
    certs: ["Slow Release", "High Protein", "Premium"]
  },
  {
    category: "Natural Food Ingredient",
    title: "Makhana",
    subtitle: "Natural. Nutritious. Versatile.",
    make: "Sourced from India",
    desc: "Makhana (fox nuts) is a natural plant-based ingredient widely used in both traditional and modern food processing. Known for its light texture, high nutritional value, and clean-label appeal, it serves as a versatile base for snacks, roasted products, powdered blends, and health-focused formulations. It can be used in raw, roasted, or processed forms.",
    image: "/modern savory flavors makhana.avif",
    features: [
      "Rich in plant-based protein and minerals",
      "Low fat and low calorie content",
      "Naturally gluten-free and clean-label",
      "Easy to process into roasted or powdered forms",
      "Suitable for both retail and industrial applications"
    ],
    applications: [
      "Healthy Snacking & Roasted Products",
      "Breakfast Cereals & Powdered Blends",
      "Food Processing & Health Formulations"
    ],
    trade: { Packaging: "Bulk Bags", Market: "All India", MinOrder: "Contact Us" },
    specs: { 
      Form: "Whole / Processed (Roasted)", 
      Origin: "India", 
      Storage: "Cool & Dry Place" 
    },
    certs: ["100% Natural", "Premium Quality", "Clean Label"]
  }
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans p-6 md:p-12 lg:p-16">
      
      {/* --- HEADER --- */}
      <header className="max-w-4xl mt-25 mx-auto text-center mb-20 space-y-5">
        <span className="text-amber-700  font-bold text-xs uppercase xs:text-[8px] tracking-[0.3em] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
          Food Ingredients & Bulk Supply
        </span>
        <h1 className="text-4xl xs:mt-5 md:text-5xl font-extrabold tracking-tight text-stone-900">
          Bulk Food Ingredients & <span className="text-amber-700 font-serif italic font-normal">Nutritional Solutions</span>
        </h1>
        <p className="text-stone-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Supplying high-quality dairy proteins, food ingredients, and natural products for manufacturers, food processors, and nutrition brands. Our solutions ensure consistent quality, reliable sourcing, and performance for large-scale applications.
        </p>
        
        {/* Value Props Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white p-3 rounded-xl shadow-2xs border border-stone-100">
            <span className="text-amber-600 font-bold">✔</span> Food Grade Certified
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white p-3 rounded-xl shadow-2xs border border-stone-100">
            <span className="text-amber-600 font-bold">✔</span> Export Quality
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white p-3 rounded-xl shadow-2xs border border-stone-100">
            <span className="text-amber-600 font-bold">✔</span> Global Sourcing
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white p-3 rounded-xl shadow-2xs border border-stone-100">
            <span className="text-amber-600 font-bold">✔</span> Bulk Capability
          </div>
        </div>

        <div className="text-xs font-bold text-stone-400 tracking-wider pt-2">
          FSSAI License No • 12726999000019
        </div>
      </header>

      {/* --- PRODUCT CATALOG LIST --- */}
      <div className="max-w-7xl mx-auto space-y-16">
        {products.map((item, i) => (
          <div key={i} className="bg-white rounded-3xl border border-stone-100 shadow-xs flex flex-col lg:flex-row items-stretch overflow-hidden hover:shadow-md transition-all duration-300">
            
            {/* IMAGE PANEL */}
            <div className="w-full lg:w-80 bg-stone-50/60 shrink-0 flex flex-col items-center justify-between p-8 border-b lg:border-b-0 lg:border-r border-stone-100">
              <div className="text-center w-full">
                <span className="text-[10px] font-extrabold tracking-widest text-amber-800 bg-amber-100/60 px-2.5 py-1 rounded-md uppercase">
                  {item.category}
                </span>
              </div>

              <div className="relative w-full max-w-[220px] h-60 my-6 group">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-w-768px) 100vw, 320px"
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="flex flex-wrap gap-1.5 justify-center w-full">
                {item.certs.map(c => (
                  <span key={c} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-stone-200/60 rounded-md text-stone-600 uppercase tracking-wide shadow-2xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* CONTENT MODULE */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Make: {item.make}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">{item.title}</h2>
                  <p className="text-sm font-medium text-amber-700 mt-1">{item.subtitle}</p>
                </div>

                <div className="mb-8 border-l-2 border-amber-700 pl-5">
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider mb-1">About This Product</h4>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
                
                <div className="grid xl:grid-cols-2 gap-8">
                  {/* HIGHLIGHTS & APPS */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldCheck size={15} className="text-amber-700" /> Key Highlights
                      </h3>
                      <ul className="space-y-2.5">
                        {item.features.map((f, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm font-medium text-stone-700">
                            <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Info size={15} className="text-amber-700" /> Applications
                      </h3>
                      <ul className="space-y-2">
                        {item.applications.map((a, idx) => (
                          <li key={idx} className="text-sm text-stone-600 flex items-center gap-2 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" /> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* TECHNICAL DATA PANEL */}
                  <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Beaker size={15} /> Specifications
                      </h3>
                      <div className="space-y-2.5">
                        {Object.entries(item.specs).map(([k, v], idx) => (
                          <div key={idx} className="flex justify-between text-sm border-b border-stone-200/60 pb-1.5 last:border-0">
                            <span className="text-stone-500">{k}</span>
                            <span className="font-bold text-stone-900">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* TRADE INFO BOXES */}
                    <div className="mt-6 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                       <div className="text-center p-2.5 bg-white rounded-xl border border-stone-200/40 shadow-2xs">
                          <Package size={14} className="mx-auto mb-1 text-amber-700" />
                          <p className="text-[8px] text-stone-400 uppercase font-bold">Pack Size</p>
                          <p className="text-[10px] font-bold text-stone-800 truncate mt-0.5">{item.trade.Packaging}</p>
                       </div>
                       <div className="text-center p-2.5 bg-white rounded-xl border border-stone-200/40 shadow-2xs">
                          <Calendar size={14} className="mx-auto mb-1 text-amber-700" />
                          <p className="text-[8px] text-stone-400 uppercase font-bold">Min Order</p>
                          <p className="text-[10px] font-bold text-stone-800 truncate mt-0.5">{item.trade.MinOrder}</p>
                       </div>
                       <div className="text-center p-2.5 bg-white rounded-xl border border-stone-200/40 shadow-2xs">
                          <Globe size={14} className="mx-auto mb-1 text-amber-700" />
                          <p className="text-[8px] text-stone-400 uppercase font-bold">Market</p>
                          <p className="text-[10px] font-bold text-stone-800 truncate mt-0.5">{item.trade.Market}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full cursor-pointer px-8 py-3 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-amber-800 transition-all shadow-sm">
                    Request Bulk Pricing
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