"use client"
import { Sliders } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'




export const metadata={
  title:"Premium Makhana & Protein Snacks | Nirvana Nuts",
  description:"Experience clean, premium makhana and protein-rich snacks crafted for mindful eating. Nirvana Nuts delivers freshness, flavor and quality across India."
}


const slides = [
  {
    heading:"Classic Salted Makhana",
    title: "Healthy Roasted Fox Nuts",
    description: "Enjoy the timeless taste of perfectly roasted classic salted makhana made from premium fox nuts. A healthy, low-calorie snack packed with protein and fiber — ideal for daily munching and guilt-free snacking across India.",
    image: "/Classic-Salted-Flavors.avif",
  },
  {
    heading:"Modern Savory Flavored Makhana",
    title: "Bold Taste, Healthy Choice",
    description: "Experience premium makhana infused with exciting savory flavors. Crafted for modern snack lovers, our flavored fox nuts deliver crunch, nutrition, and irresistible taste in every bite.",
    image: "/Modern Savory Flavors.avif",
  },
    {
    heading:"Sweet Gourmet Makhana",
    title: "Luxury Snacking Redefined",
    description: "Indulge in gourmet sweet makhana made from high-quality fox nuts. A perfect blend of sweetness and crunch, offering a nutritious alternative to traditional desserts and sugary snacks.",
    image: "/Sweet Gourmet Flavors.avif",
  },
    {
    heading:"Fusion Spicy Makhana",
    title: "Fiery Flavor,Healthy Crunch",
    description: "Turn up the heat with our fusion spicy makhana, made from farm-fresh fox nuts and bold Indian spices. A protein-packed, crunchy snack perfect for tea time and fitness-conscious consumers.",
    image: "/Fusion Spicy.avif",
  },
    {
    heading:"Bulk Whey Protein 20kg",
    title: "Pure, High-Quality Protein Powder",
    description: "Premium 20kg bulk whey protein designed for manufacturers, gyms, and supplement brands. Lab-tested, high-protein formula ideal for muscle growth, recovery, and private labeling across India.",
    image: "/whey.avif",
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
    link:"/whey-protein"
  },
];

const Hero = () => {
  //  home slider
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
    const [slider, setSlider] = useState(0);



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
    {/* <section
      className="relative   w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen  bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    > */}
      {/* Slider Background */}
      {/* <div className=" absolute   mt-19 mb-5 bg-linear-to-r from-white via-gray-100 to-white inset-0 overflow-hidden ">



        <div
          className="flex transition-transform duration-700 ease-in-out h-full "
          style={{ transform: `translateX(-${index * 100}%)`,  backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {images.map((src, i) => (
            <div key={src} className="min-w-full h-full  relative">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                className="absolute inset-0 w-full h-full background-size-cover  object-center  "
                width={400}
                height={400}
              
                priority
              />
              <div className="absolute inset-0  opacity-70 mix-blend-multiply" />
            </div>
          ))}
        </div>
        
      </div> */}





      {/* Navigation Buttons */}
      {/* <button
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
      </button> */}

      {/* Dots */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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

    </section> */}

       <section className="relative min-h-screen w-full bg-amber-50  overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === slider ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${slide.bg}`}
        >
          <div className="max-w-7xl mx-auto mt-10  px-7 py-15 h-full md:flex md:items-center ">
            
            
            {/* Left Content */}
            <div className="md:w-1/2 w-full md:space-y-6">

              <h1 className='text-amber-600  md:w-60 text-sm p-1.5  text-left animate-fadeIn md:mb-13 mt-8 mb-7 md:text-0 rounded-2xl'>Trusted Supplier Since 2020</h1>
              <h2 className="block md:hidden md:text-[50px] text-2xl text-left capitalize md:text-left tracking-tight  animate-fadeIn leading-4 md:leading-12 font-bold text-gray-900 font-['Poppins']"> {slide.heading} <span className=" text-lg md:text-[30px] text-left md:text-left  tracking-tight animate-fadeIn  md:leading-3 font-bold text-amber-900 font-['Poppins']">{slide.title}</span></h2>
              <h2 className="hidden md:block md:text-[50px] text-2xl text-left  md:text-left tracking-tight  animate-fadeIn leading-4 md:leading-12 font-bold text-gray-900 font-['Poppins']">
                {slide.heading}
              </h2>
              <h2 className="hidden md:block text-lg md:text-[30px] text-left md:text-left mb-10 tracking-tight animate-fadeIn  md:leading-3 font-bold text-amber-900 font-['Poppins']">
                {slide.title}
              </h2>
              <p className="text-base leading-5 mt-10 md:mt-0 animate-fadeIn  text-gray-600 mb-15">
                {slide.description}
              </p>

            {/* Right Image */}
            <div className=" md:hidden block md:w-120 md:ml-20 ">
              <Image
                src={slide.image}
                alt={slide.title}
                width={600}
                height={400}
                className="w-120 h-62.5 md:ml-10 sm:h-75 md:h-120 object-fill rounded-xl "
              />
              
            </div>



              <div className='flex mt-7 md:mt-10  md:justify-start md:items-start justify-center items-center '>
                <a href="/">
                <button className="bg-linear-to-r   from-amber-600 to-amber-300 animate-fadeIn hover:scale-110 cursor-pointer text-white px-4 py-2 rounded-xl transition">
                Explore Products 
              </button>
              </a>
              <button className="border-2 border-black animate-fadeIn  hover:bg-black hover:text-white hover: ml-10 mb-7 md:mt-0 mt-7 hover:scale-110 cursor-pointer text-gray-900 px-4 md:py-1.7 py-1.5 rounded-xl transition">
                Contact us
              </button>
              </div>

              <hr />
              <div className='flex  gap-13  ml-8'>
                <div className='text-gray-800  animate-fadeIn text-[10px] font-extrabold'>
                  <h2 className='text-gray-900 text-2xl font-bold'>100%</h2>
                  <h2 >ORGANIC</h2>
                </div>
                  <div className='text-gray-800 animate-fadeIn text-[10px] font-extrabold'>
                  <h2 className='text-gray-900 text-2xl font-bold'>70K</h2>
                  <h2>HAPPY CLIENT</h2>
                </div>
                <div className='text-gray-800  animate-fadeIn text-[10px] font-extrabold'>
                  <h2 className='text-gray-900 text-2xl font-bold'>20+</h2>
                  <h2>RECIPES</h2>
                </div>
              </div>

            </div>

            {/* Right Image */}
            <div className=" hidden md:block lg:w-120 md:w-70 xl:w-140 md:ml-20 ">
              <Image
                src={slide.image}
                alt={slide.title}
                width={600}
                height={400}
                className="w-120 h-62.5 md:ml-10 sm:h-75 md:h-120 object-fill rounded-xl "
              />
              
            </div>

          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlider(index)}
            className={`w-3 h-3 rounded-full ${
              index === slider ? "bg-yellow-600 scale-125" : "bg-gray-400"
            } transition`}
          ></button>
        ))}
      </div>
    </section>

      {/* about us */}
      <main>
        <div className="min-h-screen bg-linear-to-r from-white via-gray-100 to-white px-4 py-5">
          {/* Intro Section */}
          <section  >
            <h2 className="text-4xl font-bold text-center mt-0 pb-5 text-yellow-900 gap-0 ">About Nirvana Nuts</h2>
            <div className="max-w-6xl p-5 mx-auto text-left space-y- mb-12">
              <div className='text-yellow-900 text-xl font-bold '>
              <h1>Buy Premium Makhana & Healthy Nuts Online in India – Nirvana Nuts</h1>
              <h2 className='text-base '>(Natural Nutrition for a Healthier India)</h2>
              </div>
              <p className="text-17px mt-3 text-gray-900 leading-relaxed ">
                Nirvana Nuts is a trusted Indian brand where you can buy premium makhana 
                and healthy nuts online. We offer roasted and flavored makhana made from 
                100% naturally grown fox nuts. If you are looking to buy makhana online or 
                buy roasted nuts for a healthy lifestyle, Nirvana Nuts brings you quality, 
                taste, and nutrition in every pack.

              </p>
              <p className="text-17px text-gray-900 mb-5 leading-relaxed ">Whether you’re looking for low-calorie makhana, protein-rich nuts, or clean daily nutrition, Nirvana Nuts helps you snack smarter without compromising on quality.</p>

              <h2 className="text-xl font-bold mb-2  text-yellow-900">Benefits of Makhana</h2>
              <ul className="list-disc list-inside  mb-2 text-gray-900 text-14px  space-y-1">
                <li><strong className='text-lg  text-amber-700 font-10px'>Nutrient-Rich:</strong> Packed with protein, fiber, and essential minerals.</li>
                <li><strong className='text-lg text-amber-700 ' >Low-Calorie:</strong> Ideal for weight management and low in fat.</li>
                <li><strong className='text-lg text-amber-700 '>Antioxidant-Rich:</strong> Helps reduce oxidative stress and lower disease risks.</li>
                <li><strong className='text-lg text-amber-700 '>Heart Health:</strong> High in magnesium and low in sodium.</li>
                <li><strong className='text-lg text-amber-700 '>Digestive Aid:</strong> Promotes healthy digestion and prevents constipation.</li>
              </ul>

              <h2 className="text-xl font-bold mb-2 text-yellow-900">Origin of Makhana</h2>
              <p className="text-gray-900 text-17px">
                Makhana, also known as fox nuts or lotus seeds, has been cultivated in the Mithila region of Bihar for centuries. This superfood is deeply rooted in the cultural and agricultural heritage of the region, making it a symbol of tradition and nutritional excellence.
              </p>
            </div>
          </section>

          {/* Image Section */}
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6  max-w-6xl mx-auto">
            {[
              { src: "/about-image-04.webp", alt: "Makhana Bowl" },
              { src: "/about-image-05.webp", alt: "Nirvana Nuts Packet" },
              { src: "/about-image-01.avif", alt: "Roasted makhana" },

            ].map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                height={200} width={200} priority
                className={`rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 animate-fadeInUp delay-${i * 100} w-full h-auto object-cover`}
              />
            ))}
          </section>
        </div>

      </main>

      {/* Why Choose Nirvana Nuts */}

      <main className="font-sans text-gray-900  bg-gray-50">
        <section className=" py-7 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-3 animate-fadeInUp">
            Why Choose Nirvana Nuts
          </h2>
          <p className="text-gray-700 text-lg mb-4 animate-fadeInUp delay-200">
            We are committed to delivering the finest quality nuts with unmatched freshness and exceptional taste.
          </p>
            <div className=" text-left py-2 pb-8">
            <h2 className="text-2xl md:text-2xl font-bold  text-amber-700">Why Nirvana Nuts?</h2>
            <ul className="list-disc p-2 space-y-1 text-gray-800 text-base md:text-lg ">
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
        <section className="grid md:grid-cols-2 gap-8 p-5 px-6 py- max-w-6xl mx-auto">
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
                priority
                className="w-full h-64 object-fill"
              />
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
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


      <section className=" relative h-[60vh] overflow-hidden  md:h-80 text-center ">
          <div className='absolute inset-0 z-0'>
          <Image src="/image-slider-07.avif" alt='background makhana ' priority height={300} width={300} className='md:w-full w-full h-full object-fill'  />
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
    let position =index - current;

if (position < -1 || position > 1) return null

    return (
      <article
        key={rev.id}
        className="absolute w-75 md:w-1/2 lg:w-1/3 h-60
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
