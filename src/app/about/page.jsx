"use client";

import Image from 'next/image';
import Link from "next/link";
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const makhanaProcess = [
  {
    title: "1. Raw Material Sourcing",
    description: "We begin with sourcing the finest Makhana (fox nuts), handpicked at peak freshness from trusted farms. Each batch is checked for size, color, and moisture to ensure only premium-quality seeds enter our process.",
  },
  {
    title: "2. Cleaning & Sorting",
    description: "Raw Makhana is thoroughly cleaned to remove dust, stones, and other foreign particles. It is then sorted and calibrated by size to ensure uniform roasting and consistent texture in every pack.",
  },
  {
    title: "3. Roasting & Puffing",
    description: "The cleaned seeds are gently roasted under controlled heat. This stage helps puff the seeds, develop their signature light crunch, and enhance flavor while preserving nutritional value.",
  },
  {
    title: "4. Shelling & Sieving",
    description: "After roasting, the outer shells are carefully removed. The puffed Makhana kernels are then sieved to separate any broken or undersized pieces, ensuring a uniform, premium-grade final product.",
  },
  {
    title: "5. Drying & Conditioning",
    description: "The kernels are dried to an optimal moisture level to extend shelf life and maintain crispness. This step is crucial to prevent microbial growth and preserve the natural taste and texture.",
  },
  {
    title: "6. Flavoring & Blending",
    description: "Depending on the variant, Makhana is lightly seasoned with carefully selected ingredients—such as classic salted, Cheese Masti, or fasting-friendly flavors—while maintaining a clean-label, health-focused profile.",
  },
  {
    title: "7. Quality Control",
    description: "Every batch undergoes strict quality checks for appearance, crunch, taste, and hygiene. Only the lots that meet our internal standards move forward to packaging.",
  },
  {
    title: "8. Packaging & Dispatch",
    description: "Makhana is packed in high-barrier, food-grade pouches and bulk bags designed to protect against moisture, oxygen, and light. Clear labeling ensures traceability, and products are then dispatched through our D2C and bulk channels.",
  },
];

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen w-full bg-linear-to-r overflow-hidden from-white via-gray-50 to-white pt-16">

      {/* SECTION 1: HERO HERITAGE */}
      <section className="bg-amber-50/60 py-20 px-6 md:px-20 text-amber-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div data-aos="fade-right">
            <span className="text-amber-600 uppercase tracking-widest text-sm font-bold">
              Our Heritage
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4 mb-6 text-gray-900">
              A Journey of <span className="italic text-amber-600 font-serif">Pure Nutrition & Strength</span>
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Nirvana Nuts was founded with a simple mission — to deliver premium quality makhana and clean nutrition products sourced from nature. Our roasted fox nuts are carefully selected, hygienically processed, and crafted for healthy living.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Alongside our gourmet makhana range, we also supply <strong className="text-amber-600 font-semibold">Bulk Whey Protein in 20kg packaging</strong> — trusted by gyms, fitness brands, and distributors looking for high-quality protein solutions for muscle growth and recovery.
            </p>
            <Link
              href="/products"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Explore Collection
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center" data-aos="fade-left">
            {/* FIXED ASPECT RATIO: Set proper bounding box container dimensions */}
            <Image
              src="/new-image-04.avif"
              alt="Nirvana Nuts Premium Makhana and Bulk Whey Protein Showcase"
              height={500}
              width={600}
              priority // Correctly prioritized as first fold graphic asset
              className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[450px]"
            />
            {/* Floating Badge */}
            <div 
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-amber-100"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="text-3xl font-extrabold text-amber-600 block">6+</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Years of Excellence
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: LEADERSHIP VISION & MISSION */}
      <section className="bg-linear-to-br from-amber-50 via-white to-amber-100/50 py-20 px-6 md:px-16 border-y border-amber-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <div data-aos="fade-right" className="relative group">
            <Image
              src="/founder of nirvana nuts.avif"
              alt="Nirvana Nuts Leadership Team"
              width={600}
              height={650}
              loading="lazy"
              className="rounded-t-2xl shadow-2xl object-cover w-full h-auto max-h-[500px]"
            />
            {/* Overlay Card */}
            <div className="w-full bg-amber-900/95 backdrop-blur-xs text-white p-6 rounded-b-2xl shadow-lg">
              <h3 className="text-2xl font-bold tracking-wide">
                Nirvana Nuts Leadership
              </h3>
              <p className="text-amber-200/90 text-sm mt-1">
                Committed to Purity, Performance & Global Standards
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-12">
            {/* Vision */}
            <div data-aos="fade-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Vision</h2>
              <div className="w-16 h-1 bg-amber-600 mb-6 rounded-full"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become a trusted global brand in healthy snacking and performance nutrition by delivering premium quality <strong>makhana (fox nuts)</strong> and <strong>bulk whey protein (20kg packaging)</strong> to fitness brands, gyms, distributors, and modern consumers.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-3">
                We aim to provide clean-label, nutrient-rich products sourced responsibly and processed under strict quality standards.
              </p>
            </div>

            {/* Mission */}
            <div data-aos="fade-left" data-aos-delay="150">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <div className="w-16 h-1 bg-amber-600 mb-6 rounded-full"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to maintain excellence from sourcing to packaging by following international food safety and nutritional standards.
              </p>
              <ul className="mt-6 space-y-3 text-gray-600 text-md font-medium">
                <li className="flex items-center gap-2 text-gray-700">✔ Premium farm-sourced makhana with hygienic processing</li>
                <li className="flex items-center gap-2 text-gray-700">✔ High-quality 20kg bulk whey protein solutions</li>
                <li className="flex items-center gap-2 text-gray-700">✔ Reliable supply for fitness brands & manufacturers</li>
                <li className="flex items-center gap-2 text-gray-700">✔ Transparent quality testing & global compliance</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: PROCESSING ENGINE METRICS */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4" data-aos="fade-up">
            Premium Makhana Processing – Nirvana Nuts
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-14 text-base" data-aos="fade-up">
            From farm-sourced fox nuts to perfectly roasted healthy snacks, Nirvana Nuts follows a strict quality-controlled manufacturing process ensuring purity, crunch, and nutrition.
          </p>

          {/* Grid Layout Map */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {makhanaProcess.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-xs hover:shadow-md hover:bg-white transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <h3 className="text-lg font-bold text-emerald-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bulk Whey Protein Unit Display */}
          <div className="mt-20 bg-emerald-50/70 border border-emerald-100 p-8 md:p-10 rounded-2xl shadow-xs" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              20kg Bulk Whey Protein Solutions
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Nirvana Nuts also supplies premium 20kg bulk whey protein for fitness brands, manufacturers, and private label businesses. Our protein solutions reflect our commitment to purity, performance, and transparency.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 font-medium text-sm pl-2 mt-4">
              <li className="flex items-center gap-2">🔹 High Protein Content</li>
              <li className="flex items-center gap-2">🔹 Lab Tested Quality</li>
              <li className="flex items-center gap-2">🔹 Bulk Packaging – 20kg Bags</li>
              <li className="flex items-center gap-2">🔹 Ideal for Private Label & Manufacturing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIETARY BENEFITS */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Health Benefits of Nirvana Nuts Makhana
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Nutrient-Rich", text: "Packed with protein, fiber, and essential minerals." },
            { title: "Low-Calorie", text: "Ideal for weight management and extremely low in saturated fat." },
            { title: "Antioxidant-Rich", text: "Helps reduce oxidative stress and lower overall cell risks." },
            { title: "Heart Health", text: "High in cardiovascular-friendly magnesium and low in sodium." },
            { title: "Digestive Aid", text: "Promotes smooth internal digestion and healthy gut response." }
          ].map((benefit, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-xs p-5 hover:scale-[1.02] hover:border-amber-200 transition-all duration-300">
              <strong className="text-amber-700 text-lg block mb-1">{benefit.title}:</strong>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: VISUAL ASSET DISPLAY GALLERY */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-4 max-w-6xl mx-auto mb-20">
        {[
          { src: "/about-image-04.webp", alt: "Fresh Makhana Bowl Preparation" },
          { src: "/about-image-05.webp", alt: "Nirvana Nuts Secured Packet Unit" },
          { src: "/product-03.avif", alt: "Crispy Roasted Premium Makhana kernels" },
        ].map((img, i) => (
          <div key={i} className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <Image
              src={img.src}
              alt={img.alt}
              fill // Responsive scaling strategy
              sizes="(max-w-768px) 100vw, 33vw"
              loading="lazy" // FIXED PERFORMANCE: Lazy loaded below-the-fold assets
              className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        ))}
      </section>

      {/* SECTION 6: CULTURAL HERITAGE NARRATIVE */}
      <section className="max-w-4xl mx-auto mb-24 text-center px-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Cultural Heritage of Makhana</h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Makhana, also known as fox nuts, originates from the holy Mithila region of Bihar. It has been a core pillar of traditional Indian wellness systems for centuries, revered in Ayurveda for its timeless healing properties. Rich in pure nutrients, makhana stands as a proud daily staple in Indian households, symbolizing pure regional legacy and holistic nutritional excellence.
        </p>
      </section>

      {/* SECTION 7: INTERACTIVE CALL-TO-ACTION TERMINAL */}
      <section className="max-w-5xl mx-auto mb-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-10 text-center rounded-2xl shadow-xl border border-amber-500/20 mx-4 md:mx-auto">
        <h2 className="text-3xl font-bold mb-3 text-white">Get in Touch</h2>
        <p className="text-amber-100 mb-8 max-w-xl mx-auto text-sm md:text-base">
          Have queries about our nutritional products, wholesale packaging specifications, or dealerships? We would love to assist you!
        </p>
        <Link 
          href="/contact"
          className="inline-block bg-white hover:bg-gray-100 text-amber-700 px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Contact Us Securely
        </Link>
      </section>

    </main>
  );
};

export default AboutPage;