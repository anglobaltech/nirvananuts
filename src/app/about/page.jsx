"use client";
import Image from 'next/image';
import Link from "next/link";
import React from 'react'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


const makhanaProcess = [
  {
    title: "1. Raw Material Sourcing",
    description:
      "We begin with sourcing the finest Makhana (fox nuts), handpicked at peak freshness from trusted farms. Each batch is checked for size, color, and moisture to ensure only premium-quality seeds enter our process.",
  },
  {
    title: "2. Cleaning & Sorting",
    description:
      "Raw Makhana is thoroughly cleaned to remove dust, stones, and other foreign particles. It is then sorted and calibrated by size to ensure uniform roasting and consistent texture in every pack.",
  },
  {
    title: "3. Roasting & Puffing",
    description:
      "The cleaned seeds are gently roasted under controlled heat. This stage helps puff the seeds, develop their signature light crunch, and enhance flavor while preserving nutritional value.",
  },
  {
    title: "4. Shelling & Sieving",
    description:
      "After roasting, the outer shells are carefully removed. The puffed Makhana kernels are then sieved to separate any broken or undersized pieces, ensuring a uniform, premium-grade final product.",
  },
  {
    title: "5. Drying & Conditioning",
    description:
      "The kernels are dried to an optimal moisture level to extend shelf life and maintain crispness. This step is crucial to prevent microbial growth and preserve the natural taste and texture.",
  },
  {
    title: "6. Flavoring & Blending",
    description:
      "Depending on the variant, Makhana is lightly seasoned with carefully selected ingredients—such as classic salted, Cheese Masti, or fasting-friendly flavors—while maintaining a clean-label, health-focused profile.",
  },
  {
    title: "7. Quality Control",
    description:
      "Every batch undergoes strict quality checks for appearance, crunch, taste, and hygiene. Only the lots that meet our internal standards move forward to packaging.",
  },
  {
    title: "8. Packaging & Dispatch",
    description:
      "Makhana is packed in high-barrier, food-grade pouches and bulk bags designed to protect against moisture, oxygen, and light. Clear labeling ensures traceability, and products are then dispatched through our D2C and bulk channels.",
  },
];

const page = () => {
    useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen w-full  bg-linear-to-r overflow-hidden from-white via-gray-100 to-white  ">

<section className="bg-amber-50  py-20 px-6 md:px-20 text-amber-900">
  <div className="max-w-7xl mx-auto mt-15 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div data-aos="fade-right">

      <span className="text-amber-600 uppercase tracking-widest text-sm font-semibold">
        Our Heritage
      </span>

      <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-6">
        A Journey of <span className="italic text-amber-500">Pure Nutrition & Strength</span>
      </h2>

      <p className="text-amber-800 text-lg leading-relaxed mb-6">
        Nirvana Nuts was founded with a simple mission — to deliver
        premium quality makhana and clean nutrition products sourced
        from nature. Our roasted fox nuts are carefully selected,
        hygienically processed, and crafted for healthy living.
      </p>

      <p className="text-amber-800 text-lg leading-relaxed mb-8">
        Alongside our gourmet makhana range, we also supply 
        <strong className="text-amber-500"> Bulk Whey Protein in 20kg packaging</strong> —
        trusted by gyms, fitness brands, and distributors looking
        for high-quality protein solutions for muscle growth and recovery.
      </p>

      <a
        href="/products"
        className="inline-block bg-amber-600 hover:bg-amber-500 text-amber-50 px-10 py-4 rounded-full font-semibold shadow-lg transition duration-300"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        Explore Collection
      </a>

    </div>

    {/* RIGHT IMAGE */}
    <div className="relative" data-aos="fade-left">

      <Image
        src="/new-image-04.avif"
        alt="Nirvana Nuts Premium Makhana and Bulk Whey Protein 20kg Supplier"
        height={200}
        width={200}
        className="rounded-2xl shadow-2xl w-full object-cover"
      />



      {/* Floating Badge */}
      <div 
        className="absolute -bottom-6 -left-6 bg-amber-100 rounded-2xl shadow-xl px-4 py-3"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <span className="text-3xl font-bold text-amber-600">6+</span>
        <p className="text-[10px] text-amber-800 uppercase tracking-wider">
          Years of Excellence
        </p>
      </div>

    </div>

  </div>
</section>



    <section className="bg-linear-to-br from-amber-50 via-amber-100 to-amber-200 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div data-aos="fade-right" className="relative group">
          <Image
            src="/founder of nirvana nuts.avif"
            alt="Nirvana Nuts Founder - Premium Makhana & Bulk Whey Protein Supplier"
            width={600}
            height={700}
            className="rounded-t-2xl shadow-2xl object-cover w-full"
            priority
          />

          {/* Overlay Card */}
          <div  data-aos="fade-up"
            data-aos-delay="300" 
            className=" bottom-0 left-0 w-full bg-amber-900/90 backdrop-blur-md text-white p-6 rounded-b-2xl">
            <h3 className="text-2xl font-bold">
              Nirvana Nuts Leadership
            </h3>
            <p className="text-amber-200 text-sm">
              Committed to Purity, Performance & Global Standards
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* Vision */}
          <div data-aos="fade-left" className="mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Vision
            </h2>
            <div className="w-20 h-1 bg-amber-600 mb-6"></div>

            <p className="text-gray-800 text-lg leading-relaxed">
              To become a trusted global brand in healthy snacking and
              performance nutrition by delivering premium quality 
              <strong> makhana (fox nuts)</strong> and 
              <strong> bulk whey protein (20kg packaging)</strong> 
              to fitness brands, gyms, distributors, and modern consumers.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              We aim to provide clean-label, nutrient-rich products
              sourced responsibly and processed under strict quality standards.
            </p>
          </div>

          {/* Mission */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-amber-600 mb-6"></div>

            <p className="text-gray-800 text-lg leading-relaxed">
              Our mission is to maintain excellence from sourcing to
              packaging by following international food safety and
              nutritional standards.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700 text-lg">
              <li>✔ Premium farm-sourced makhana with hygienic processing</li>
              <li>✔ High-quality 20kg bulk whey protein solutions</li>
              <li>✔ Reliable supply for fitness brands & manufacturers</li>
              <li>✔ Transparent quality testing & global compliance</li>
            </ul>
          </div>

        </div>
      </div>
    </section>


    {/* process */}

   <section className="bg-amber-50 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* SEO Heading */}
        <h2
          className="text-4xl font-bold text-center text-gray-800 mb-4"
          data-aos="fade-up"
        >
          Premium Makhana Processing – Nirvana Nuts
        </h2>

        <p
          className="text-center text-gray-600 max-w-3xl mx-auto mb-14"
          data-aos="fade-up"
        >
          From farm-sourced fox nuts to perfectly roasted healthy snacks,
          Nirvana Nuts follows a strict quality-controlled manufacturing
          process ensuring purity, crunch, and nutrition.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {makhanaProcess.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>

        {/* Bulk Whey Protein Section */}
        <div
          className="mt-20 bg-emerald-50 p-10 rounded-2xl shadow-lg"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            20kg Bulk Whey Protein Solutions
          </h2>

          <p className="text-gray-700 mb-4">
            Nirvana Nuts also supplies premium 20kg bulk whey protein for
            fitness brands, manufacturers, and private label businesses.
            Our protein solutions reflect our commitment to purity,
            performance, and transparency.
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>High Protein Content</li>
            <li>Lab Tested Quality</li>
            <li>Bulk Packaging – 20kg Bags</li>
            <li>Ideal for Private Label & Manufacturing</li>
          </ul>
        </div>

      </div>
    </section>
  
  {/* an global services */}
  <section className="relative py-20 bg-linear-to-br from-amber-50 via-white to-green-50 overflow-hidden">

  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    {/* Heading */}
    <div className="text-center mb-16" data-aos="fade-up">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Global Excellence Powered by <span className="text-green-600">An Global Services</span>
      </h2>
      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
        Nirvana Nuts is proudly maintained by <strong>An Global Services</strong>, 
        ensuring every customer enjoys premium dry fruits and healthy snacks 
        with world-class quality standards and global reach.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* Left Content */}
      <div data-aos="fade-right">

        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Premium Healthy Products with Global Standards
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          By combining local trust with international logistics expertise, 
          we deliver <strong>makhana, almonds, mixed nut blends, and bulk whey protein (20kg)</strong> 
          that are fresh, nutritious, and accessible worldwide.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Our commitment to quality, integrity, and customer satisfaction is 
          supported by seamless supply chains and responsive global support — 
          making Nirvana Nuts not just a brand, but your trusted partner in healthy snacking.
        </p>

        <a
          href="https://www.anglobalservices.com/"
          target="_blank"
          className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          Visit Our Website →
        </a>

      </div>

      {/* Right Content */}
      <div data-aos="fade-left" className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100">

        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Global Certification & Compliance Services
        </h3>

        <ul className="space-y-3 text-gray-600   text-sm leading-relaxed">

        <Link href="https://www.anglobalservices.com/foreign-manufacturers-certification-scheme-fmcs" target='blank'>  <li className='hover:text-blue-500'>✔ ISI Mark & FMCS Certification</li></Link>        
        <Link href="https://www.anglobalservices.com/bis-crs-registration-electronic-products" target='blank'>  <li className='hover:text-blue-500'>✔ CRS for Electronics & IT Goods</li></Link>
        <Link href="https://www.anglobalservices.com/hallmarking" target='blank'>  <li className='hover:text-blue-500'>✔ BIS Hallmarking for Jewellery</li></Link>        
        <Link href="https://www.anglobalservices.com/bee_services" target='blank'>  <li className='hover:text-blue-500'>✔ BEE Registration Services</li></Link>    
        <Link href="https://www.anglobalservices.com/trademark-registration-services" target='blank'>  <li className='hover:text-blue-500'>✔ Trademark Registration</li></Link> 
        <Link href="https://www.anglobalservices.com/epr-registration-services" target='blank'>  <li className='hover:text-blue-500'>✔ EPR Authorization (E-Waste)</li></Link>      
        <Link href="https://www.anglobalservices.com/bis-registration-for-solar-panels" target='blank'>  <li className='hover:text-blue-500'>✔ Solar Panel BIS Registration</li></Link>       
        <Link href="https://www.anglobalservices.com/wpc-certification-services" target='blank'>  <li className='hover:text-blue-500'>✔ WPC & TEC Certification</li></Link>  
        <Link href="https://www.anglobalservices.com/msme-nsic-registration" target='blank'>  <li className='hover:text-blue-500'>✔ MSME & NSIC Certification</li></Link>    
        <Link href="https://www.anglobalservices.com/nabl-accreditation-services" target='blank'>  <li className='hover:text-blue-500'>✔ NABL Accreditation Consultancy</li></Link>

        </ul>

        <p className="mt-6 text-gray-600 text-sm">
          With our expertise, brands achieve seamless market entry, 
          regulatory compliance, and international recognition.
        </p>

      </div>

    </div>

  </div>

</section>

      <div className="max-w-7xl mx-auto mt-10 px-6 space-y-12">
        {/* Health Benefits Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl py-5 font-semibold text-yellow-900 mb-6 text-center">Health Benefits of Nirvana Nuts Makhana</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900 text-17px">
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition"> <strong className='text-lg'>Nutrient-Rich:</strong> Packed with protein, fiber, and essential minerals.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition"> <strong className='text-lg'>Low-Calorie:</strong> Ideal for weight management and low in fat.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition"> <strong className='text-lg'>Antioxidant-Rich:</strong> Helps reduce oxidative stress and lower disease risks.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition"> <strong className='text-lg'>Heart Health:</strong> High in magnesium and low in sodium.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition"> <strong className='text-lg'>Digestive Aid:</strong> Promotes healthy digestion and prevents constipation.</li>
          </ul>
        </section>

        {/* image  */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 py-3 max-w-6xl mx-auto">
          {[
            { src: "/about-image-04.webp", alt: "Makhana Bowl" },
            { src: "/about-image-05.webp", alt: "Nirvana Nuts Packet" },
            { src: "/about-image-06.avif", alt: "Roasted makhana" },

          ].map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              height={200}
              width={200}
              priority
              className={`rounded-lg shadow-lg hover:scale-105 transition-transform duration-500  delay-${i * 100} w-full h-auto object-cover`}
            />
          ))}
        </section>

        {/* Cultural Origin Section */}
        <section className="max-w-6xl  mx-auto mb-16 text-center space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-900">Cultural Heritage of Makhana</h2>
          <p className="text-gray-900 max-w-5xl mx-auto">
            Makhana, also known as fox nuts, originates from the Mithila region of Bihar.
            It has been part of traditional Indian medicine for centuries, used in Ayurveda
            for its health benefits. Rich in nutrients, makhana is a staple in Indian households
            and symbolizes tradition and nutritional excellence.
          </p>
        </section>

        {/* contact us */}
        <section className="bg-white py-10 px-6 text-center rounded-xl shadow-md mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-900 mb-6 max-w-xl mx-auto">
            Have questions about our products? We’d love to hear from you!
          </p>
          <a href="/contact" >
            <button
              className="bg-linear-to-r from-amber-500 to-red-500 border-2  border-amber-400  focus:border-red-600 hover:scale-112 text-white  px-6 py-2 rounded-lg shadow-md hover:bg-amber-800 transition cursor-pointer"
            >
              Contact Us
            </button>
          </a>
        </section>

      </div>
    </main>

  );
}

export default page;


