import React from 'react';
import Image from 'next/image';

const products = [
  {
    id: "classic-salted",
    name: "Classic Salted Makhana",
    subtitle: "The Timeless Everyday Superfood",
    marketingTitle: "Roasted & Salted Makhana – The Classic Snack",
    description: "Our Classic Salted Makhana is gently roasted and lightly seasoned with pure Sendha Namak to deliver a clean, natural flavor. A wholesome, protein-rich superfood that's perfect for fasting (Vrat) and healthy everyday snacking.",
    image: "/product-05.avif",
    features: [
      "Premium quality handpicked fox nuts",
      "Slow-roasted in pure ghee or olive oil",
      "Lightly seasoned with pristine Sendha Namak",
      "High in plant protein, exceptionally low calories",
      "100% Gluten-free and naturally easy to digest",
      "Perfect for fasting (Vrat), tea-time, or workspaces"
    ]
  },
  {
    id: "modern-savory",
    name: "Modern Savory Makhana",
    subtitle: "Bold Flavors for Contemporary Palates",
    marketingTitle: "Modern Savory Makhana Flavors – Peri‑Peri, Cheese, Tomato & Mint",
    description: "Experience a modern twist on traditional makhana. Infused with rich savory profiles including fiery Peri-Peri chili, classic White Cheddar, Tangy Tomato, and fresh Mint Pudina. A clean alternative to fried chips.",
    image: "/product-03.avif",
    features: [
      "Infused with exotic, aromatic spice blends",
      "Perfected roasting curve for maximum crunch",
      "Excellent healthy substitute for potato chips or popcorn",
      "Packed with active antioxidants and nutrients",
      "Low fat composition with no trans fats",
      "Tailored for parties, travel food, and late-night cravings"
    ]
  },
  {
    id: "sweet-gourmet",
    name: "Sweet & Gourmet Makhana",
    subtitle: "Indulgence Meets Clean Nutrition",
    marketingTitle: "Sweet & Gourmet Makhana – Premium Healthy Snack",
    description: "Indulge in a delightful sweet crunch with our Sweet Gourmet Makhana. Meticulously glazed with premium ingredients like rich caramel, dark chocolate, authentic jaggery, or organic honey for a guilt-free dessert alternative.",
    image: "/product-04.avif",
    features: [
      "Artisanal coatings of caramel, chocolate, or jaggery",
      "Lightly roasted bases keeping an airy texture",
      "Satisfies sweet cravings cleanly without artificial sugar rushes",
      "Sophisticated presentation ideal for festive luxury gifting",
      "Free from synthetic preservatives or coloring agents",
      "A wholesome, kid-friendly snack alternative"
    ]
  },
  {
    id: "fusion-spicy",
    name: "Fusion Spicy Makhana",
    subtitle: "An Explosion of Heat and Crunch",
    marketingTitle: "Fusion & Spicy Makhana – Bold & Flavorful Healthy Snack",
    description: "Turn up the heat with Fusion Spicy Makhana, seasoned with a vibrant blend of hand-ground exotic spices for a deep, complex flavor profile. Formulated cleanly for fitness enthusiasts and true spice lovers.",
    image: "/about-image-04.webp",
    features: [
      "Unique collision of traditional Indian and global spices",
      "Consistent fiery kick throughout every bite",
      "Precisely dry-roasted for a non-greasy finish",
      "High dietary fiber and protein balance",
      "Supports mindful eating targets and metabolic fitness",
      "Pairs phenomenally with evening teas and social gatherings"
    ]
  }
];

const Page = () => {
  return (
    <section className="min-h-screen bg-neutral-50 text-neutral-800 antialiased pt-24 pb-20">
      
      {/* Editorial Header Section */}
      <div className="max-w-7xl mt-10 mx-auto text-center px-6 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200/40">
          Nirvana Nuts Premium Range
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mt-4 leading-tight">
          Premium Makhana
        </h1>
        <p className="mt-3 text-lg md:text-xl font-medium text-amber-700">
          Healthy, Crunchy & Wholesome Snacking Reimagined
        </p>
        
        <div className="mt-10 bg-white border border-neutral-200/60 rounded-2xl p-6 md:p-10 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-amber-500" />
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
            What makes makhana a smart snack choice?
          </h2>
          <p className="text-neutral-600 leading-relaxed text-base md:text-stretch">
            Makhana, also known globally as fox nuts or lotus seeds, is naturally light, plant-protein rich, and notably easy on the digestive system. 
            At <span className="font-semibold text-amber-700">Nirvana Nuts</span>, we place strict emphasis on maintaining absolute raw purity and bold flavor architecture. 
            Our targeted roasting processes amplify structural crispness while keeping the foundational nutritional properties fully intact.
          </p>
        </div>
      </div>

      {/* Alternating Feature Showcases */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-950 tracking-tight sm:text-4xl">
            Explore Our Gourmet Profiles
          </h2>
          <p className="text-neutral-500 mt-2 text-sm md:text-base">
            Carefully structured flavor paths made from premium local crops
          </p>
        </div>

        {products.map((product, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={product.id}
              className="bg-white border border-neutral-100 rounded-3xl shadow-xl shadow-neutral-200/30 overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[440px]"
            >
              {/* Image Frame Wrapper layout order switching natively */}
              <div className={`w-full min-h-[320px] md:min-h-full relative group overflow-hidden bg-neutral-100 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  sizes="(max-w-768px) 100vw, 550px"
                  priority={index === 0}
                />
              </div>

              {/* Text Focus Panel */}
              <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  {product.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-950 mt-2 mb-4">
                  {product.name}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
                  {product.description}
                </p>
                
                {/* Clean Feature List Component Layout */}
                <ul className="space-y-2.5 text-sm text-neutral-700 font-medium border-t border-neutral-100 pt-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold mt-0.5 select-none text-xs bg-amber-50 rounded-full w-4 h-4 flex items-center justify-center border border-amber-200">
                        ✓
                      </span>
                      <span className="leading-tight text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Functional Context / Informational Section */}
      <div className="max-w-6xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl shadow-sm hover:border-neutral-300 transition-colors">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4 border border-amber-200/60">
            <span className="text-amber-700 font-bold text-lg">♥</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-950 mb-2">Health Benefits of Makhana</h3>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Makhana is celebrated by clinical nutritionists for being naturally low in sodium, glycemic indexes, and trans-fats. 
            It seamlessly supports calorie-restricted eating targets while offering active plant proteins. 
            Its uniquely porous, crisp texture allows simple seasoning adhesion without heavy oil sub-layers.
          </p>
        </div>
        
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl shadow-sm hover:border-neutral-300 transition-colors">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4 border border-amber-200/60">
            <span className="text-amber-700 font-bold text-lg">★</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-950 mb-2">Why Choose Nirvana Nuts?</h3>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            We operate under clear, rigorous batch testing workflows, immaculate food handling configurations, and completely premium farming sourcing pipelines. 
            Our team focuses on supplying a robust, reliably uniform snap in every bag. No empty shells, no over-processing.
          </p>
        </div>
      </div>

      {/* Modern Catalog E-Commerce Grid Feed */}
      <div className="max-w-6xl mx-auto px-6 mt-32">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight">
            The Nirvana Nuts Catalog
          </h2>
          <p className="text-neutral-500 mt-1 text-sm">
            Quick view comparison of our active market variants
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={`card-${product.id}`}
              className="group bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50 border-b border-neutral-100">
                <Image
                  src={product.image}
                  alt={product.marketingTitle}
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between bg-white">
                <div>
                  <h4 className="text-sm font-bold text-neutral-950 group-hover:text-amber-700 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
                    {product.marketingTitle}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Impact Institutional CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="bg-neutral-900 border border-neutral-800 text-white rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-600/10 rounded-full blur-2xl" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Partner with Nirvana Nuts
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Have distinct retail inquiries, institutional sourcing targets, or wholesale custom distribution queries? Get straight to our support table.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:bg-amber-500 active:scale-98 transition-all duration-200 text-sm"
          >
            Contact Distribution Desk
          </a>
        </div>
      </div>

    </section>
  );
};

export default Page;