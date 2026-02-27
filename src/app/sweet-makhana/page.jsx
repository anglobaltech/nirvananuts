"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Candy, Heart, ShieldCheck, Gift } from "lucide-react";

// export const metadata = {
//     title: "Sweet Gourmet Makhana | Premium Flavored Fox Nuts | Nirvana Nuts",
//     description:
//         "Indulge in Sweet Gourmet Makhana from Nirvana Nuts. Lightly roasted fox nuts coated with premium sweet flavors. Perfect for gifting and healthy snacking.",
//     keywords:
//         "Sweet Makhana, Gourmet Makhana, Flavored Fox Nuts, Healthy Sweet Snacks, Nirvana Nuts, Bulk Makhana",
// };

const page= () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="bg-rose-50">

            {/* HERO SECTION */}
            <section className="max-w-7xl mt-15 mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

                <div data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6">
                        Sweet Gourmet Makhana
                    </h1>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Experience indulgence with Nirvana Nuts Sweet Gourmet Makhana.
                        Lightly roasted fox nuts coated with rich, premium sweet flavors —
                        offering the perfect balance of taste and health.
                    </p>

                    <div className="flex gap-4">
                        <Link href="/contact">
                            <button className="bg-rose-600 text-white px-6 py-3 rounded-xl hover:bg-rose-700 transition">
                                Bulk Inquiry
                            </button>
                        </Link>
                        <Link href="/shop">
                            <button className="border border-rose-600 text-rose-600 px-6 py-3 rounded-xl hover:bg-rose-100 transition">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>

                <div data-aos="fade-left">
                    <Image
                        src="/product-04.avif"
                        alt="Sweet Gourmet Makhana Nirvana Nuts"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-xl"
                    />
                </div>
            </section>


            {/* FEATURES SECTION */}
            <section className="bg-pink-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold text-rose-600 mb-12">
                        Why Choose Sweet Gourmet Makhana?
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md">
                            <Candy className="mx-auto text-rose-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Premium Sweet Coating</h3>
                            <p className="text-sm text-gray-600">Delicious gourmet flavors.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="100" className="bg-white p-6 rounded-2xl shadow-md">
                            <Heart className="mx-auto text-rose-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Healthy Indulgence</h3>
                            <p className="text-sm text-gray-600">Low fat & high nutrition.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-6 rounded-2xl shadow-md">
                            <ShieldCheck className="mx-auto text-rose-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Hygienic Packaging</h3>
                            <p className="text-sm text-gray-600">Sealed for freshness.</p>
                        </div>

                        <div data-aos="zoom-in" data-aos-delay="300" className="bg-white p-6 rounded-2xl shadow-md">
                            <Gift className="mx-auto text-rose-600 mb-4" size={40} />
                            <h3 className="font-semibold text-amber-500 mb-2">Perfect for Gifting</h3>
                            <p className="text-sm text-gray-600">Premium festive packaging.</p>
                        </div>

                    </div>
                </div>
            </section>


            {/* PRODUCT DETAILS */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

                <div data-aos="fade-up">
                    <Image
                        src="/Sweet Gourmet Flavors.avif"
                        alt="Sweet Flavored Makhana"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-md"
                    />
                </div>

                <div data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-3xl font-bold text-rose-600 mb-6">
                        Product Specifications
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Flavor: Sweet Gourmet Blend</li>
                        <li>✔ Packaging: 100g, 250g, 500g, 1kg</li>
                        <li>✔ Bulk Supply Available</li>
                        <li>✔ Shelf Life: 9–12 Months</li>
                        <li>✔ Storage: Cool & Dry Place</li>
                    </ul>

                    <Link href="/contact">
                        <button className="mt-6 bg-rose-600 text-white px-6 py-3 rounded-xl hover:bg-rose-700 transition">
                            Request Bulk Quote
                        </button>
                    </Link>
                </div>

            </section>


            {/* OTHER PRODUCTS SECTION */}
            <section className="bg-rose-100 py-16">
                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center text-rose-600 mb-12">
                        Explore More Products
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        {[
                            { name: "Classic Plain Makhana", img: "/image-quality-01.avif" },
                            { name: "Modern Makhana", img: "/product-02.avif" },
                            { name: "Fusion Makhana", img: "/product-04.avif" },
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