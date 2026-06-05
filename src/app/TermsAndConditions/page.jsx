"use client";

import React from 'react';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 antialiased font-sans pb-24">

      {/* Header */}
      <header className="mt-20 bg-white border-b border-stone-200 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-emerald-800 text-xs font-medium tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full mb-4">
            Nirvana Nuts · Legal Agreement
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-5"></div>
          <p className="text-stone-500 text-sm max-w-lg mx-auto leading-relaxed">
            Effective Date: June 03, 2026. These terms apply to all purchases and use of our website at{' '}
            <span className="text-emerald-800 font-medium">www.nirvananuts.in</span>.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 mt-10 space-y-3">

        {/* Section 01 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">01</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">About Us &amp; Our Products</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              Welcome to Nirvana Nuts. By using our website or placing an order, you agree to these Terms &amp; Conditions.
            </p>
            <p>
              We source our Makhana (fox nuts) directly from farmers in the Mithila region of Bihar, supporting local agricultural communities and ensuring clean, natural processing at every step.
            </p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">02</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Your Account</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              To access wholesale pricing or set up repeat orders, you'll need to create an account. When registering, please make sure all details — including tax certificates, company name, or FSSAI registration — are accurate and up to date.
            </p>
            <p>
              You are responsible for keeping your login credentials secure.
            </p>
          </div>
        </div>

        {/* Section 03 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">03</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Our Products &amp; Pricing</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>We offer two categories of products:</p>
            <div className="border-l-2 border-stone-200 pl-5 space-y-4 my-2">
              <div>
                <h3 className="text-sm md:text-[15px] font-medium text-stone-900 mb-1">A. Retail Snacks</h3>
                <p className="text-stone-500 text-sm">
                  Flavoured Makhana snacks including Classic Salted, Cheese, Peri-Peri, Tangy Tomato, Mint Pudina, Sweet Gourmet, and Spicy Fusion varieties.
                </p>
              </div>
              <div>
                <h3 className="text-sm md:text-[15px] font-medium text-stone-900 mb-1">B. Bulk Ingredients (B2B)</h3>
                <p className="text-stone-500 text-sm">
                  Whey Protein Concentrate, Isolate, and Hydrolysate in 20kg industrial sacks — lab-tested and intended for gyms, wellness brands, and food manufacturers.
                </p>
              </div>
            </div>
            <p>
              Prices may change due to seasonal crop variations or global supply shifts. For bulk orders, we will send a formal invoice, and payment must be confirmed before we begin processing your shipment.
            </p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">04</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Shipping &amp; Delivery</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              Our products go through cleaning, grading, popping, roasting, and moisture-sealed packaging before dispatch. Delivery timelines are estimates provided by our third-party courier partners and may vary.
            </p>
            <p>
              Because our products are consumable, we do not accept returns after an order has been dispatched. If your order arrives damaged, please contact us within 48 hours of delivery and share clear photographs of the damage.
            </p>
          </div>
        </div>

        {/* Section 05 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">05</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Intellectual Property</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              Everything on our website — including the Nirvana Nuts name, logo, packaging designs, product recipes, images, and website code — belongs to us.
            </p>
            <p>
              You may not copy, reproduce, or use any of this for your own commercial purposes without written permission from us.
            </p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">06</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Allergens &amp; Liability</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              To the fullest extent permitted by law, Nirvana Nuts is not liable for indirect, incidental, or consequential losses arising from the use of our products or website.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mt-2">
              <span className="block text-stone-900 font-medium text-sm mb-2">⚠ Allergen Notice</span>
              <p className="text-stone-500 text-sm leading-relaxed">
                Our facility handles tree nuts, sesame, peanuts, soy, and dairy. While we aim to avoid cross-contamination, we cannot guarantee complete separation. Please read all product ingredient labels carefully before purchasing or reselling.
              </p>
            </div>
          </div>
        </div>

        {/* Section 07 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">07</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Cancellations &amp; Refunds</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              You can cancel your order before it is dispatched. Once shipped, cancellations are generally not possible.
            </p>
            <p>
              Refunds or replacements are offered only for items that arrive damaged, defective, or incorrect — provided you report the issue within 48 hours of delivery with supporting photos.
            </p>
            <p>
              Approved refunds are processed to your original payment method within 5–7 business days.
            </p>
          </div>
        </div>

        {/* Section 08 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">08</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Contact Us</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>For formal inquiries, bulk orders, or distribution questions, reach out to our team:</p>
            <div className="bg-emerald-950 text-stone-100 rounded-xl p-6 space-y-4 mt-2">
              <div>
                <span className="block text-amber-400 text-xs font-medium uppercase tracking-widest mb-1">Address</span>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Vill- Semra Hat, Thana-Turkuliya, Semra (East Champaran), Banjaria, East Champaran – 845435, Bihar, India
                </p>
              </div>
              <div>
                <span className="block text-amber-400 text-xs font-medium uppercase tracking-widest mb-1">Phone</span>
                <p className="text-stone-300 text-sm">(+91) 778 206 9184</p>
              </div>
              <div>
                <span className="block text-amber-400 text-xs font-medium uppercase tracking-widest mb-1">Email</span>
                <p className="text-stone-300 text-sm">info@nirvananuts.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 09 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">09</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Governing Law</h2>
          </div>
          <div className="text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>
              These Terms &amp; Conditions are governed by the laws of India. Any disputes will fall under the exclusive jurisdiction of the courts of Bihar, India.
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}