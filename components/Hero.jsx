"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ArrowRight, Leaf, ShieldCheck, Heart, Dumbbell } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "@/dynamicProductCard/ProductCard"
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"
import { calculateDiscount } from "@/utils/discount";

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
  },
  {
    name: "Modern Savory Makhana",
    image: "/modern savory flavors makhana.avif",
    alt: "Modern savory makhana flavored fox nuts healthy snack India",
    link: "/modern-makhana",
    color: "text-amber-800",
  },
  {
    name: "Sweet Gourmet Makhana",
    image: "/sweet flavors makhana.avif",
    alt: "Sweet gourmet makhana healthy fox nuts dessert snack India",
    link: "/sweet-makhana",
    color: "text-amber-600",
  },
  {
    name: "Fusion Spicy Makhana",
    image: "/Fusion.avif",
    alt: "Fusion spicy makhana masala fox nuts healthy snack India",
    link: "/fusion-makhana",
    color: "text-red-800",
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
  { id: 2, name: "Soniya Verma", location: "Meerut, India", rating: 4, text: "The hazelnuts were delicious and fresh. I appreciate the eco-friendly packaging. A little more discount on bulk orders would make it perfect." },
  { id: 3, name: "Sandeep Singh", location: "Ghaziabad, India", rating: 5, text: "Nirvana nuts is the best for all item I buy almonds and really the almond is very delicious" },
  { id: 4, name: "Priya Mehta", location: "Noida, India", rating: 5, text: "Fusion Spicy makhana were fresh and crunchy. Nirvana Nuts never disappoints!" },
  { id: 5, name: "Arjun Malhotra", location: "Bengaluru, India", rating: 5, text: "The Modern Flavors makhana were perfectly crunchy and fresh. Nirvana Nuts is my trusted brand for healthy office snacks." },
  { id: 6, name: "Neha Kapoor", location: "Pune, India", rating: 4, text: "I loved the organic walnuts. The eco-friendly packaging is a big plus. Great choice for guilt-free snacking." },
  { id: 7, name: "Rohit Agarwal", location: "Jaipur, India", rating: 5, text: "Premium makhana with amazing taste and quality. Nirvana Nuts delivers farm-fresh products every single time." },
  { id: 8, name: "Meera Joshi", location: "Chennai, India", rating: 5, text: "The makhana was light, crunchy, and delicious. Perfect for evening snacks and family get-togethers." },
  { id: 9, name: "Karan Singh", location: "Hyderabad, India", rating: 4, text: "Hazelnuts were fresh and packed with flavor. Nirvana Nuts is reliable for premium quality dry fruits." },
  { id: 10, name: "Ananya Desai", location: "Ahmedabad, India", rating: 5, text: "I ordered salt makhana and they were simply amazing. Healthy, tasty, and delivered on time — highly recommended!" },
];

const Hero = () => {
  const [slider, setSlider] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const router = useRouter();

  // Initialize AOS safely on client
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const buyNow = (product) => {
    const quantity = 1;
    const basePrice = Number(product?.price) || 0;
    const { finalPrice } = calculateDiscount(product.buyMoreSaveMore || [], quantity, basePrice);
    router.push(`/checkout?productId=${product.docId}&price=${finalPrice}&qty=${quantity}`);
  };

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((i) => i.docId === item.docId && i.selectedWeight === item.selectedWeight);
    if (existingIndex > -1) {
      cart[existingIndex].qty += item.qty;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const shopproduct = (product) => {
    router.push(`/product/${product.docId}`);
  };

  // Fetch Firestore Products
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

  // Slider Automatic Ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setSlider((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Setup Responsive Review Cards Calculation
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
    <div className='min-h-screen w-full  bg-stone-50/50 text-neutral-800 antialiased'>
      
      {/* PERFECT DOM SEO STRUCTURAL ENTRY */}
      <h1 className="sr-only">Nirvana Nuts - Premium Flavored Makhana & Bulk Whey Protein Supplier India</h1>

      {/* 1. Hero Slider Section */}
      <section className="relative min-h-screen md:mt-15 lg:mt-8 md:min-h-screen xl:min-h-screen w-full bg-[#faf8f5] flex flex-col justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === slider ? "opacity-100 z-10 translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"}`}
          >
            <div className="w-full max-w-7xl mx-auto  px-6 pt-32 md:pt-20 md:px-8 lg:pt-1 lg:py-1 lg:pb-2 pb-20 h-full flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 w-full flex flex-col justify-center" data-aos="fade-right">
                <span className="text-amber-800 tracking-wider uppercase block w-fit mt-3 text-xs px-3 py-1 mb-6 rounded-full bg-amber-100/60 font-semibold backdrop-blur-xs">
                  Trusted Supplier Since 2020
                </span>

                {/* DESKTOP HEADING (Safe Semantic Markup) */}
                <div className="hidden md:block space-y-3 mb-6">
                  <h2 className="text-2xl md:text-[28px] tracking-tight leading-tight font-bold text-neutral-900">
                    {slide.heading}
                  </h2>
                  <p className="text-xl md:text-[20px] font-medium tracking-wide text-amber-800/90">
                    {slide.title}
                  </p>
                </div>

                {/* MOBILE HEADING */}
                <div className="md:hidden block mb-6">
                  <h2 className="text-3xl mb-3 font-bold tracking-tight text-neutral-900">
                    {slide.heading}
                    <span className="text-sm tracking-wide ml-1 font-medium text-amber-800 block mt-1">
                      {slide.title}
                    </span>
                  </h2>

                  <div className="relative w-full h-48 my-4">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                  <div className='block md:hidden lg:hidden'>
        <div className="absolute  left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlider(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === slider ? "bg-amber-700 w-8" : "bg-neutral-300 w-2 hover:bg-neutral-400"}`}
            />
          ))}
        </div>
        </div>
                </div>

                <p className="text-sm lg:text-base lg:leading-7 text-neutral-600 mb-4 md:mb-8 lg:mb-8 md:max-w-xl">
                  {slide.description}
                </p>

                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <Link href="/products" className="bg-neutral-900 hover:bg-neutral-800 text-[10px] lg:text-sm font-medium tracking-wider uppercase text-white px-3 py-2 lg:px-5 lg:py-3 md:px-5 md:py-3 rounded-lg transition-all duration-300 shadow-xs hover:shadow-md">
                    Explore Products
                  </Link>
                  <Link href="/contact" className="border border-neutral-300 text-[10px] lg:text-sm font-medium tracking-wider uppercase text-neutral-800 px-3 py-2 lg:px-5 lg:py-3 md:px-5 md:py-3 rounded-lg transition-all duration-300 hover:bg-neutral-900 hover:text-white">
                    Contact us
                  </Link>
                </div>

                <hr className="hidden md:block lg:block border-neutral-200/60 mb-8" />

                <div className="flex gap-12 ">
                  <div>
                    <p className="text-xl lg:text-3xl font-bold text-neutral-900 tracking-tight">100%</p>
                    <p className="text-neutral-400 text-[10px] tracking-widest font-semibold mt-1">ORGANIC</p>
                  </div>
                  <div>
                    <p className="text-xl lg:text-3xl font-bold text-neutral-900 tracking-tight">70K</p>
                    <p className="text-neutral-400 text-[10px] tracking-widest font-semibold mt-1">HAPPY CLIENTS</p>
                  </div>
                  <div>
                    <p className="text-xl lg:text-3xl font-bold text-neutral-900 tracking-tight">20+</p>
                    <p className="text-neutral-400 text-[10px] tracking-widest font-semibold mt-1">RECIPES</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex md:w-1/2 justify-center relative h-[520px]" data-aos="fade-left" data-aos-delay="200">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        ))}
        <div className='hidden md:block lg:block'>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlider(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === slider ? "bg-amber-700 w-8" : "bg-neutral-300 w-2 hover:bg-neutral-400"}`}
            />
          ))}
        </div>
        </div>
      </section>

      {/* 2. Category Breakdown Section */}
      <section data-aos="fade-up" className="bg-[#faf8f5] pt-40  md:py-25 lg:py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-neutral-900 mb-3">
            Shop by Makhana Variety
          </h2>
          <p className="text-center text-neutral-500 max-w-xl mx-auto mb-16 text-sm lg:text-base">
            Explore a wide range of flavored makhana including salted, spicy, and sweet fox nuts. Healthy, crunchy, and perfect for guilt-free snacking.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 text-center">
            {dryfruits.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group flex flex-col items-center transition-all duration-300 bg-stone-50/50 p-6 rounded-2xl border border-transparent hover:border-neutral-200/60 hover:bg-white hover:shadow-xs"
              >
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain rounded-2xl"
                  />
                </div>
                <h3 className={`text-base font-semibold tracking-wide ${item.color} group-hover:opacity-80 transition-all`}>
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Display Matrix */}
      <section data-aos="fade-up" className="py-24 px-6 bg-gradient-to-b from-[#faf8f5] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-neutral-900 mb-3">
            Buy Premium Makhana at Best Price
          </h2>
          <p className="text-center text-neutral-500 max-w-xl mx-auto mb-16 text-sm">
            Nirvana Nuts offers high-quality fox nuts snacks rich in protein and fiber. Crafted for premium lifestyles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
            {Array.isArray(products) && products.filter(Boolean).map((product, index) => {
              const { finalPrice, discount } = calculateDiscount(product.buyMoreSaveMore || [], 1, Number(product.price) || 0);
              return (
                <div 
                  key={product.docId} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  className="transition-all duration-300 hover:-translate-y-1"
                >
                  <ProductCard
                    product={product}
                    displayPrice={finalPrice}
                    displayDiscount={discount}
                    addToCart={addToCart}
                    buyNow={() => buyNow(product)}
                    shopproduct={() => shopproduct(product)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bulk Whey Protein Section */}
      <section data-aos="fade-up" className="relative bg-[#11261f] text-stone-100 py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <span className="text-emerald-400 font-semibold uppercase tracking-widest text-xs block mb-4">Commercial Tier</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Bulk Whey Protein Supplier <span className="text-emerald-400">(20kg)</span>
            </h2>
            <p className="text-base text-stone-300 mb-8 leading-relaxed max-w-xl">
              Buy bulk whey protein in India with high protein content. Ideal for gyms, supplement brands, and fitness businesses looking for reliable whey protein suppliers.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-stone-300 mb-10 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✔</span> High Protein Content
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✔</span> Fast Absorption Formula
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✔</span> Ideal for Bulk & Private Label
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">✔</span> 20kg Commercial Packaging
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 text-sm tracking-wide uppercase">
                Request Bulk Quote
              </Link>
              <Link href="/products" className="border border-stone-500 hover:border-stone-100 text-stone-200 hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 text-sm tracking-wide uppercase">
                View All Products
              </Link>
            </div>
          </div>
          <div className="relative h-[420px] w-full flex justify-center" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/whey-protein-05.avif"
              alt="Bulk whey protein 20kg India high protein powder muscle growth gym supplement Nirvana Nuts"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain hover:scale-102 transition-transform duration-500 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 5. Corporate Heritage Section */}
      <section data-aos="fade-up" className="bg-white py-24 px-6 lg:px-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[520px] w-full" data-aos="fade-right">
            <div className="rounded-2xl overflow-hidden shadow-xs h-full w-full relative">
              <Image
                src="/product-welcome.avif"
                alt="Premium makhana fox nuts healthy snacks India natural roasted Nirvana Nuts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 top-16 bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-5 py-4 text-center z-20 border border-neutral-100" data-aos="zoom-in" data-aos-delay="400">
              <p className="text-3xl font-bold text-amber-800">6+</p>
              <p className="text-[9px] tracking-widest text-neutral-500 mt-1 font-bold uppercase">
                Years of Purity
              </p>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
              Bridging the Gap Between <span className="italic font-normal text-amber-800">Traditional Nutrition</span> & Modern Performance
            </h2>
            <div className="w-20 h-0.5 bg-amber-200 my-6"></div>
            <p className="text-neutral-600 leading-relaxed text-sm lg:text-base mb-6">
              Nirvana Nuts was built on a simple belief — healthy snacking and performance nutrition should never compromise on quality. Rooted in India’s rich tradition of makhana and plant-based superfoods, we craft carefully roasted, protein-rich snacks for modern lifestyles.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8 text-sm">
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="font-semibold text-neutral-900">Ethical Makhana Sourcing</h3>
                <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">Our makhana is sourced directly from trusted farmers to ensure premium quality, freshness, and sustainability.</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="font-semibold text-neutral-900">20kg Bulk Protein Supply</h3>
                <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">We provide lab-tested whey protein in 20kg bulk quantities, suitable for fitness brands and distributors.</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="font-semibold text-neutral-900">Purity Promise</h3>
                <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">Zero artificial preservatives, fillers, or harmful additives — only clean, nutrition.</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <h3 className="font-semibold text-neutral-900">Quality Assurance</h3>
                <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">Every batch undergoes strict quality testing to ensure safety, consistency, and nutritional accuracy.</p>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:opacity-80 transition text-sm">
              Discover Our Journey <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Brand Value Propositions */}
      <section data-aos="fade-up" className="bg-neutral-950 text-neutral-100 py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <span className="text-xs tracking-widest uppercase text-amber-400 mb-4 font-semibold block">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              The Gold Standard of <span className="italic font-normal text-amber-400">Clean Nutrition Excellence</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              At Nirvana Nuts, we are committed to delivering premium makhana snacks and high-quality bulk whey protein that support modern, health-conscious lifestyles. Our philosophy blends traditional plant-based nutrition with advanced processing standards.
            </p>
            <div className="flex gap-16 mt-8">
              <div>
                <p className="text-3xl font-bold text-amber-400">6+</p>
                <p className="text-[10px] tracking-widest text-neutral-500 mt-1 font-semibold">YEARS OF TRUST</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">100%</p>
                <p className="text-[10px] tracking-widest text-neutral-500 mt-1 font-semibold">NATURAL & LAB TESTED</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6" data-aos="fade-left" data-aos-delay="200">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/40 transition duration-300">
              <Leaf className="text-amber-400 mb-4" size={28} />
              <h3 className="text-lg font-semibold mb-2">Premium Makhana</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">We source fox nuts directly from trusted farmers to ensure superior quality, freshness, and authentic nutrition.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/40 transition duration-300">
              <Dumbbell className="text-amber-400 mb-4" size={28} />
              <h3 className="text-lg font-semibold mb-2">20kg Bulk Protein</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">High-quality whey protein available in 20kg bulk packaging, ideal for gyms, supplement brands, and fitness entities.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/40 transition duration-300">
              <Heart className="text-amber-400 mb-4" size={28} />
              <h3 className="text-lg font-semibold mb-2">Quality & Trust</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">Every batch undergoes strict quality checks to ensure purity, consistency, and nutritional accuracy.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/40 transition duration-300">
              <ShieldCheck className="text-amber-400 mb-4" size={28} />
              <h3 className="text-lg font-semibold mb-2">No Harmful Additives</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">No artificial preservatives, no unnecessary fillers — just clean, performance-driven nutrition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Engine */}
      <section data-aos="fade-up" className="bg-[#f4f7f5] py-24 px-6 md:px-20 border-b border-neutral-200/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="bg-white rounded-xl border border-neutral-200/60 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-4.5 focus:outline-hidden"
                  aria-expanded={activeIndex === index}
                >
                  <span className="text-base font-semibold text-neutral-900">{faq.question}</span>
                  <span className="text-xl text-neutral-500 font-light">{activeIndex === index ? "−" : "+"}</span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? "max-h-40 border-t border-neutral-100" : "max-h-0"}`}>
                  <p className="text-neutral-600 text-sm p-6 leading-relaxed bg-stone-50/40">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Conversion Matrix */}
      <section data-aos="fade-up" className="relative h-[45vh] text-center flex items-center justify-center">
        <div className='absolute inset-0 z-0'>
          <Image
            src="/image-slider-07.avif"
            alt="Healthy makhana fox nuts background India Nirvana Nuts"
            fill
            sizes="100vw"
            className='object-cover'
            priority
          />
        </div>
        <div className="absolute inset-0 bg-neutral-950/60 z-10"></div>
        <div className="relative z-20 py-8 px-6 max-w-2xl mx-auto text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold tracking-tight text-white">For Any Query, Get in Touch with Nirvana Nuts</h2>
          <p className="text-neutral-200 text-sm mt-3 max-w-lg mx-auto">
            Have questions about our products or bulk requirements? We’d love to hear from you!
          </p>
          <Link href="/contact" className="bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-semibold tracking-wider uppercase mt-8 px-6 py-3.5 rounded-lg shadow-sm transition-all inline-block">
            Contact Us
          </Link>
        </div>
      </section>

      {/* 9. Customer Reviews Slider Section */}
      <section data-aos="fade-up" className="bg-stone-50 py-24 flex flex-col items-center border-t border-neutral-200/40">
        <div className="max-w-7xl w-full px-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-center text-neutral-900 mb-2">
            Best Makhana Brand in India – Customer Reviews
          </h2>
          <p className="text-center text-neutral-500 text-sm mb-16">See why thousands of clients trust our premium grade items.</p>

          {reviews.length > 0 && (
            <div className="w-full relative overflow-hidden perspective-distant min-h-[340px] flex items-center justify-center" data-aos="zoom-in-up" data-aos-delay="100">
              <div className="relative w-full max-w-4xl h-72 flex justify-center items-center">
                {reviews.map((rev, index) => {
                  let position = index - current;
                  if (position < -1 || position > 1) return null;

                  return (
                    <article
                      key={rev.id}
                      className="absolute w-[310px] sm:w-[420px] md:w-[480px] bg-white border border-neutral-200/60 shadow-xs rounded-2xl p-6 sm:p-8 transition-all duration-700 ease-in-out flex flex-col justify-between"
                      style={{
                        transform: `
                          translateX(${position * 360}px)
                          scale(${position === 0 ? 1 : 0.88})
                          rotateY(${position * -20}deg)
                        `,
                        zIndex: position === 0 ? 20 : 10,
                        opacity: position === 0 ? 1 : 0.4,
                      }}
                    >
                      <div>
                        <header className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">{rev.name}</h3>
                            <p className="text-xs text-neutral-400 mt-0.5">{rev.location}</p>
                          </div>
                          <div className="text-amber-500 text-sm tracking-xs" aria-label={`Rated ${rev.rating} out of 5 stars`}>
                            {"★".repeat(rev.rating)}
                            {"☆".repeat(5 - rev.rating)}
                          </div>
                        </header>
                        <p className="text-neutral-600 text-sm leading-relaxed mt-5 italic">"{rev.text}"</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1))}
                aria-label="Previous review"
                className="absolute left-4 bg-white border border-neutral-200 hover:bg-neutral-50 top-1/2 -translate-y-1/2 text-neutral-800 shadow-xs w-9 h-9 flex items-center justify-center rounded-full cursor-pointer z-30 transition"
              >
                ❮
              </button>

              <button
                onClick={() => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))}
                aria-label="Next review"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 shadow-xs w-9 h-9 flex items-center justify-center rounded-full cursor-pointer z-30 transition"
              >
                ❯
              </button>
            </div>
          )}

          <div className="flex gap-2 mt-12">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index * cardsPerView)}
                aria-label={`Go to reviews page ${index + 1}`}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  current >= index * cardsPerView && current < (index + 1) * cardsPerView ? "bg-amber-800 w-6" : "bg-neutral-300 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default Hero;