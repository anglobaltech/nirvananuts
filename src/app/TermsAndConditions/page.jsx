"use client";

import React from 'react';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 antialiased font-sans pb-24">

      {/* Header */}
      <header className="mt-20 bg-white border-b border-stone-200 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-emerald-800 text-xs font-medium tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full mb-4">
            Nirvana Nuts
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-5"></div>
          <p className="text-stone-500 text-sm max-w-lg mx-auto leading-relaxed">
            By using our website or placing an order with Nirvana Nuts, you agree to the following Terms &amp; Conditions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 mt-10 space-y-3">

        {/* Section 01 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">01</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Products</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>We sell Makhana (fox nuts), flavoured Makhana snacks, and selected bulk food ingredients.</p>
            <p>We try to keep product information, images, prices, and availability accurate. Product appearance or packaging may sometimes vary slightly from the images shown on the website.</p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">02</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Orders</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>Please provide correct name, address, phone number, and other required details when placing an order.</p>
            <p>An order is confirmed after we receive and verify your payment.</p>
            <p>We may cancel an order if a product is unavailable, there is an incorrect price or product listing, or the order cannot be fulfilled.</p>
          </div>
        </div>

        {/* Section 03 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">03</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Prices &amp; Payment</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>All prices shown on the website are subject to change without prior notice.</p>
            <p>Payment must be completed through the payment methods available on our website.</p>
            <p>For bulk or B2B orders, pricing and payment terms may be confirmed separately through a quotation or invoice.</p>
          </div>
        </div>

        {/* Section 04 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">04</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Shipping &amp; Delivery</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>We will process and dispatch your order after payment confirmation.</p>
            <p>Delivery times are estimates and may vary due to courier delays, weather, holidays, or other circumstances beyond our control.</p>
            <p>Please make sure your delivery address and contact details are correct.</p>
          </div>
        </div>

        {/* Section 05 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">05</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Cancellation</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>You may request cancellation before your order is dispatched.</p>
            <p>Once an order has been dispatched, cancellation may not be possible.</p>
          </div>
        </div>

        {/* Section 06 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">06</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Returns, Refunds &amp; Replacements</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>As our products are food and consumable items, we generally do not accept returns for products that have been correctly delivered.</p>
            <p>If you receive a product that is <span className="font-semibold text-stone-900">damaged, defective, incorrect, or different from what you ordered</span>, please contact us within <span className="font-semibold text-stone-900">48 hours of delivery</span>.</p>
            <p>Please provide your order details and clear photographs of the product and packaging.</p>
            <p>After verification, we may offer a replacement or refund.</p>
            <p>Approved refunds will normally be processed to the original payment method within <span className="font-semibold text-stone-900">5–7 business days</span>.</p>
          </div>
        </div>

        {/* Section 07 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">07</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Allergen Information</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mt-2">
              <span className="block text-stone-900 font-medium text-sm mb-2">⚠ Allergen Notice</span>
              <p className="text-stone-500 text-sm leading-relaxed mb-3">
                Our facility handles <span className="font-semibold text-stone-800">tree nuts, sesame, peanuts, soy, and dairy</span>.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mb-3">
                Although we take care to prevent cross-contact, we cannot guarantee that our products are completely free from traces of these allergens.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Please check the product label and ingredients before consuming the product.
              </p>
            </div>
          </div>
        </div>

        {/* Section 08 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">08</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Website Content</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>The Nirvana Nuts name, logo, product images, packaging designs, text, and other website content belong to Nirvana Nuts or its licensors.</p>
            <p>You may not copy, reproduce, or use our content for commercial purposes without our permission.</p>
          </div>
        </div>

        {/* Section 09 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">09</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Website Use</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>You agree to use our website only for lawful purposes.</p>
            <p>You must not misuse the website, attempt unauthorised access, or use the website for fraudulent activities.</p>
          </div>
        </div>

        {/* Section 10 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">10</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Customer Support</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>For questions about orders, products, delivery, refunds, bulk orders, or other concerns, please contact us:</p>
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
                <a href="mailto:info@nirvananuts.in" className="text-stone-300 text-sm hover:text-amber-400 transition-colors">info@nirvananuts.in</a>
              </div>
              <div>
                <span className="block text-amber-400 text-xs font-medium uppercase tracking-widest mb-1">Website</span>
                <a href="http://www.nirvananuts.in" className="text-stone-300 text-sm hover:text-amber-400 transition-colors">www.nirvananuts.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 11 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">11</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Changes to These Terms</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>We may update these Terms &amp; Conditions when necessary. The latest version will always be available on our website.</p>
          </div>
        </div>

        {/* Section 12 */}
        <div className="bg-white border border-stone-200/60 hover:border-emerald-600/30 rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md tracking-wider">12</span>
            <h2 className="text-base md:text-lg font-medium text-stone-900">Governing Law</h2>
          </div>
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-600">
            <p>These Terms &amp; Conditions are governed by the laws of India.</p>
          </div>
        </div>

      </section>
    </main>
  );
}