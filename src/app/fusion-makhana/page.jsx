"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Flame, Zap, ShieldCheck, Truck } from "lucide-react";

// export const metadata = {
//   title: "Fusion Spicy Makhana | Bold Flavored Fox Nuts | Nirvana Nuts",
//   description:
//     "Discover Fusion Spicy Makhana by Nirvana Nuts. A bold blend of spices with crunchy roasted fox nuts. Perfect healthy snack and bulk supply available.",
//   keywords:
//     "Fusion Makhana, Spicy Makhana, Roasted Fox Nuts, Nirvana Nuts, Healthy Spicy Snacks, Bulk Makhana",
// };

const page=()=>{

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-red-50">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto mt-15 px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">
            Fusion Spicy Makhana
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Ignite your taste buds with Nirvana Nuts Fusion Spicy Makhana.
            Expertly roasted fox nuts blended with bold spices and modern
            fusion flavors — delivering crunch, heat, and health in every bite.
          </p>

          <div className="flex gap-4">
            <Link href="/contact">
              <button className="bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 transition">
                Bulk Inquiry
              </button>
            </Link>
            {/* <Link href="/shop">
              <button className="border border-red-700 text-red-700 px-6 py-3 rounded-xl hover:bg-red-100 transition">
                Shop Now
              </button>
            </Link> */}
          </div>
        </div>

        <div data-aos="fade-left">
          <Image
            src="/product-06.png"
            alt="Fusion Spicy Makhana Nirvana Nuts"
            width={500}
            height={500}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>


      {/* FEATURES SECTION */}
      <section className="bg-orange-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-red-800 mb-12">
            Why Choose Fusion Spicy Makhana?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md">
              <Flame className="mx-auto text-red-700 mb-4" size={40}/>
              <h3 className="font-semibold text-amber-500 mb-2">Bold Spicy Flavor</h3>
              <p className="text-sm text-gray-600">Modern fusion seasoning.</p>
            </div>

            <div data-aos="zoom-in" data-aos-delay="100" className="bg-white p-6 rounded-2xl shadow-md">
              <Zap className="mx-auto text-red-700 mb-4" size={40}/>
              <h3 className="font-semibold text-amber-500 mb-2">Extra Crunchy</h3>
              <p className="text-sm text-gray-600">Perfectly roasted texture.</p>
            </div>

            <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-6 rounded-2xl shadow-md">
              <ShieldCheck className="mx-auto text-red-700 mb-4" size={40}/>
              <h3 className="font-semibold text-amber-500 mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-600">Hygienic processing & packing.</p>
            </div>

            <div data-aos="zoom-in" data-aos-delay="300" className="bg-white p-6 rounded-2xl shadow-md">
              <Truck className="mx-auto text-red-700 mb-4" size={40}/>
              <h3 className="font-semibold text-amber-500 mb-2">Bulk Supply</h3>
              <p className="text-sm text-gray-600">Available for wholesale orders.</p>
            </div>

          </div>
        </div>
      </section>


      {/* PRODUCT DETAILS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        <div data-aos="fade-up">
          <Image
            src="/Fusion Spicy.avif"
            alt="Spicy Fusion Makhana Bowl"
            width={500}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl font-bold text-red-800 mb-6">
            Product Specifications
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>✔ Flavor: Fusion Spicy Blend</li>
            <li>✔ Packaging: 100g, 250g, 500g, 1kg</li>
            <li>✔ 20kg Bulk Packaging Available</li>
            <li>✔ Shelf Life: 9–12 Months</li>
            <li>✔ Storage: Cool & Dry Place</li>
          </ul>

          <Link href="/contact">
            <button className="mt-6 bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 transition">
              Request Bulk Quote
            </button>
          </Link>
        </div>

      </section>


      {/* OTHER PRODUCTS SECTION */}
      <section className="bg-red-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-red-800 mb-12">
            Explore More Products
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              { name: "Classic Plain Makhana", img: "/image-quality-01.avif" },
              { name: "Modern Makhana", img: "/product-02.avif" },
              { name: "Sweet Makhana", img: "/product-03.avif" },
              { name: "Whey Protein (20kg Bulk)", img: "/whey-protein-07.avif" },
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="rounded-xl mb-4"
                />
                <h3 className="font-semibold text-gray-900 text-lg text-center">
                  {item.name}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}

export default page;