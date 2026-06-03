import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: "Buy Premium Makhana & Bulk Whey Protein | Nirvana Nuts",
  description: "Shop premium classic salted, savory, sweet and spicy makhana along with bulk whey protein at Nirvana Nuts. Healthy, protein-rich snacks crafted for everyday wellness and wholesale needs across India."
};

// "type" property changed to "link" for direct routing mapping
const products = [
  {
    name: "Roasted & Salted Makhana – The Classic Snack",
    description: "Crunchy Roasted & Salted Makhana, lightly tossed in ghee or olive oil with Sendha Namak. A protein‑rich, gluten‑free superfood, perfect for fasting (Vrat) and healthy everyday snacking.",
    image: "/product-05.avif",
    link: "/plain-makhana"
  },
  {
    name: "Modern Savory Makhana Flavors – Peri‑Peri, Cheese, Tomato & Mint",
    description: "Enjoy Savory Makhana in exciting flavors – Peri‑Peri chili, Cheese/White Cheddar, Tangy Tomato, and Mint Pudina. High‑protein, gluten‑free, antioxidant‑rich fox nuts, a healthy alternative to chips and popcorn.",
    image: "/product-03.avif",
    link: "/modern-makhana"
  },
  {
    name: "Sweet & Gourmet Makhana – Premium Healthy Snack",
    description: "Crunchy Sweet & Gourmet Makhana, coated with caramel, chocolate, jaggery, or honey. A protein‑rich, gluten‑free superfood, perfect for festive gifting, healthy desserts, and guilt‑free snacking.",
    image: "/product-04.avif",
    link: "/sweet-makhana"
  },
  {
    name: "Fusion & Spicy Makhana – Bold & Flavorful Healthy Snack",
    description: "Experience the fiery taste of Fusion & Spicy Makhana, roasted fox nuts seasoned with exotic spices. High in protein, gluten‑free, and rich in antioxidants, this crunchy snack is a guilt‑free alternative to chips, perfect for fitness lovers and spice enthusiasts",
    image: "/about-image-04.webp",
    link: "/fusion-makhana"
  },
  {
    name: "Whey Protein – The Muscle Builder",
    description: "Boost strength and recovery with premium whey protein powder, rich in all 9 essential amino acids. Fast‑absorbing, highly digestible, perfect for athletes, gym enthusiasts, and fitness lovers",
    image: "/whey-protein-01.avif",
    link: "/whey-protein"
  },
];

const Page = () => {
  return (
    <section className="min-h-screen w-full bg-slate-50/50 text-gray-800 antialiased pt-24 pb-16">
      
      {/* HERO / ABOUT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h1 className="text-3xl mt-10 md:text-5xl font-extrabold text-amber-900 text-center tracking-tight max-w-4xl mx-auto leading-tight mb-12">
          Shop Premium Makhana Flavors & <span className="text-amber-600">Bulk Whey Protein</span> Online
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-amber-100/50">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-medium text-sm">
              <span>Pure & Organic Nutritional Superfoods</span>
            </div>
            <h2 className="text-2xl md:text-4xl text-amber-800 font-bold tracking-tight">About Nirvana Nuts</h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              At Nirvana Nuts, we believe snacking should be both delightful and
              nourishing. That's why our Makhana is carefully sourced from the best
              farms, ensuring superior quality and purity.
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our Makhana is roasted to perfection, offering a crunchy, delicious snack
              that's as good for your body as it is for your taste buds. Our variety of
              flavors, from classic salted to exotic spice blends, caters to every
              palate.
            </p>
            <p className="font-semibold text-amber-700 text-base md:text-lg">
              Discover the ultimate in healthy, delicious snacking with Nirvana Nuts today!
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group overflow-hidden rounded-2xl shadow-md bg-amber-50 p-4">
              <Image
                src="/product-welcome.avif"
                alt="Nirvana Nuts Makhana Showcase"
                width={550}
                height={450}
                className="object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-102"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* NUTRITIONAL BENEFITS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Our Nutritional Standards
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Section 1: Makhana info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-600">Product Line 01</span>
                <h3 className="text-xl md:text-2xl font-bold text-amber-950 mt-1">Premium Makhana (Fox Nuts)</h3>
                <p className="text-sm text-gray-500 italic mt-0.5">India’s Favourite Guilt-Free Snack</p>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nirvana Nuts premium makhana is naturally low in calories and high in plant-based protein. 
                Our range includes expertly roasted and flavored options crafted for daily wellness and fitness weight management.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-amber-800 mb-2 text-sm uppercase tracking-wider">Health Benefits</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"/> High Protein & Antioxidants</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"/> Low Fat & Low Calorie</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"/> Weight Management</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"/> Gluten-Free & Easy Digest</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
              <span className="text-xs font-semibold text-gray-400 block mb-2">BEST ENJOYED AS:</span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Office Snacks</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Weight Loss Diets</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Fasting / Vrat</span>
              </div>
            </div>
          </div>

          {/* Section 2: Whey Protein info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-600">Product Line 02</span>
              <h3 className="text-xl md:text-2xl font-bold text-amber-950 mt-1">Premium Whey Protein</h3>
              <p className="text-sm text-gray-500 italic mt-0.5">High-Quality Protein for Strength & Recovery</p>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Derived organically from premium milk sources, containing all 9 essential amino acids. Complete, highly bioavailable muscle nutrition.
            </p>

            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-gray-900 text-sm flex items-center justify-between">
                  <span>Whey Protein Concentrate (WPC)</span>
                  <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded">70–80% Pro</span>
                </h5>
                <p className="text-xs text-gray-500 mt-0.5">Budget-friendly daily option, rich natural taste profile, ideal meal helper.</p>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-sm flex items-center justify-between">
                  <span>Whey Protein Isolate (WPI)</span>
                  <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded">90%+ Pro</span>
                </h5>
                <p className="text-xs text-gray-500 mt-0.5">Ultra low lactose and carbohydrate matrix, tailored for explosive clean post-workout recovery.</p>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-sm flex items-center justify-between">
                  <span>Whey Protein Hydrolysate (WPH)</span>
                  <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded">Pre-Digested</span>
                </h5>
                <p className="text-xs text-gray-500 mt-0.5">Pre-hydrolyzed fastest digesting amino chains designed exclusively for professional athletes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC PRODUCT CATALOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Explore Our Catalogue</h2>
          <p className="text-gray-500 mt-2">Premium quality health essentials customized for your healthy lifestyle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Image Wrapper */}
              <div className="relative w-full aspect-[4/3] bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-fill transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Product Card Details Container */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem] leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-amber-700 font-bold text-lg">
                    Premium Pack
                  </span>
                  
                  {/* Pulling url natively directly from the updated item context configuration */}
                  <a href={product.link} className="block">
                    <button className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs md:text-sm rounded-lg shadow-sm transition duration-200 cursor-pointer">
                      View Collection
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODERN CONTACT BANNER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-gradient-to-br from-amber-900 to-amber-950 text-white py-12 px-6 md:py-16 md:px-12 text-center rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Partner with Nirvana Nuts</h2>
            <p className="text-amber-200/80 text-sm md:text-base leading-relaxed">
              Have wholesale inquiries, specific custom requests, or curious about retail batches? 
              Connect directly with our support desk team today.
            </p>
            <div className="pt-4">
              <a href="/contact">
                <button className="bg-white hover:bg-amber-50 text-amber-950 font-semibold px-8 py-3 rounded-xl shadow-md transform hover:scale-[1.02] transition active:scale-[0.98] cursor-pointer text-sm">
                  Contact Our Team
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>

    </section>
  );
};

export default Page;