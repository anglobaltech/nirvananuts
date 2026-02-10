"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'


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
    link: "/products"
  },
  {
    name: "Modern Savory Flavors makhana",
    description: "Bold, tangy, cheesy, spicy",
//    price: "₹249",
    image: "/product-03.avif",
    link: "/products"
  },
  {
    name: "Sweet Gourmet Flavors makhana",
    description: "Rich, indulgent, dessert-style crunch",
//    price: "₹299",
    image: "/product-04.avif",
    link: "/products"
  },
  {
    name: "Fusion Spicy makhana",
    description: "A healthy mix of nuts for every mood.",
//    price: "₹349",
    image: "/about-image-04.webp",
    link: "/products"
  },
  {
    name: "Whey Protein",
    description: "High-quality protein for muscle support",
//    price: "₹399",
    image: "/whey-protein-01.avif",
    link:"/whey-protein"
  },
];

const Hero = () => {
  //  home slider
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isHover) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isHover, images.length]);

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    touchStartX.current = null;
  };
  // review
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
const totalDots = Math.ceil(reviews.length/cardsPerView)
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
    <div>

      {/* home slider */}
    <section
      className="relative   w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen  bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slider Background */}
      <div className=" absolute   mt-20 mb-5 bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden ">

        <div
          className="flex transition-transform duration-700 ease-in-out h-full "
          style={{ transform: `translateX(-${index * 100}%)`,  backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {images.map((src, i) => (
            <div key={src} className="min-w-full h-full  relative">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                className="absolute inset-0 w-full h-full background-size-cover object-center"
                width={200}
                height={200}
                fetchPriority='high'
                sizes='100vw'
                priority
              />
              <div className="absolute inset-0  opacity-70 mix-blend-multiply" />
            </div>
          ))}
        </div>
        
      </div>





      {/* Navigation Buttons */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow transition"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${index === i ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>

    </section>

      {/* about us */}
      <main>
        <div className="min-h-screen bg-linear-to-r from-white via-gray-100 to-white px-4 py-12">
          {/* Intro Section */}
          <section >
            <h1 className="text-4xl font-bold text-center mt-0 pb-15 text-amber-900 gap-0 animate-fadeIn">About Nirvana Nuts</h1>
            <div className="max-w-6xl p-5 mx-auto text-left space-y-6 mb-12">
              <div className='text-yellow-900 text-xl font-bold '>
              <h2>Premium Makhana, Healthy Nuts & Protein-Rich Nutrition</h2>
              <h3 className='text-base'>(Natural Nutrition for a Healthier India)</h3>
              </div>
              <p className="text-lg text-gray-900 leading-relaxed animate-fadeIn">
                Nirvana Nuts is an Indian wellness brand offering premium makhana (fox nuts), healthy nuts, dry fruits, and protein-rich nutrition for everyday lifestyles. Our products are carefully sourced, quality tested, and hygienically packed to deliver freshness, purity, and taste in every bite.
              </p>
              <p className="text-lg text-gray-900 leading-relaxed animate-fadeIn">Whether you’re looking for low-calorie makhana, protein-rich nuts, or clean daily nutrition, Nirvana Nuts helps you snack smarter without compromising on quality.</p>

              <h2 className="text-xl font-bold  text-yellow-900">Benefits of Makhana</h2>
              <ul className="list-disc list-inside text-gray-900 text-lg space-y-1">
                <li><strong>Nutrient-Rich:</strong> Packed with protein, fiber, and essential minerals.</li>
                <li><strong>Low-Calorie:</strong> Ideal for weight management and low in fat.</li>
                <li><strong>Antioxidant-Rich:</strong> Helps reduce oxidative stress and lower disease risks.</li>
                <li><strong>Heart Health:</strong> High in magnesium and low in sodium.</li>
                <li><strong>Digestive Aid:</strong> Promotes healthy digestion and prevents constipation.</li>
              </ul>

              <h2 className="text-xl font-bold  text-yellow-900">Origin of Makhana</h2>
              <p className="text-gray-900 text-lg">
                Makhana, also known as fox nuts or lotus seeds, has been cultivated in the Mithila region of Bihar for centuries. This superfood is deeply rooted in the cultural and agricultural heritage of the region, making it a symbol of tradition and nutritional excellence.
              </p>
            </div>
          </section>

          {/* Image Section */}
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 py-12 max-w-6xl mx-auto">
            {[
              { src: "/about-image-04.webp", alt: "Makhana Bowl" },
              { src: "/about-image-05.webp", alt: "Nirvana Nuts Packet" },
              { src: "/about-image-01.avif", alt: "Roasted Almonds" },

            ].map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                height={200} width={200} priority fetchPriority='high' sizes='100vw'
                className={`rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 animate-fadeInUp delay-${i * 100} w-full h-auto object-cover`}
              />
            ))}
          </section>
        </div>

      </main>

      {/* Why Choose Nirvana Nuts */}

      <main className="font-sans text-gray-900  bg-gray-100">
        <section className=" py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-10 animate-fadeInUp">
            Why Choose Nirvana Nuts
          </h2>
          <p className="text-gray-700 text-lg mb-12 animate-fadeInUp delay-200">
            We are committed to delivering the finest quality nuts with unmatched freshness and exceptional taste.
          </p>
            <div className=" text-left py-2 pb-20">
            <h2 className="text-2xl md:text-xl font-bold  text-amber-800">Why Nirvana Nuts?</h2>
            <ul className="list-disc p-2 space-y-2 text-gray-800 text-base md:text-lg ">
              <li>Premium quality makhana & dry fruits</li>
              <li>Rich in protein, fiber & essential nutrients</li>
              <li>No artificial colors or preservatives</li>
              <li>Trusted sourcing & hygienic processing</li>
              <li>Suitable for fitness, weight management & daily wellness</li>
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "100% Organic", desc: "Naturally grown without pesticides or chemicals" },
              { title: "Premium Quality", desc: "Hand-selected from the finest orchards worldwide" },
              { title: "Heart Healthy", desc: "Rich in omega-3 fatty acids and antioxidants" },
              { title: "Quality Assured", desc: "Rigorous testing for freshness and purity" },
            ].map((item, i) => (
              <div key={i} className={`animate-fadeInUp delay-${i * 100}`}>
                <div className="text-amber-600 text-xl font-semibold mb-2">{item.title}</div>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality & Value Section */}
        <section className="grid md:grid-cols-2 gap-8 p-5 px-6 py-16 max-w-6xl mx-auto">
          <div className="animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-700">OUR QUALITY</h2>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              Welcome to Nirvana Nuts, where quality meets taste in every bite.
              Our commitment to excellence begins with sourcing the finest raw
              ingredients, ensuring each nut is handpicked at its peak freshness.
              From the moment you open a pack of Nirvana Nuts, you are greeted with
              the aroma of pure, unadulterated goodness.
            </p>
          </div>
          <div className="animate-fadeInUp delay-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-700">OUR VALUE</h2>
            <ul className="list-disc p-2 space-y-2 text-gray-800 text-base md:text-lg ">
              <li>Leadership: The courage to shape a better future.</li>
              <li>Integrity: Be real.</li>
              <li>Passion: Committed in heart and mind.</li>
              <li>Quality: What we do, we do well.</li>
              <li>Collaboration: Leverage collective genius.</li>
              <li>Diversity: As inclusive as our brands.</li>
              <li>Accountability: If it is to be, it is up to me.</li>
            </ul>
          </div>
        </section>
      </main>

      {/* our products */}
      <section className="relative pb-14 px-6 text-center text-gray-900 bg-white">
        <h2 className='text-4xl md:text-4xl font-bold text-amber-900 mb-12'>Our Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <div
              key={i}
              className={'bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 '}
            >
              <Image
                src={product.image}
                alt={product.name}
                height={200} 
                width={200}
                fetchPriority='high'
                sizes='100vw'
                className="w-full h-64 object-fill"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-700">
                    {product.price}
                  </span>
                  <a href={product.link}  >
                    <button className=" group bg-linear-to-b from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg hover:scale-105 active:scale-95   transition-transform cursor-pointer"  >
                      View More
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* customer feedback */}
      <section className=" relative h-[60vh] overflow-hidden  md:h-80 text-center ">
          <div className='absolute inset-0 z-0'>
          <Image src="/image-slider-07.avif" alt='background image'  height={300} width={300} fetchPriority='high'
                sizes='100vw' className='md:w-full w-full h-full object-fill'  />
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
<section className="mb-20 bg-linear-to-r from-blue-50 to-grey-50 flex flex-col items-center  ">
  <h2 className="text-3xl font-bold my-20 text-amber-800 text-center">
    Customer Reviews & Testimonials Nirvana Nuts
  </h2>

  <div className="w-full max-w-7xl  mt-1 relative overflow-hidden perspective-distant">
<div className="relative h-70 flex  justify-center items-center">
  {reviews.map((rev, index) => {
    let position =index - current;

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

        <p className="text-gray-700 text-xl">{rev.text}</p>
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
  <div className="flex gap-2 mt-6">
    
    {Array.from({ length: totalDots }).map((_, index) => (
      <span
        key={index}
        onClick={() => setCurrent(index * cardsPerView)}
        className={`w-3 h-3 rounded-full cursor-pointer transition
          ${current >= index *cardsPerView && 
            current < (index + 1) * cardsPerView ?"bg-amber-600" : "bg-gray-400"}`}
      />
    ))}
  </div>
</section>


    </div>
  )
}


export default Hero;
