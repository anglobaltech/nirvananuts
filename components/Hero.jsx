"use client"
import React, { useEffect, useRef, useState } from 'react'

// image
const images = [
  "/new-image-01.png",
  "/new-image-02.png",
  "/new-image-03.png",
  "/new-image-04.png",
];
// our products
const products = [
  {
    name: "Classic Salted Makhana",
    description: "Lightly roasted with rock salt",
//    price: "₹199",
    image: "/image-quality-01.png",
  },
  {
    name: "Modern Savory Flavors makhana",
    description: "Bold, tangy, cheesy, spicy",
//    price: "₹249",
    image: "/product-03.png",
  },
  {
    name: "Sweet Gourmet Flavors makhana",
    description: "Rich, indulgent, dessert-style crunch",
//    price: "₹299",
    image: "/product-04.png",
  },
  {
    name: "Fusion Spicy makhana",
    description: "A healthy mix of nuts for every mood.",
//    price: "₹349",
    image: "/about-image-04.jpeg",
  },
  {
    name: "Whey Protein",
    description: "High-quality protein for muscle support",
//    price: "₹399",
    image: "/whey-protein-01.png",
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
    }, 1000);
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
      text: "Cashews were fresh and crunchy. Nirvana Nuts never disappoints!",
    },
    {
      id: 5,
      name: "Arjun Malhotra",
      location: "Bengaluru, India",
      rating: 5,
      text: "The roasted almonds were perfectly crunchy and fresh. Nirvana Nuts is my trusted brand for healthy office snacks.",
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
      text: "Premium cashews with amazing taste and quality. Nirvana Nuts delivers farm-fresh products every single time.",
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
      text: "I ordered pistachios and they were simply amazing. Healthy, tasty, and delivered on time — highly recommended!",
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setReviews(initialReviews);
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div>

      {/* home slider */}
    <section
      className="relative h-200 min-h-screen  bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slider Background */}
      <div className=" absolute   mt-20 mb-5 bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden ">

        <div
          className="flex transition-transform duration-700 ease-in-out h-full "
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src} className="min-w-full h-full  relative">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="absolute inset-0 w-full h-full  object-center"
                loading="fast"
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
            <h1 className="text-4xl font-bold text-center mt-0 pb-15 text-yellow-900 gap-0 animate-fadeIn">About Nirvana Nuts</h1>
            <div className="max-w-6xl mx-auto text-left space-y-6 mb-12">
              <p className="text-lg text-yellow-700 leading-relaxed animate-fadeIn">
                Welcome to Nirvana Nuts — Where Flavor Meets Wholesome Goodness! We are passionate about crafting snacks that delight your taste buds and nourish your body. Every nut is handpicked for peak freshness, ensuring quality you can trust and taste you’ll love.
              </p>
              <p className="text-lg text-yellow-700 leading-relaxed animate-fadeIn">NIRVANA NUTS, identified by its online presence at nirvananuts.in, is presented as a customer-focused brand in the rapidly growing dry fruit and nut industry. The brand aims to transform the snacking experience by offering products that are not only delicious but also contribute to overall well-being.</p>

              <h2 className="text-lg font-bold  text-yellow-900">Benefits of Makhana</h2>
              <ul className="list-disc list-inside text-yellow-700 text-lg space-y-1">
                <li><strong>Nutrient-Rich:</strong> Packed with protein, fiber, and essential minerals.</li>
                <li><strong>Low-Calorie:</strong> Ideal for weight management and low in fat.</li>
                <li><strong>Antioxidant-Rich:</strong> Helps reduce oxidative stress and lower disease risks.</li>
                <li><strong>Heart Health:</strong> High in magnesium and low in sodium.</li>
                <li><strong>Digestive Aid:</strong> Promotes healthy digestion and prevents constipation.</li>
              </ul>

              <h2 className="text-xl font-bold  text-yellow-900">Origin of Makhana</h2>
              <p className="text-yellow-700 text-lg">
                Makhana, also known as fox nuts or lotus seeds, has been cultivated in the Mithila region of Bihar for centuries. This superfood is deeply rooted in the cultural and agricultural heritage of the region, making it a symbol of tradition and nutritional excellence.
              </p>
            </div>
          </section>

          {/* Image Section */}
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 py-12 max-w-6xl mx-auto">
            {[
              { src: "/about-image-04.jpeg", alt: "Makhana Bowl" },
              { src: "/about-image-05.jpeg", alt: "Nirvana Nuts Packet" },
              { src: "/about-image-01.jpeg", alt: "Roasted Almonds" },

            ].map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 animate-fadeInUp delay-${i * 100} w-full h-auto object-cover`}
              />
            ))}
          </section>
        </div>

      </main>

      {/* Why Choose Nirvana Nuts */}

      <main className="font-sans text-gray-900  bg-gray-50">
        <section className=" py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-700 mb-10 animate-fadeInUp">
            Why Choose Nirvana Nuts
          </h2>
          <p className="text-gray-700 text-lg mb-12 animate-fadeInUp delay-200">
            We are committed to delivering the finest quality nuts with unmatched freshness and exceptional taste.
          </p>
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
        <section className="grid md:grid-cols-2 gap-8 px-6 py-16 max-w-6xl mx-auto">
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
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-base md:text-lg">
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
      <section className="relative py-20 px-6 text-center text-gray-900 bg-white">
        <h2 className={'text-4xl md:text-5xl font-extrabold mb-12'}>Our Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <div
              key={i}
              className={'bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 '}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-fill"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-700">
                    {product.price}
                  </span>
                  <a href="/products"  >
                    <button className=" group bg-amber-600 text-white px-4 py-2 rounded hover:scale-105 active:scale-95 hover:bg-amber-800 transition-transform cursor-pointer"  >
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
      <section className="bg-amber-700  py-12 h-120 text-center px-4">

      {/* contact us */}
        <div className=" py-12 px-6 mt-20 text-center   ">
          <h2 className="text-3xl font-bold text-amber-400 "> For any query click here </h2>
          <p className="text-gray-100 mb- max-w-xl mx-auto">
            Have questions about our products? We’d love to hear from you!
          </p>

          <a href="/contact">
            <button className="bg-amber-600 text-white mt-8  px-8 py-3 rounded-lg shadow-md hover:bg-amber-600 transition cursor-pointer">Contact Us</button>
          </a>
        </div>
      </section>

      {/* review section */}
      <section
        className="min-h-screen bg-gray-100 flex flex-col items-center p-6"
        aria-label="Customer Reviews and Testimonials"
      >
        <h1 className="text-4xl font-bold m-20 mb-30 text-amber-800 text-center">
          Customer Reviews & Testimonials  Nirvana Nuts
        </h1>

        <div className="w-full max-w-6xl relative overflow-hidden">
          {/* Sliding container */}
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / 3 + 2)}%)`, // adjust for spacing
            }}
          >
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 bg-white shadow-lg rounded-xl p-6 min-h-70 flex flex-col justify-between transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
                <header className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{rev.name}</h2>
                  <p className="text-sm text-gray-500">{rev.location}</p>
                  {rev.date && (
                    <time
                      dateTime={new Date(rev.date).toISOString()}
                      className="text-xs text-gray-400"
                    >
                      {rev.date}
                    </time>
                  )}
                </header>
                <div
                  className="flex text-yellow-500 my-2"
                  aria-label={`Rating: ${rev.rating} out of 5`}
                >
                  {"★".repeat(rev.rating)}
                  {"☆".repeat(5 - rev.rating)}
                </div>
                <p className="text-gray-700">{rev.text}</p>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
          >
            {"<"}
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % reviews.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
          >
            {">"}
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex space-x-2 mt-4">
          {reviews.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${current === index ? "bg-black" : "bg-gray-400"
                }`}
            ></span>
          ))}
        </div>
      </section>
    </div>
  )
}


export default Hero;
