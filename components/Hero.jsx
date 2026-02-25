"use client"
import { Sliders } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Leaf, ShieldCheck, Heart, Dumbbell } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";





export const metadata = {
  title: "Premium Makhana & Protein Snacks | Nirvana Nuts",
  description: "Experience clean, premium makhana and protein-rich snacks crafted for mindful eating. Nirvana Nuts delivers freshness, flavor and quality across India."
}


const slides = [
  {
    heading: "Classic Salted Makhana",
    title: "Healthy Roasted Fox Nuts",
    description: "Enjoy the timeless taste of perfectly roasted classic salted makhana made from premium fox nuts. A healthy, low-calorie snack packed with protein and fiber — ideal for daily munching and guilt-free snacking across India.",
    image: "/Classic-Salted-Flavors.avif",
  },
  {
    heading: "Modern Savory Flavored Makhana",
    title: "Bold Taste, Healthy Choice",
    description: "Experience premium makhana infused with exciting savory flavors. Crafted for modern snack lovers, our flavored fox nuts deliver crunch, nutrition, and irresistible taste in every bite.",
    image: "/Modern Savory Flavors.avif",
  },
  {
    heading: "Sweet Gourmet Makhana",
    title: "Luxury Snacking Redefined",
    description: "Indulge in gourmet sweet makhana made from high-quality fox nuts. A perfect blend of sweetness and crunch, offering a nutritious alternative to traditional desserts and sugary snacks.",
    image: "/Sweet Gourmet Flavors.avif",
  },
  {
    heading: "Fusion Spicy Makhana",
    title: "Fiery Flavor,Healthy Crunch",
    description: "Turn up the heat with our fusion spicy makhana, made from farm-fresh fox nuts and bold Indian spices. A protein-packed, crunchy snack perfect for tea time and fitness-conscious consumers.",
    image: "/Fusion Spicy.avif",
  },
  {
    heading: "Bulk Whey Protein 20kg",
    title: "Pure, High-Quality Protein Powder",
    description: "Premium 20kg bulk whey protein designed for manufacturers, gyms, and supplement brands. Lab-tested, high-protein formula ideal for muscle growth, recovery, and private labeling across India.",
    image: "/whey.avif",
  },
];

const dryfruits = [
  {
    name: "Classic Salted Makhana",
    image: "/salted makhana.avif",
    alt: "classic makhana",
    link: "/makhana",
    color: "text-orange-500",
  },
  {
    name: "Modern Savory Makhana",
    image: "/modern savory flavors makhana.avif",
    alt: "modern makhana",
    link: "/makhana",
    color: "text-yellow-600",
  },
  {
    name: "Sweet Gourmet Makhana",
    image: "/sweet flavors makhana.avif",
    alt: "sweet makhana",
    link: "/category/pistachio",
    color: "text-green-600",
  },
  {
    name: "Fusion Spicy Makhana",
    image: "/Fusion.avif",
    alt: "fusion makhana",
    link: "/category/walnut",
    color: "text-amber-700",
  },

];

const faqs = [
  {
    question: "What is Nirvana Nuts Makhana?",
    answer:
      "Nirvana Nuts Makhana is a premium quality roasted fox nut snack made from carefully sourced lotus seeds. It is light, crunchy, protein-rich, and available in Classic Salted, Modern Savory, Sweet Gourmet, and Fusion Spicy flavors.",
  },
  {
    question: "Do you offer Bulk Whey Protein (20kg)?",
    answer:
      "Yes, we offer high-quality Bulk Whey Protein in 20kg packaging suitable for gyms, supplement brands, and bulk buyers. It contains high protein concentration, excellent mixability, and supports muscle growth and recovery.",
  },
  {
    question: "Is Nirvana Nuts Makhana healthy?",
    answer:
      "Absolutely. Makhana is low in calories, rich in protein, fiber, and antioxidants. It is gluten-free and ideal for weight management, heart health, and healthy snacking.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We typically deliver within 3–7 business days across India. Bulk orders may require 5–10 business days depending on quantity and location.",
  },
  {
    question: "Are your products natural and safe?",
    answer:
      "Yes. All Nirvana Nuts products are made with premium ingredients, hygienically processed, and quality tested to ensure safety and freshness.",
  },
];

const initialReviews = [

  {
    id: 1,
    name: "Shivam Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "Excellent customer service and top-notch products. Nirvana Nuts has become my go-to brand for healthy snacking.",
  },
  {
    id: 2,
    name: "Soniya Verma",
    location: "Meerut, India",
    rating: 4,
    text: "The hazelnuts were delicious and fresh. I appreciate the eco-friendly packaging. A little more discount on bulk orders would make it perfect.",
  },
  {
    id: 3,
    name: "Sandeep Singh",
    location: "Ghaziabad, India",
    rating: 5,
    text: "Nirvana nuts is the best for all item I buy almonds and really the almond is very delicious",
  },
  {
    id: 4,
    name: "Priya Mehta",
    location: "Noida, India",
    rating: 5,
    text: "Fusion Spicy makhana were fresh and crunchy. Nirvana Nuts never disappoints!",
  },
  {
    id: 5,
    name: "Arjun Malhotra",
    location: "Bengaluru, India",
    rating: 5,
    text: "The Modern Flavors makhana were perfectly crunchy and fresh. Nirvana Nuts is my trusted brand for healthy office snacks.",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    location: "Pune, India",
    rating: 4,
    text: "I loved the organic walnuts. The eco-friendly packaging is a big plus. Great choice for guilt-free snacking.",
  },
  {
    id: 7,
    name: "Rohit Agarwal",
    location: "Jaipur, India",
    rating: 5,
    text: "Premium makhana with amazing taste and quality. Nirvana Nuts delivers farm-fresh products every single time.",
  },
  {
    id: 8,
    name: "Meera Joshi",
    location: "Chennai, India",
    rating: 5,
    text: "The makhana was light, crunchy, and delicious. Perfect for evening snacks and family get-togethers.",
  },
  {
    id: 9,
    name: "Karan Singh",
    location: "Hyderabad, India",
    rating: 4,
    text: "Hazelnuts were fresh and packed with flavor. Nirvana Nuts is reliable for premium quality dry fruits.",
  },
  {
    id: 10,
    name: "Ananya Desai",
    location: "Ahmedabad, India",
    rating: 5,
    text: "I ordered salt makhana and they were simply amazing. Healthy, tasty, and delivered on time — highly recommended!",
  },
];





// image
const images = [
  "/new-image-01.avif",
  "/new-image-02.avif",
  "/new-image-03.avif",
  "/new-image-04.avif",
];
// our products
const products = [
  {
    name: "Classic Salted Makhana",
    description: "Lightly roasted with rock salt",
    //    price: "₹199",
    image: "/image-quality-01.avif",
    link: "/makhana"
  },
  {
    name: "Modern Savory Flavors makhana",
    description: "Bold, tangy, cheesy, spicy",
    //    price: "₹249",
    image: "/product-03.avif",
    link: "/makhana"
  },
  {
    name: "Sweet Gourmet Flavors makhana",
    description: "Rich, indulgent, dessert-style crunch",
    //    price: "₹299",
    image: "/product-04.avif",
    link: "/makhana"
  },
  {
    name: "Fusion Spicy makhana",
    description: "A healthy mix of nuts for every mood.",
    //    price: "₹349",
    image: "/about-image-04.webp",
    link: "/makhana"
  },
  {
    name: "Whey Protein",
    description: "High-quality protein for muscle support",
    //    price: "₹399",
    image: "/whey-protein-07.avif",
    link: "/whey-protein"
  },
];

const Hero = () => {

  // animation
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  //  home slider
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const [slider, setSlider] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);



  useEffect(() => {
    if (isHover) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isHover, images.length]);


  useEffect(() => {
    const timer = setInterval(() => {
      setSlider((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // review
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(1);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    setReviews(initialReviews);
  }, []);

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const maxIndex = reviews.length - cardsPerView;
  const totalDots = Math.ceil(reviews.length / cardsPerView)
  const slidePercentage = 100 / cardsPerView;

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews, cardsPerView]);

  if (reviews.length === 0) return null;


  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <section className="relative min-h-screen w-full bg-amber-50 flex flex-col ">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
      ${index === slider ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}`}
          >

            <div className="w-full max-w-360 mx-auto px-5 pt-32 md:pt-40 pb-20 h-full flex flex-col md:flex-row items-center">

              {/* LEFT CONTENT */}
              <div className="md:w-1/2 w-full flex flex-col">

                <h1 className="text-amber-600 w-fit text-sm p-1.5 mb-4 rounded-2xl bg-white/30">
                  Trusted Supplier Since 2020
                </h1>

                {/* Desktop Heading */}
                <div className="hidden md:block space-y-2 mb-6">
                  <h2 className="text-2xl md:text-[50px] leading-tight font-bold text-gray-900">
                    {slide.heading}
                  </h2>
                  <h2 className="text-lg md:text-[30px] font-bold text-amber-900">
                    {slide.title}
                  </h2>
                </div>

                {/* Mobile */}
                <div className="md:hidden block mb-6">
                  <h2 className="text-2xl mb-5 font-bold text-gray-900">
                    {slide.heading}
                    <span className="text-base ml-1 font-bold text-amber-900">
                      {slide.title}
                    </span>
                  </h2>

                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={500}
                    height={400}
                    priority
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                <p className="text-base leading-6 text-gray-600 mb-8 md:max-w-md">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-4 mb-5 md:mb-10">
                  <button className="bg-linear-to-r from-amber-600 to-amber-300 text-white px-5 py-2.5 rounded-xl transition hover:scale-105">
                    Explore Products
                  </button>

                  <button className="border-2 border-black text-gray-900 px-5 py-2 rounded-xl transition hover:bg-black hover:text-white hover:scale-105">
                    Contact us
                  </button>
                </div>

                <hr className="border-amber-200/50 md:mb-8" />

                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <h2 className="text-gray-900 text-2xl font-bold">100%</h2>
                    <p className="text-gray-500 text-xs">ORGANIC</p>
                  </div>
                  <div>
                    <h2 className="text-gray-900 text-2xl font-bold">70K</h2>
                    <p className="text-gray-500 text-xs">HAPPY CLIENT</p>
                  </div>
                  <div>
                    <h2 className="text-gray-900 text-2xl font-bold">20+</h2>
                    <p className="text-gray-500 text-xs">RECIPES</p>
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE (Desktop) */}
              <div className="hidden md:flex md:w-1/2 justify-center pl-10">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={600}
                  height={500}
                  className="w-full max-w-md h-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlider(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === slider
                  ? "bg-amber-600 scale-125"
                  : "bg-gray-300"
                }`}
            />
          ))}
        </div>

      </section>

      {/* product */}
      <section data-aos="fade-up" className="bg-amber-50 animate-fadeIn py-16">
        <div className="max-w-8xl mx-auto px-4">

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-14">
            Shop by Makhana
          </h2>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-4 gap-10 text-center">
            {dryfruits.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="group flex flex-col justify-between items-center transition-all duration-300"
              >
                {/* Image Circle */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4  transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>

                <p
                  className={`text-lg font-medium ${item.color} group-hover:underline transition-all duration-300`}
                >
                  {item.name}
                </p>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* product whey protein  */}

      <section className="relative bg-linear-to-r from-[#0F2F23] to-[#163D2F] text-white py-20 px-6 md:px-20 overflow-hidden">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Premium Bulk Whey Protein
              <span className="text-[#38B000]"> (20kg)</span>
            </h1>

            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              Nirvana Nuts offers high-quality Bulk Whey Protein in 20kg packaging —
              ideal for gyms, supplement brands, distributors, and fitness businesses.
              High protein concentration, excellent mixability, and superior muscle recovery support.
            </p>

            <ul className="space-y-3 text-gray-200 mb-8">
              <li>✔ High Protein Content</li>
              <li>✔ Fast Absorption Formula</li>
              <li>✔ Ideal for Bulk & Private Label</li>
              <li>✔ 20kg Commercial Packaging</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#38B000] hover:bg-[#2D6A4F] text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
              >
                Request Bulk Quote
              </Link>

              <Link
                href="/products"
                className="border border-white hover:bg-white hover:text-[#0F2F23] font-semibold px-8 py-3 rounded-lg transition duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <Image
              src="/whey-protein-05.avif"
              alt="Nirvana Nuts Bulk Whey Protein 20kg"
              height={200}
              width={200}
              className="w-full max-w-md mx-auto rounded-2xl shadow-amber-100 hover:scale-103 drop-shadow-2xl"
            />
          </div>

        </div>
      </section>


      {/* about us for website */}

      <section
        data-aos="fade-up"
        className="bg-stone-50 py-20 px-6 lg:px-20"
        aria-labelledby="heritage-heading"
      >
        <h2 className="md:text-5xl text-3xl italic tracking-widest text-amber-600 text-center font-bold uppercase mb-4">Our Story & Commitment</h2>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">


          {/* Left Image Section */}
          <div data-aos="fade-right" className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/product-welcome.avif"
                alt="Premium quality makhana and healthy ingredients by Nirvana Nuts"
                width={800}
                height={700}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-9 top-20 bg-white shadow-lg rounded-2xl px-3 py-4 text-center">
              <h3 className="text-2xl font-bold text-amber-600">6+</h3>
              <p className="text-[8px] w-15 tracking-widest text-gray-600 mt-1">
                YEARS OF PURITY
              </p>
            </div>
          </div>


          {/* Right Content Section */}
          <div data-aos="fade-left">
            <p  >

            </p>

            <h2
              id="heritage-heading"
              className="text-3xl lg:text-3xl font-semibold text-emerald-900 leading-tight"
            >
              Bridging the Gap Between{" "}
              <span className="italic text-amber-600">
                Traditional Nutrition
              </span>{" "}
              & Modern Performance
            </h2>

            <div className="w-32 h-0.5 bg-amber-200 my-6"></div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Nirvana Nuts was built on a simple belief — healthy snacking and
              performance nutrition should never compromise on quality. Rooted in
              India’s rich tradition of makhana and plant-based superfoods, we craft
              carefully roasted, protein-rich snacks for modern lifestyles.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Alongside our premium makhana range, we also supply high-quality
              whey protein in bulk 20kg packaging — ideal for gyms, supplement
              brands, and nutrition manufacturers seeking reliable performance
              nutrition solutions.
            </p>

            {/* Feature Points */}
            <div className="grid sm:grid-cols-2 gap-8 mb-10">

              <div>
                <h4 className="text-lg font-semibold text-emerald-900">
                  Ethical Makhana Sourcing
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  Our makhana is sourced directly from trusted farmers to ensure
                  premium quality, freshness, and sustainability.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-emerald-900">
                  20kg Bulk Whey Protein Supply
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  We provide lab-tested whey protein in 20kg bulk quantities,
                  suitable for fitness brands, supplement companies, and large-scale
                  distributors.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-emerald-900">
                  Purity Promise
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  Zero artificial preservatives, fillers, or harmful additives —
                  only clean, performance-driven nutrition.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-emerald-900">
                  Quality Assurance
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  Every batch undergoes strict quality testing to ensure safety,
                  consistency, and nutritional accuracy.
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-emerald-900 font-medium hover:text-amber-600 transition"
            >
              Discover Our Journey
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>


      {/* our commitment */}

      <section
        data-aos="fade-right"
        className="bg-linear-to-br from-emerald-950 via-green-900 to-emerald-950 text-stone-200 py-24 px-6 lg:px-20"
        aria-labelledby="nirvana-commitment-heading"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE CONTENT */}
          <div data-aos="fade-up">
            <p className="text-sm tracking-widest uppercase text-amber-400 mb-4">
              Our Commitment
            </p>

            <h2
              id="nirvana-commitment-heading"
              className="text-4xl lg:text-5xl font-semibold leading-tight mb-6"
            >
              The Gold Standard of{" "}
              <span className="italic text-amber-400">
                Clean Nutrition Excellence
              </span>
            </h2>

            <p className="text-stone-300 leading-relaxed mb-6">
              At Nirvana Nuts, we are committed to delivering premium makhana
              snacks and high-quality bulk whey protein that support modern,
              health-conscious lifestyles. Our philosophy blends traditional
              plant-based nutrition with advanced processing standards.
            </p>

            <p className="text-stone-300 leading-relaxed mb-10">
              From farm-sourced fox nuts (makhana) to 20kg bulk whey protein
              solutions for fitness brands and manufacturers, every product
              reflects our dedication to purity, performance, and transparency.
            </p>

            {/* STATS */}
            <div className="flex gap-16">
              <div>
                <h3 className="text-3xl font-bold text-amber-400">6+</h3>
                <p className="text-xs tracking-widest text-stone-400 mt-2">
                  YEARS OF TRUST
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-amber-400">100%</h3>
                <p className="text-xs tracking-widest text-stone-400 mt-2">
                  NATURAL & LAB TESTED
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="grid sm:grid-cols-2 gap-8">

            {/* Card 1 */}
            <div data-aos="fade-right" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition duration-300">
              <Leaf className="text-amber-400 mb-6" size={32} />
              <h4 className="text-xl font-semibold mb-4">
                Premium Makhana Sourcing
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                We source fox nuts directly from trusted farmers to ensure
                superior quality, freshness, and authentic nutrition in every
                roasted batch.
              </p>
            </div>

            {/* Card 2 */}
            <div data-aos="fade-left" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition duration-300">
              <Dumbbell className="text-amber-400 mb-6" size={32} />
              <h4 className="text-xl font-semibold mb-4">
                20kg Bulk Whey Protein Supply
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                High-quality whey protein available in 20kg bulk packaging,
                ideal for gyms, supplement brands, and nutrition manufacturers.
              </p>
            </div>

            {/* Card 3 */}
            <div data-aos="fade-right" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition duration-300">
              <Heart className="text-amber-400 mb-6" size={32} />
              <h4 className="text-xl font-semibold mb-4">
                Quality You Can Trust
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                Every batch undergoes strict quality checks to ensure purity,
                consistency, and nutritional accuracy.
              </p>
            </div>

            {/* Card 4 */}
            <div data-aos="fade-left" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition duration-300">
              <ShieldCheck className="text-amber-400 mb-6" size={32} />
              <h4 className="text-xl font-semibold mb-4">
                No Harmful Additives
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                No artificial preservatives, no unnecessary fillers — just clean,
                performance-driven nutrition.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-[#E9F5ED] py-16 px-4 md:px-20">
        <div className="max-w-4xl mx-auto">

          {/* SEO Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E5D3B] text-center mb-10">
            Frequently Asked Questions – Nirvana Nuts
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#C8E4D1] pb-4">

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-medium text-[#0F432C]">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-[#0F432C]">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 overflow-hidden ${activeIndex === index ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* about us */}
      <section className=" relative h-[60vh] overflow-hidden  md:h-80 text-center ">
        <div className='absolute inset-0 z-0'>
          <Image src="/image-slider-07.avif" alt='background makhana ' priority height={300} width={300} className='md:w-full w-full h-full object-fill' />
        </div>
        <div className="absolute inset-0 bg-black/50 "></div>
        {/* contact us */}
        <div className="relative z-10 py-8 px-6 m-15  text-center   ">
          <h2 className="text-3xl font-bold text-amber-400 "> For Any Query, Get in Touch with Nirvana Nuts </h2>
          <p className="text-gray-100 mb- max-w-xl mx-auto">
            Have questions about our products? We’d love to hear from you!
          </p>

          <a href="/contact">
            <button className="bg-linear-to-r from-amber-500 to-red-500 border-2  border-amber-400  focus:border-red-600 hover:scale-112 text-white mt-8  px-6 py-2 rounded-lg shadow-md  transition cursor-pointer">Contact Us</button>
          </a>
        </div>
      </section>

      {/* review section */}
      <section className=" bg-linear-to-r from-blue-50 to-grey-50 flex flex-col items-center  ">

        <h2 className="text-3xl font-bold my-10 text-amber-800 text-center">
          Customer Reviews & Testimonials Nirvana Nuts
        </h2>

        <div className="w-full max-w-7xl  mt-1 relative overflow-hidden perspective-distant">
          <div className="relative h-70 flex  justify-center items-center">
            {reviews.map((rev, index) => {
              let position = index - current;

              if (position < -1 || position > 1) return null

              return (
                <article
                  key={rev.id}
                  className="absolute w-75 md:w-1/2 lg:w-1/3 h-70
          bg-white shadow-xl rounded-xl p-6
          transition-all duration-700 ease-in-out "
                  style={{
                    transform: `
            translateX(${position * 320}px)
            scale(${position === 0 ? 1 : 0.85})
            rotateY(${position * -25}deg)
            
          `,

                    zIndex: position === 0 ? 20 : 10,
                    opacity: position === 0 ? 1 : 0.7,
                  }}
                >
                  <header >
                    <h2 className="text-2xl text-black font-semibold">{rev.name}</h2>
                    <p className="text-base text-black">{rev.location}</p>
                  </header>

                  <div className="text-yellow-500 my-2">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>

                  <p className="text-gray-700 text-lg">{rev.text}</p>
                </article>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1))
            }
            className="absolute left-2  bg-white hover:scale-110 top-1/2 -translate-y-1/2  text-gray-900 shadow p-1 rounded-full"
          >
            ❮
          </button>

          <button
            onClick={() =>
              setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
            }
            className="absolute  right-2 top-1/2 -translate-y-1/2 bg-white shadow p-1 text-gray-900 hover:scale-110 rounded-full"
          >
            ❯
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-20  mt-6">

          {Array.from({ length: totalDots }).map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index * cardsPerView)}
              className={`w-3 h-3 rounded-full cursor-pointer transition
          ${current >= index * cardsPerView &&
                  current < (index + 1) * cardsPerView ? "bg-amber-600" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </section>


    </div>
  )
}


export default Hero;
