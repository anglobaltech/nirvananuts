"use client";

import Image from 'next/image';
import Link from "next/link";
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const makhanaProcess = [
  {
    title: "1. Raw Material Sourcing",
    description: "Finest Makhana (fox nuts) handpicked at peak freshness from trusted farms. Checked for size, color, and moisture.",
  },
  {
    title: "2. Cleaning & Sorting",
    description: "Thoroughly cleaned to remove foreign particles, then sorted by size for uniform roasting.",
  },
  {
    title: "3. Roasting & Puffing",
    description: "Gently roasted under controlled heat to puff the seeds, develop crunch, and preserve nutrition.",
  },
  {
    title: "4. Shelling & Sieving",
    description: "Outer shells removed and kernels sieved to ensure a premium-grade final product.",
  },
  {
    title: "5. Drying & Conditioning",
    description: "Dried to optimal moisture levels to extend shelf life and maintain crispness.",
  },
  {
    title: "6. Flavoring & Blending",
    description: "Lightly seasoned with clean-label, health-focused ingredients for classic and bold flavors.",
  },
  {
    title: "7. Quality Control",
    description: "Strict checks for appearance, crunch, and hygiene. Only the best lots move forward.",
  },
  {
    title: "8. Packaging & Dispatch",
    description: "Packed in high-barrier pouches and bulk bags to protect against moisture and oxygen.",
  },
];

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <main className="min-h-screen w-full bg-warm-gradient-subtle overflow-hidden pt-16 selection:bg-amber-200 selection:text-amber-900">
      
      {/* SECTION 1: IMMERSIVE HERO */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6 lg:px-12">
        {/* Background elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div data-aos="fade-right" className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 backdrop-blur-md border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Our Heritage</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
              Pure <span className="text-gradient-amber">Nutrition</span> <br />
              <span className="font-serif italic font-light text-amber-700">& Strength.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              From premium gourmet Makhana to high-performance Bulk Whey Protein. Nirvana Nuts delivers clean, responsibly sourced nutrition for modern living.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-amber-600 border border-transparent rounded-full hover:bg-amber-700 hover:shadow-[0_0_20px_4px_rgba(245,158,11,0.2)]"
              >
                Explore Collection
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center" data-aos="zoom-in" data-aos-delay="200">
            {/* Main Hero Image */}
            <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl animate-float">
               <Image
                  src="/new-image-04.avif"
                  alt="Nirvana Nuts Premium Range"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <p className="text-white font-medium text-lg drop-shadow-md">Premium quality, crafted for healthy living.</p>
               </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-4 lg:-left-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white animate-float-delay z-20">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center font-bold text-amber-700">6+</div>
                </div>
                <div>
                  <p className="text-gray-900 font-bold leading-tight">Years of<br/>Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENTO GRID - VISION, MISSION, LEADERSHIP */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Identity</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">Committed to Purity, Performance & Global Standards.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
              {/* Leadership Card (Large) */}
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden group card-hover-lift" data-aos="fade-up" data-aos-delay="100">
                 <Image
                    src="/founder of nirvana nuts.avif"
                    alt="Leadership Team"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 backdrop-blur-md rounded-full text-sm font-semibold mb-3">Leadership</span>
                    <h3 className="text-3xl font-bold text-white mb-2">Nirvana Nuts Leadership</h3>
                    <p className="text-gray-200">Guiding the journey from farm-sourced fox nuts to global nutritional excellence.</p>
                 </div>
              </div>

              {/* Vision Card */}
              <div className="lg:col-span-5 bg-warm-gradient rounded-3xl p-8 lg:p-10 flex flex-col justify-center border border-amber-100 card-hover-lift shadow-sm" data-aos="fade-up" data-aos-delay="200">
                 <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-2xl">👁️</div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                 <p className="text-gray-700 leading-relaxed">
                   To become a trusted global brand in healthy snacking and performance nutrition by delivering premium quality makhana and bulk whey protein to modern consumers, gyms, and distributors.
                 </p>
              </div>

              {/* Mission Card (Full width on bottom) */}
              <div className="lg:col-span-12 bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 flex flex-col lg:flex-row gap-8 items-center card-hover-lift" data-aos="fade-up" data-aos-delay="300">
                 <div className="lg:w-1/3">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-600">Maintaining excellence from sourcing to packaging by following international food safety and nutritional standards.</p>
                 </div>
                 <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {[
                      "Premium farm-sourced makhana",
                      "High-quality 20kg bulk whey protein",
                      "Reliable B2B & distributor supply",
                      "Transparent quality testing"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xs border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">✓</div>
                        <span className="text-gray-800 font-medium">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 3: DARK THEME WHEY PROTEIN - HIGH CONTRAST */}
      <section className="py-24 px-6 lg:px-12 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle dot pattern in dark mode */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">B2B & Wholesale</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                20kg Bulk <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Whey Protein</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Engineered for performance. We supply premium bulk whey protein for fitness brands, manufacturers, and private label businesses demanding absolute purity.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "High Protein Content", desc: "Maximized biological value for muscle recovery." },
                  { title: "Lab Tested Quality", desc: "Rigorous third-party testing for purity." },
                  { title: "Ideal for Private Label", desc: "Ready for your brand's specific formulations." }
                ].map((feature, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                         <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-100">{feature.title}</h4>
                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                      </div>
                   </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] group" data-aos="fade-left">
              <Image
                src="/about-image-05.webp" 
                alt="Bulk Packaging Unit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/20 transition-colors duration-500"></div>
              {/* Overlay stats */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                 <div className="bg-gray-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-700/50 flex-1">
                   <div className="text-emerald-400 font-bold text-2xl">20kg</div>
                   <div className="text-gray-300 text-xs font-medium uppercase tracking-wider">Bulk Bags</div>
                 </div>
                 <div className="bg-gray-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-700/50 flex-1">
                   <div className="text-emerald-400 font-bold text-2xl">100%</div>
                   <div className="text-gray-300 text-xs font-medium uppercase tracking-wider">Verified</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE PROCESS TIMELINE */}
      <section className="py-24 px-6 lg:px-12 bg-white dot-pattern relative">
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">The Nirvana Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">A strict, quality-controlled journey from farm to your healthy snack bowl.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {makhanaProcess.map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group"
                data-aos="fade-up" 
                data-aos-delay={index * 50}
              >
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300">
                  <span className="text-amber-600 font-bold text-xl group-hover:text-white">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title.substring(3)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HEALTH BENEFITS (DYNAMIC CARDS) */}
      <section className="py-24 px-6 lg:px-12 bg-warm-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12" data-aos="fade-right">
             <div className="max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Makhana?</h2>
               <p className="text-gray-600 text-lg">A powerhouse of nutrients, perfect for mindful snacking.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Nutrient-Rich", text: "Packed with protein, fiber, and essential minerals.", icon: "💪" },
              { title: "Low-Calorie", text: "Ideal for weight management and extremely low in saturated fat.", icon: "🥗" },
              { title: "Antioxidant-Rich", text: "Helps reduce oxidative stress and lower overall cell risks.", icon: "✨" },
              { title: "Heart Health", text: "High in cardiovascular-friendly magnesium and low in sodium.", icon: "❤️" },
              { title: "Digestive Aid", text: "Promotes smooth internal digestion and healthy gut response.", icon: "🌿" }
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-8 hover:bg-white transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PREMIUM CTA & GALLERY */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4" data-aos="fade-right">
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg card-hover-lift">
                  <Image src="/about-image-04.webp" alt="Makhana Preparation" fill className="object-cover hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg card-hover-lift">
                  <Image src="/product-03.avif" alt="Roasted Makhana" fill className="object-cover hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-amber-900 rounded-[2.5rem] p-10 lg:p-14 text-center lg:text-left relative overflow-hidden shadow-2xl" data-aos="zoom-in">
              <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Partner With Excellence</h2>
                <p className="text-amber-100/80 text-lg mb-10 max-w-md mx-auto lg:mx-0">
                  Whether you are looking for premium retail snacks or bulk raw materials, our team is ready to deliver.
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 font-bold text-amber-900 bg-white rounded-full hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;