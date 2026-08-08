"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ArrowRight, Leaf, ShieldCheck, Heart, Dumbbell, Star, Truck, Award, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "@/dynamicProductCard/ProductCard"
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";


const slides = [
  {
    heading: "Classic Salted Makhana",
    title: "Healthy Roasted Fox Nuts",
    description: "Buy makhana online in India with our classic salted fox nuts. A light, roasted healthy snack rich in protein, fiber, and antioxidants—perfect for guilt-free daily munching.",
    image: "/Classic-Salted-Flavors.avif",
    alt: "Classic Salted Makhana healthy roasted fox nuts snack India Nirvana Nuts"
  },
  {
    heading: "Modern Savory Flavored Makhana",
    title: "Bold Taste, Healthy Choice",
    description: "Shop flavored makhana online in India and enjoy crunchy fox nuts with modern savory spices. A nutritious snack option loaded with taste, low calories, and clean ingredients.",
    image: "/Modern Savory Flavors.avif",
    alt: "Modern Savory Flavored Makhana roasted fox nuts healthy snack option India"
  },
  {
    heading: "Sweet Gourmet Makhana",
    title: "Luxury Snacking Redefined",
    description: "Order premium sweet makhana online in India made from high-quality fox nuts. A delicious healthy snack alternative to sweets, combining natural flavor, crunch, and nutrition.",
    image: "/Sweet Gourmet Flavors.avif",
    alt: "Premium Sweet Gourmet Makhana healthy premium fox nuts dessert variant"
  },
  {
    heading: "Fusion Spicy Makhana",
    title: "Fiery Flavor, Healthy Crunch",
    description: "Discover spicy makhana online in India crafted with bold Indian flavors. These roasted fox nuts are a protein-rich healthy snack, ideal for tea-time cravings and fitness diets.",
    image: "/Fusion Spicy.avif",
    alt: "Fusion Spicy Makhana spicy roasted fox nuts healthy protein rich snack"
  },
  {
    heading: "Bulk Whey Protein 20kg",
    title: "Pure, High-Quality Protein Powder",
    description: "Buy whey protein in bulk online in India with premium quality assurance. Ideal for gyms and brands, this high-protein supplement supports muscle growth, recovery, and performance.",
    image: "/whey.avif",
    alt: "Bulk Whey Protein 20kg commercial packaging muscle growth fitness gym supplement supplier India"
  }
];

const dryfruits = [
  {
    name: "Classic Salted Makhana",
    image: "/salted makhana.avif",
    alt: "Classic salted makhana healthy roasted fox nuts snack India",
    link: "/plain-makhana",
    color: "text-amber-700",
    badge: "Bestseller",
  },
  {
    name: "Modern Savory Makhana",
    image: "/modern savory flavors makhana.avif",
    alt: "Modern savory makhana flavored fox nuts healthy snack India",
    link: "/modern-makhana",
    color: "text-amber-800",
    badge: "Popular",
  },
  {
    name: "Sweet Gourmet Makhana",
    image: "/sweet flavors makhana.avif",
    alt: "Sweet gourmet makhana healthy fox nuts dessert snack India",
    link: "/sweet-makhana",
    color: "text-amber-600",
    badge: "New",
  },
  {
    name: "Fusion Spicy Makhana",
    image: "/Fusion.avif",
    alt: "Fusion spicy makhana masala fox nuts healthy snack India",
    link: "/fusion-makhana",
    color: "text-red-700",
    badge: "Hot",
  },
];

const faqs = [
  {
    question: "What is Nirvana Nuts Makhana?",
    answer: "Nirvana Nuts Makhana is a premium quality roasted fox nut snack made from carefully sourced lotus seeds. It is light, crunchy, protein-rich, and available in Classic Salted, Modern Savory, Sweet Gourmet, and Fusion Spicy flavors.",
  },
  {
    question: "Do you offer Bulk Whey Protein (20kg)?",
    answer: "Yes, we offer high-quality Bulk Whey Protein in 20kg packaging suitable for gyms, supplement brands, and bulk buyers. It contains high protein concentration, excellent mixability, and supports muscle growth and recovery.",
  },
  {
    question: "What are the benefits of makhana?",
    answer: "Makhana is rich in protein, fiber, and antioxidants. It helps in weight loss, improves heart health, and is a perfect healthy snack."
  },
  {
    question: "Where to buy makhana online in India?",
    answer: "You can buy premium makhana online in India from Nirvana Nuts with multiple flavors and fast delivery."
  },
  {
    question: "Is Nirvana Nuts Makhana healthy?",
    answer: "Absolutely. Makhana is low in calories, rich in protein, fiber, and antioxidants. It is gluten-free and ideal for weight management, heart health, and healthy snacking.",
  },
  {
    question: "How long does delivery take?",
    answer: "We typically deliver within 3–7 business days across India. Bulk orders may require 5–10 business days depending on quantity and location.",
  },
  {
    question: "Are your products natural and safe?",
    answer: "Yes. All Nirvana Nuts products are made with premium ingredients, hygienically processed, and quality tested to ensure safety and freshness.",
  },
];

const initialReviews = [
  { id: 1, name: "Shivam Sharma", location: "Delhi, India", rating: 5, text: "Excellent customer service and top-notch products. Nirvana Nuts has become my go-to brand for healthy snacking." },
  { id: 2, name: "Soniya Verma", location: "Meerut, India", rating: 4, text: "The Classic Salted Makhana were delicious and fresh. A little more discount on bulk orders would make it perfect." },
  { id: 3, name: "Sandeep Singh", location: "Ghaziabad, India", rating: 5, text: "Nirvana Nuts is the best! I buy their makhana regularly and the quality is always top-notch — very delicious." },
  { id: 4, name: "Priya Mehta", location: "Noida, India", rating: 5, text: "Fusion Spicy makhana were fresh and crunchy. Nirvana Nuts never disappoints!" },
  { id: 5, name: "Arjun Malhotra", location: "Bengaluru, India", rating: 5, text: "The Modern Savory Flavors makhana were perfectly crunchy and fresh. Nirvana Nuts is my trusted brand for healthy office snacks." },
  { id: 6, name: "Neha Kapoor", location: "Pune, India", rating: 4, text: "I loved the Sweet Gourmet Makhana. Great flavors and guilt-free snacking — will definitely order again!" },
  { id: 7, name: "Rohit Agarwal", location: "Jaipur, India", rating: 5, text: "Premium makhana with amazing taste and quality. Nirvana Nuts delivers farm-fresh products every single time." },
  { id: 8, name: "Meera Joshi", location: "Chennai, India", rating: 5, text: "The makhana was light, crunchy, and delicious. Perfect for evening snacks and family get-togethers." },
  { id: 9, name: "Karan Singh", location: "Hyderabad, India", rating: 4, text: "Fusion Spicy Makhana were fresh and packed with flavor. Nirvana Nuts is reliable for premium quality healthy snacks." },
  { id: 10, name: "Ananya Desai", location: "Ahmedabad, India", rating: 5, text: "I ordered Classic Salted makhana and they were simply amazing. Healthy, tasty, and delivered on time — highly recommended!" },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹499" },
  { icon: Leaf, title: "100% Natural", subtitle: "No artificial additives" },
  { icon: Award, title: "Premium Quality", subtitle: "Lab tested & certified" },
  { icon: Lock, title: "Secure Checkout", subtitle: "Safe & encrypted" },
];


const Hero = () => {
  const [slider, setSlider] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlider((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    setReviews(initialReviews);
    
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
  const totalDots = Math.ceil(reviews.length / cardsPerView);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews, cardsPerView, maxIndex]);

  return (
    <div className='min-h-screen w-full bg-[#FFFCF7] text-neutral-800 antialiased mt-16 xs:mt-20 overflow-hidden'>
      <h1 className="sr-only">Nirvana Nuts - Premium Flavored Makhana & Bulk Whey Protein Supplier India</h1>

      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO BANNER
          ═══════════════════════════════════════════════ */}
      <section className="relative w-full bg-warm-gradient overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative w-full min-h-[calc(100vh-4rem)] xs:min-h-[calc(100vh-5rem)] lg:min-h-[80vh] xl:min-h-[70vh] 2xl:min-h-[80vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === slider ? "opacity-100 z-10 translate-x-0" : "opacity-0 pointer-events-none translate-x-8"}`}
            >
              <div className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-4 py-8 xs:py-10 sm:py-12 lg:py-16 xl:py-12 2xl:py-16 h-full flex flex-col lg:flex-row items-center gap-6 lg:gap-10 xl:gap-16">
                
                {/* Left: Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center" data-aos="fade-right">
                  <span className="inline-flex items-center gap-1.5 text-amber-800 tracking-wider uppercase text-[9px] xs:text-[10px] sm:text-xs px-3 py-1 sm:py-1.5 mb-4 sm:mb-5 rounded-full bg-amber-100/80 font-bold backdrop-blur-xs w-fit border border-amber-200/50">
                    <Leaf size={12} className="text-amber-600" />
                    Premium Since 2020
                  </span>

                  {/* Desktop heading */}
                  <div className="hidden lg:block space-y-2 mb-5">
                    <h2 className="text-2xl xl:text-3xl 2xl:text-4xl tracking-tight leading-tight font-extrabold text-neutral-900">
                      {slide.heading}
                    </h2>
                    <p className="text-lg xl:text-xl 2xl:text-2xl font-semibold tracking-wide text-gradient-amber">
                      {slide.title}
                    </p>
                  </div>

                  {/* Mobile heading + image */}
                  <div className="lg:hidden block w-full mb-4 md:mb-3">
                    <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                      {slide.heading}
                      <span className="text-xs xs:text-sm sm:text-base tracking-wide font-semibold text-gradient-amber block mt-1.5">
                        {slide.title}
                      </span>
                    </h2> 

                    <div className="relative w-full h-40 xs:h-44 sm:h-48 md:h-56 my-4 animate-float">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 320px) 280px, (max-width: 375px) 330px, (max-width: 425px) 380px, (max-width: 768px) 700px, 50vw"
                        className="object-contain object-center drop-shadow-lg"
                      />
                    </div>
                    
                    <div className='flex justify-center my-3'>
                      <div className="flex gap-2 z-30">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSlider(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-1.5 transition-all duration-500 rounded-full ${idx === slider ? "bg-amber-700 w-7 xs:w-8" : "bg-neutral-300/60 w-2 hover:bg-neutral-400"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs xs:text-sm sm:text-base xl:text-lg text-neutral-600 mb-5 2xl:mb-8 sm:mb-7 lg:max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 xs:gap-3.5 sm:gap-4 mb-7 sm:mb-4 2xl:mb-10">
                    <Link href="/products" className="group bg-amber-800 hover:bg-amber-900 text-xs xs:text-sm font-bold tracking-wider uppercase text-white px-5 py-2.5 xs:px-6 xs:py-3 sm:px-7 sm:py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl animate-pulse-glow inline-flex items-center gap-2">
                      Shop Now
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link href="/contact" className="border-2 border-neutral-300 text-xs xs:text-sm font-bold tracking-wider uppercase text-neutral-800 px-5 py-2.5 xs:px-6 xs:py-3 sm:px-7 sm:py-3.5 rounded-xl transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900">
                      Contact Us
                    </Link>
                  </div>

                  <hr className="hidden lg:block border-neutral-200/60 mb-6 xl:mt-2 2xl:mb-8" />

                  {/* Stats row */}
                  <div className="flex gap-6 xs:gap-8 sm:gap-10 md:gap-14">
                    <div className="text-center">
                      <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-amber-800 tracking-tight">100%</p>
                      <p className="text-neutral-400 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest font-bold mt-0.5 uppercase">Organic</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-amber-800 tracking-tight">70K+</p>
                      <p className="text-neutral-400 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest font-bold mt-0.5 uppercase">Happy Clients</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-amber-800 tracking-tight">20+</p>
                      <p className="text-neutral-400 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest font-bold mt-0.5 uppercase">Flavors</p>
                    </div>
                  </div>
                </div>

                {/* Right: Product Image (Desktop only) */}
                <div className="hidden lg:flex lg:w-1/2 justify-center relative h-[300px] xl:h-[400px] 2xl:h-[480px] animate-float-slow" data-aos="fade-left" data-aos-delay="200">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 50vw"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop slider dots */}
        <div className='hidden lg:block'>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlider(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 transition-all duration-500 rounded-full ${idx === slider ? "bg-amber-700 w-10 shadow-md" : "bg-neutral-300/50 w-2.5 hover:bg-neutral-400"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BADGES BAR
          ═══════════════════════════════════════════════ */}
      <section className="bg-white border-y border-neutral-100 py-4 xs:py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6" data-aos="fade-up">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2.5 xs:gap-3 justify-center lg:justify-start">
                <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 border border-amber-100/60 flex items-center justify-center shrink-0">
                  <badge.icon size={18} className="text-amber-700" />
                </div>
                <div>
                  <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-neutral-900 leading-tight">{badge.title}</p>
                  <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-400 font-medium">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: SHOP BY CATEGORY
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="bg-[#FFFCF7] py-10 xs:py-12 sm:py-14 lg:py-16 xl:py-20 2xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12">
            <span className="inline-block text-amber-700 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-2 xs:mb-3">Our Collection</span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3">
              Shop by Makhana Variety
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              Explore a wide range of flavored makhana including salted, spicy, and sweet fox nuts. Healthy, crunchy, and perfect for guilt-free snacking.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 text-center">
            {dryfruits.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="group relative card-hover-lift flex flex-col items-center bg-white p-4 xs:p-5 sm:p-6 lg:p-8 rounded-2xl border border-neutral-100 hover:border-amber-200/60 shadow-sm hover:shadow-lg"
              >
                {/* Badge */}
                <span className="absolute top-3 right-3 text-[8px] xs:text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/50">
                  {item.badge}
                </span>

                <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 425px) 45vw, (max-width: 1024px) 22vw, 25vw"
                    className="object-contain object-center rounded-2xl"
                  />
                </div>
                <h3 className={`text-xs xs:text-sm sm:text-base font-bold tracking-wide ${item.color} transition-all`}>
                  {item.name}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs text-neutral-400 font-medium group-hover:text-amber-700 transition-colors">
                  Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: FEATURED PRODUCTS
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="py-10 xs:py-12 sm:py-14 lg:py-16 xl:py-20 2xl:py-24 px-4 xs:px-5 sm:px-6 bg-gradient-to-b from-[#FFFCF7] via-white to-[#FFFCF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12">
            <span className="inline-block text-amber-700 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-2 xs:mb-3">Handpicked For You</span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3">
              Premium Makhana at Best Price
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base leading-relaxed">
              Nirvana Nuts offers high-quality fox nuts snacks rich in protein and fiber. Crafted for premium lifestyles.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xs:gap-6 lg:gap-8 xl:gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-[550px] animate-pulse border border-neutral-100">
                  <div className="h-56 bg-neutral-100 rounded-t-2xl"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-neutral-100 rounded-lg w-3/4"></div>
                    <div className="h-3 bg-neutral-50 rounded-lg w-full"></div>
                    <div className="h-3 bg-neutral-50 rounded-lg w-2/3"></div>
                    <div className="h-10 bg-neutral-100 rounded-xl w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xs:gap-6 lg:gap-8 xl:gap-10">
              {Array.isArray(products) && products.filter(Boolean).map((product, index) => (
                <div 
                  key={product.docId} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  className="transition-all duration-400 hover:-translate-y-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 xs:mt-12 sm:mt-14" data-aos="fade-up">
            <Link href="/products" className="group inline-flex items-center gap-2 bg-neutral-900 hover:bg-amber-800 text-white text-xs xs:text-sm font-bold tracking-wider uppercase px-7 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl">
              View All Products
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: WHEY PROTEIN PROMO
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="relative bg-gradient-to-br from-[#0B1F17] via-[#11261f] to-[#0D2318] text-stone-100 py-10 xs:py-12 sm:py-14 lg:py-16 xl:py-20 2xl:py-24 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-20 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 xl:gap-20 items-center relative z-10">
          <div data-aos="fade-right">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-[0.2em] text-[9px] xs:text-[10px] sm:text-xs mb-3 xs:mb-4 border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/10">
              <Dumbbell size={12} />
              Commercial Tier
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight mb-4 xs:mb-5">
              Bulk Whey Protein <span className="text-emerald-400">20kg</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-stone-300 mb-5 xs:mb-7 leading-relaxed max-w-xl">
              Buy bulk whey protein in India with high protein content. Ideal for gyms, supplement brands, and fitness businesses looking for reliable whey protein suppliers.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-3.5 sm:gap-4 text-stone-300 mb-6 xs:mb-8 sm:mb-10 text-xs xs:text-sm sm:text-base">
              <li className="flex items-center gap-2 xs:gap-2.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-lg">✔</span> High Protein Content
              </li>
              <li className="flex items-center gap-2 xs:gap-2.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-lg">✔</span> Fast Absorption Formula
              </li>
              <li className="flex items-center gap-2 xs:gap-2.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-lg">✔</span> Ideal for Bulk & Private Label
              </li>
              <li className="flex items-center gap-2 xs:gap-2.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-lg">✔</span> 20kg Commercial Packaging
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 xs:gap-4">
              <Link href="/contact" className="group bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-3 xs:px-6 xs:py-3.5 sm:px-7 sm:py-4 rounded-xl transition-all duration-300 text-xs xs:text-sm tracking-wider uppercase inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                Request Bulk Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/products" className="border-2 border-stone-500 hover:border-stone-100 text-stone-200 hover:text-white font-bold px-5 py-3 xs:px-6 xs:py-3.5 sm:px-7 sm:py-4 rounded-xl transition-all duration-300 text-xs xs:text-sm tracking-wider uppercase">
                View All Products
              </Link>
            </div>
          </div>
          <div className="relative h-[220px] xs:h-[260px] sm:h-[300px] lg:h-[380px] xl:h-[440px] w-full flex justify-center animate-float-delay" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/whey-protein-05.avif"
              alt="Bulk whey protein 20kg India high protein powder muscle growth gym supplement Nirvana Nuts"
              fill
              sizes="(max-width: 425px) 90vw, (max-width: 768px) 45vw, 50vw"
              className="object-contain object-center drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: ABOUT / STORY
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="bg-white py-10 xs:py-12 sm:py-14 lg:py-16 xl:py-20 2xl:py-24 px-4 xs:px-5 sm:px-6 lg:px-10 xl:px-12 2xl:px-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 xl:gap-20 items-center">
          <div className="relative h-[240px] xs:h-[280px] sm:h-[320px] lg:h-[440px] xl:h-[500px] 2xl:h-[540px] w-full" data-aos="fade-right">
            <div className="rounded-3xl overflow-hidden shadow-lg h-full w-full relative border border-neutral-100">
              <Image
                src="/product-welcome.avif"
                alt="Premium makhana fox nuts healthy snacks India natural roasted Nirvana Nuts"
                fill
                sizes="(max-width: 1024px) 95vw, 50vw"
                className="object-fill object-center"
              />
            </div>
            <div className="absolute -right-2 xs:-right-3 top-8 xs:top-10 sm:top-12 lg:top-14 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-3 py-2.5 xs:px-4 xs:py-3 sm:px-5 sm:py-4 text-center z-20 border border-amber-100/60" data-aos="zoom-in" data-aos-delay="400">
              <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-amber-800">6+</p>
              <p className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-widest text-neutral-500 mt-0.5 font-bold uppercase">
                Years of Purity
              </p>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="200">
            <span className="inline-block text-amber-700 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-2 xs:mb-3">Our Story</span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Bridging <span className="italic font-normal text-gradient-amber">Traditional Nutrition</span> & Modern Performance
            </h2>
            <div className="w-16 xs:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 my-4 xs:my-5 sm:my-6 rounded-full"></div>
            <p className="text-neutral-600 leading-relaxed text-xs xs:text-sm sm:text-base mb-5 sm:mb-7">
              Nirvana Nuts was built on a simple belief — healthy snacking and performance nutrition should never compromise on quality. Rooted in India's rich tradition of makhana and plant-based superfoods, we craft carefully roasted, protein-rich snacks for modern lifestyles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 text-xs xs:text-sm sm:text-base mb-6">
              <div className="bg-amber-50/60 rounded-xl p-3 xs:p-4 border border-amber-100/50" data-aos="fade-up" data-aos-delay="100">
                <h3 className="font-bold text-neutral-900 mb-1">Ethical Makhana Sourcing</h3>
                <p className="text-neutral-500 text-[10px] xs:text-[11px] sm:text-xs leading-relaxed">Our makhana is sourced directly from trusted farmers to ensure premium quality, freshness, and sustainability.</p>
              </div>
              <div className="bg-amber-50/60 rounded-xl p-3 xs:p-4 border border-amber-100/50" data-aos="fade-up" data-aos-delay="200">
                <h3 className="font-bold text-neutral-900 mb-1">20kg Bulk Protein Supply</h3>
                <p className="text-neutral-500 text-[10px] xs:text-[11px] sm:text-xs leading-relaxed">We provide lab-tested whey protein in 20kg bulk quantities, suitable for fitness brands and distributors.</p>
              </div>
              <div className="bg-amber-50/60 rounded-xl p-3 xs:p-4 border border-amber-100/50" data-aos="fade-up" data-aos-delay="300">
                <h3 className="font-bold text-neutral-900 mb-1">Purity Promise</h3>
                <p className="text-neutral-500 text-[10px] xs:text-[11px] sm:text-xs leading-relaxed">Zero artificial preservatives, fillers, or harmful additives — only clean, nutrition.</p>
              </div>
              <div className="bg-amber-50/60 rounded-xl p-3 xs:p-4 border border-amber-100/50" data-aos="fade-up" data-aos-delay="400">
                <h3 className="font-bold text-neutral-900 mb-1">Quality Assurance</h3>
                <p className="text-neutral-500 text-[10px] xs:text-[11px] sm:text-xs leading-relaxed">Every batch undergoes strict quality testing to ensure safety, consistency, and nutritional accuracy.</p>
              </div>
            </div>

            <Link href="/about" className="group inline-flex items-center gap-2 text-amber-800 font-bold hover:opacity-80 transition text-xs xs:text-sm sm:text-base">
              Discover Our Journey <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6: WHY CHOOSE US
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="bg-neutral-950 text-neutral-100 py-10 xs:py-12 sm:py-14 lg:py-16 xl:py-20 2xl:py-24 px-4 xs:px-5 sm:px-6 lg:px-10 xl:px-12 2xl:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 xl:gap-20 items-center">
          <div data-aos="fade-right">
            <span className="inline-block text-amber-400 font-bold uppercase tracking-[0.2em] text-[9px] xs:text-[10px] sm:text-xs mb-2 xs:mb-3">Our Commitment</span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight mb-4 xs:mb-5">
              The Gold Standard of <span className="italic font-normal text-amber-400">Clean Nutrition</span>
            </h2>
            <p className="text-neutral-400 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-7">
              At Nirvana Nuts, we are committed to delivering premium makhana snacks and high-quality bulk whey protein that support modern, health-conscious lifestyles. Our philosophy blends traditional plant-based nutrition with advanced processing standards.
            </p>
            <div className="flex gap-8 xs:gap-10 sm:gap-14 mt-4">
              <div>
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">6+</p>
                <p className="text-[8px] xs:text-[9px] tracking-widest text-neutral-500 mt-0.5 font-bold uppercase">Years of Trust</p>
              </div>
              <div>
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">100%</p>
                <p className="text-[8px] xs:text-[9px] tracking-widest text-neutral-500 mt-0.5 font-bold uppercase">Natural & Lab Tested</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-5" data-aos="fade-left" data-aos-delay="200">
            {[
              { icon: Leaf, title: "Premium Makhana", desc: "We source fox nuts directly from trusted farmers to ensure superior quality, freshness, and authentic nutrition." },
              { icon: Dumbbell, title: "20kg Bulk Protein", desc: "High-quality whey protein available in 20kg bulk packaging, ideal for gyms, supplement brands, and fitness entities." },
              { icon: Heart, title: "Quality & Trust", desc: "Every batch undergoes strict quality checks to ensure purity, consistency, and nutritional accuracy." },
              { icon: ShieldCheck, title: "No Harmful Additives", desc: "No artificial preservatives, no unnecessary fillers — just clean, performance-driven nutrition." },
            ].map((card, i) => (
              <div key={i} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 xs:p-5 sm:p-6 hover:border-amber-400/40 transition-all duration-300 group hover:bg-neutral-900">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center mb-3 group-hover:bg-amber-400/20 transition-colors">
                  <card.icon className="text-amber-400" size={20} />
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg font-bold mb-1.5">{card.title}</h3>
                <p className="text-neutral-400 text-[10px] xs:text-[11px] sm:text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7: FAQ
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="bg-[#FAFBF9] py-10 xs:py-12 sm:py-16 lg:py-20 xl:py-24 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-20 border-b border-neutral-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12">
            <span className="inline-block text-amber-700 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-2 xs:mb-3">Got Questions?</span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 xs:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                data-aos="fade-up"
                data-aos-delay={index * 60}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-amber-200 shadow-md shadow-amber-100/30' : 'border-neutral-200/60 hover:border-neutral-300'}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-5 py-4 xs:px-6 xs:py-5 focus:outline-hidden cursor-pointer"
                  aria-expanded={activeIndex === index}
                >
                  <span className="text-sm xs:text-base font-bold text-neutral-900 pr-4">{faq.question}</span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 text-sm font-medium ${activeIndex === index ? 'bg-amber-100 text-amber-800 rotate-45' : 'bg-neutral-100 text-neutral-500'}`}>+</span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? "max-h-[300px] border-t border-neutral-100" : "max-h-0"}`}>
                  <p className="text-neutral-600 text-xs xs:text-sm sm:text-base p-5 xs:p-6 leading-relaxed bg-amber-50/30">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8: CTA BANNER
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] text-center flex items-center justify-center overflow-hidden">
        <div className='absolute inset-0 z-0 w-full h-full'>
          <Image
            src="/image-slider-07.avif"
            alt="Healthy makhana fox nuts background India Nirvana Nuts"
            fill
            sizes="100vw"
            className='object-cover object-center'
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/60 to-neutral-950/80 z-10"></div>
        <div className="relative z-20 py-8 px-4 xs:px-5 sm:px-6 max-w-3xl mx-auto text-center" data-aos="zoom-in">
          <span className="inline-block text-amber-400 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-3 xs:mb-4">Get In Touch</span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Ready to Elevate Your Snacking?
          </h2>
          <p className="text-neutral-200 text-xs xs:text-sm sm:text-base mt-3 max-w-lg mx-auto leading-relaxed">
            Have questions about our products or bulk requirements? We'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-3 xs:gap-4 mt-7 xs:mt-8">
            <Link href="/products" className="group bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs xs:text-sm font-bold tracking-wider uppercase px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 hover:scale-105">
              Shop Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white text-xs xs:text-sm font-bold tracking-wider uppercase px-6 py-3.5 rounded-xl shadow-sm transition-all hover:scale-105">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 9: CUSTOMER REVIEWS
          ═══════════════════════════════════════════════ */}
      <section data-aos="fade-up" className="bg-gradient-to-b from-amber-50 to-[#FFFBF5] py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28 flex flex-col items-center border-t border-neutral-200/40 overflow-hidden">
        <div className="max-w-7xl w-full px-4 xs:px-5 sm:px-6 flex flex-col items-center">
          <span className="inline-block text-amber-700 font-bold uppercase tracking-[0.2em] text-[10px] xs:text-[11px] sm:text-xs mb-2 xs:mb-3">Testimonials</span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center text-neutral-900 mb-2 leading-tight">
            Loved by 70K+ Customers
          </h2>
          <p className="text-center text-neutral-500 text-xs xs:text-sm sm:text-base mb-8 xs:mb-10 sm:mb-14 md:mb-16">See why thousands trust Nirvana Nuts for premium quality snacks.</p>

          {reviews.length > 0 && (
            <div className="w-full relative overflow-hidden perspective-distant min-h-[380px] xs:min-h-[360px] sm:min-h-[340px] md:min-h-[320px] flex items-center justify-center" data-aos="zoom-in-up" data-aos-delay="100">
              <div className="relative w-full max-w-4xl h-80 xs:h-76 sm:h-72 flex justify-center items-center">
                {reviews.map((rev, index) => {
                  let position = index - current;
                  if (position < -1 || position > 1) return null;

                  const offsetWidth = typeof window !== 'undefined'
                    ? (window.innerWidth < 320
                        ? 240
                        : window.innerWidth < 375
                          ? 280
                          : window.innerWidth < 425
                            ? 330
                            : window.innerWidth < 768
                              ? 380
                              : 440)
                    : 440;

                  return (
                    <article
                      key={rev.id}
                      className="absolute bg-white w-[240px] xs:w-[270px] sm:w-[320px] md:w-[380px] lg:w-[440px] xl:w-[480px] border border-neutral-200/60 shadow-lg rounded-2xl p-5 xs:p-6 sm:p-7 md:p-8 transition-all duration-700 ease-in-out flex flex-col justify-between"
                      style={{
                        transform: `
                          translateX(${position * offsetWidth}px)
                          scale(${position === 0 ? 1 : 0.82})
                          rotateY(${position * -12}deg)
                        `,
                        zIndex: position === 0 ? 20 : 10,
                        opacity: position === 0 ? 1 : 0.3,
                      }}
                    >
                      <div>
                        <header className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm xs:text-base shadow-md">
                              {rev.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-neutral-900 tracking-tight">{rev.name}</h3>
                              <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-400 mt-0.5">{rev.location}</p>
                            </div>
                          </div>
                          <div className="text-amber-500 text-xs xs:text-sm sm:text-base tracking-xs flex" aria-label={`Rated ${rev.rating} out of 5 stars`}>
                            {"★".repeat(rev.rating)}
                            {"☆".repeat(5 - rev.rating)}
                          </div>
                        </header>
                        <p className="text-neutral-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm leading-relaxed mt-3 xs:mt-4 sm:mt-5 italic">"{rev.text}"</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1))}
                aria-label="Previous review"
                className="absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 hover:bg-amber-50 text-neutral-800 shadow-md w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer z-30 transition-all hover:border-amber-300"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))}
                aria-label="Next review"
                className="absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 hover:bg-amber-50 text-neutral-800 shadow-md w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer z-30 transition-all hover:border-amber-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          <div className="flex gap-1.5 xs:gap-2 sm:gap-2.5 mt-8 xs:mt-10 sm:mt-14">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index * cardsPerView)}
                aria-label={`Go to reviews page ${index + 1}`}
                className={`h-1.5 sm:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  current >= index * cardsPerView && current < (index + 1) * cardsPerView 
                    ? "bg-amber-700 w-5 xs:w-6 sm:w-7 shadow-sm" 
                    : "bg-neutral-300/60 w-1.5 xs:w-2 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Hero;