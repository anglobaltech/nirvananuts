"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Flame, Leaf, ShieldCheck, Sparkles } from "lucide-react";

// export const metadata = {
//     title: "Modern Savory Makhana | Spicy & Crunchy | Nirvana Nuts",
//     description:
//         "Buy Modern Savory Makhana from Nirvana Nuts. Premium roasted fox nuts with bold flavors, perfect for healthy snacking and bulk supply.",
//     keywords:
//         "Modern Makhana, Savory Makhana, Spicy Fox Nuts, Roasted Makhana, Nirvana Nuts, Bulk Makhana",
// };

const page =() => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="bg-orange-50">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto mt-15 px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

                <div data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
                        Modern Savory Makhana
                    </h1>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Experience bold flavors with Nirvana Nuts Modern Savory Makhana.
                        Perfectly roasted fox nuts infused with premium spices, delivering
                        crunchy texture and irresistible taste — without compromising health.
                    </p>

                    <div className="flex gap-4">
                        <Link href="/contact">
                            <button className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition">
                                Bulk Inquiry
                            </button>
                        </Link>
                        <Link href="/shop">
                            <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-100 transition">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>

                <div data-aos="fade-left">
                    <Image
                        src="/about-image-04.webp"
                        alt="Modern Savory Makhana Nirvana Nuts"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-xl"
                    />
                </div>
            </section>


            {/* FEATURES SECTION */}
            <section className="bg-amber-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold text-orange-600 mb-12">
                        Why Choose Modern Savory Makhana?
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md">
                            <Flame className="mx-auto text-orange-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Bold Flavor</h3>
                            <p className="text-sm text-gray-600">Modern spicy seasoning blend.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="100" className="bg-white p-6 rounded-2xl shadow-md">
                            <Leaf className="mx-auto text-orange-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Healthy Snack</h3>
                            <p className="text-sm text-gray-600">Low fat, high protein, guilt-free.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-6 rounded-2xl shadow-md">
                            <ShieldCheck className="mx-auto text-orange-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Premium Quality</h3>
                            <p className="text-sm text-gray-600">Hygienically roasted & packed.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="300" className="bg-white p-6 rounded-2xl shadow-md">
                            <Sparkles className="mx-auto text-orange-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Export Ready</h3>
                            <p className="text-sm text-gray-600">Available in bulk quantities.</p>
                        </div>

                    </div>
                </div>
            </section>


            {/* PRODUCT DETAILS */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

                <div data-aos="fade-up">
                    <Image
                        src="/home-cover-02.avif"
                        alt="Savory Roasted Makhana"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-md"
                    />
                </div>

                <div data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-3xl font-bold text-orange-600 mb-6">
                        Product Specifications
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Flavor: Modern Savory / Spicy</li>
                        <li>✔ Packaging: 100g, 250g, 500g, 1kg</li>
                        <li>✔ Bulk Supply Available</li>
                        <li>✔ Shelf Life: 9–12 Months</li>
                        <li>✔ Storage: Cool & Dry Place</li>
                    </ul>

                    <Link href="/contact">
                        <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition">
                            Request Bulk Quote
                        </button>
                    </Link>
                </div>

            </section>


            {/* OTHER PRODUCTS SECTION */}
            <section className="bg-orange-100 py-16">
                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center text-orange-600 mb-12">
                        Explore More Products
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        {[
                            { name: "Classic Plain Makhana", img: "/image-quality-01.avif" },
                            { name: "Sweet Makhana", img: "/product-03.avif" },
                            { name: "Fusion Makhana", img: "/product-04.avif" },
                            { name: "Whey Protein (20kg Bulk)", img: "/whey-protein-07.avif" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-white p-4  rounded-2xl shadow-md hover:shadow-xl transition"
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