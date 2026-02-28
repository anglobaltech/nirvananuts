"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Leaf, ShieldCheck, HeartPulse, Dumbbell } from "lucide-react";

// export const metadata = {
//     title: "Premium Plain Makhana | Nirvana Nuts",
//     description:
//         "Buy premium quality Plain Makhana from Nirvana Nuts. Fresh, crunchy, healthy fox nuts perfect for snacking and bulk orders.",
//     keywords:
//         "Plain Makhana, Fox Nuts, Healthy Snacks, Nirvana Nuts, Bulk Makhana, Buy Makhana Online",
// };

const page = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="bg-amber-50">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto mt-15 px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

                <div data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6">
                        Premium Plain Makhana
                    </h1>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Nirvana Nuts brings you farm-fresh, hygienically processed
                        Plain Makhana (Fox Nuts) sourced directly from trusted farmers.
                        Perfect for healthy snacking, fasting, roasting, and bulk supply.
                    </p>

                    <div className="flex gap-4">
                        <Link href="/contact">
                            <button className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition">
                                Shop Now
                            </button>
                        </Link>
                        <Link href="/shop">
                            <button className="border border-amber-600 text-amber-700 px-6 py-3 rounded-xl hover:bg-amber-100 transition">
                                Explore More Products
                            </button>
                        </Link>
                    </div>
                </div>

                <div data-aos="fade-left">
                    <Image
                        src="/about-image-06.avif"
                        alt="Plain Makhana Nirvana Nuts"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </section>


            {/* FEATURES SECTION */}
            <section className="bg-orange-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold text-amber-700 mb-12">
                        Why Choose Our Plain Makhana?
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md">
                            <Leaf className="mx-auto text-amber-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">100% Natural</h3>
                            <p className="text-sm text-gray-600">No additives, no preservatives.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="100" className="bg-white p-6 rounded-2xl shadow-md">
                            <ShieldCheck className="mx-auto text-amber-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Hygienic Processing</h3>
                            <p className="text-sm text-gray-600">Cleaned & sorted with care.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-6 rounded-2xl shadow-md">
                            <HeartPulse className="mx-auto text-amber-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Healthy Snack</h3>
                            <p className="text-sm text-gray-600">Low fat, high protein.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="300" className="bg-white p-6 rounded-2xl shadow-md">
                            <Dumbbell className="mx-auto text-amber-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">All India Supply</h3>
                            <p className="text-sm text-gray-600">Available in 100g, 200g, 250g and 500g</p>
                        </div>

                    </div>
                </div>
            </section>


            {/* PRODUCT DETAILS */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

                <div data-aos="fade-up">
                    <Image
                        src="/product-01.avif"
                        alt="Fresh Plain Makhana"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-md"
                    />
                </div>

                <div data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-3xl font-bold text-amber-700 mb-6">
                        Product Specifications
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Size: 18mm – 24mm</li>
                        <li>✔ Moisture: Below 5%</li>
                        <li>✔ Packaging: 100g, 200g, 250g, 500g</li>
                        <li>✔ Shelf Life: 12 Months</li>
                        <li>✔ Storage: Cool & Dry Place</li>
                    </ul>

                    <Link href="/contact">
                        <button className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition">
                            Shop Now
                        </button>
                    </Link>
                </div>

            </section>


            {/* OTHER PRODUCTS SECTION */}
            <section className="bg-amber-100 py-16">
                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center text-amber-700 mb-12">
                        Explore More Products
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        {[
                            { name: "Modern Makhana", img: "/product-02.avif" },
                            { name: "Sweet Makhana", img: "/product-03.avif" },
                            { name: "Fusion Makhana", img: "/product-04.avif" },
                            { name: "Whey Protein (20kg Bulk)", img: "/whey-protein-07.avif" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-white p-4 text-gray-900 rounded-2xl shadow-md hover:shadow-xl transition"
                            >
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    width={300}
                                    height={300}
                                    className="rounded-xl mb-4"
                                />
                                <h3 className="font-semibold text-lg text-center">
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