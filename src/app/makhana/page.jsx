import React from 'react'
import Image from 'next/image';

const products = [
  {
    name: "Roasted & Salted Makhana – The Classic Snack",
    description: "Crunchy Roasted & Salted Makhana, lightly tossed in ghee or olive oil with Sendha Namak. A protein‑rich, gluten‑free superfood, perfect for fasting (Vrat) and healthy everyday snacking.",
    image: "/product-05.avif",
  },
  {
    name: "Modern Savory Makhana Flavors – Peri‑Peri, Cheese, Tomato & Mint",
    description: "Enjoy Savory Makhana in exciting flavors – Peri‑Peri chili, Cheese/White Cheddar, Tangy Tomato, and Mint Pudina. High‑protein, gluten‑free, antioxidant‑rich fox nuts, a healthy alternative to chips and popcorn.",
    image: "/product-03.avif",
  },
  {
    name: "Sweet & Gourmet Makhana – Premium Healthy Snack",
    description: "Crunchy Sweet & Gourmet Makhana, coated with caramel, chocolate, jaggery, or honey. A protein‑rich, gluten‑free superfood, perfect for festive gifting, healthy desserts, and guilt‑free snacking.",
    image: "/product-04.avif",
  },
  {
    name: "Fusion & Spicy Makhana – Bold & Flavorful Healthy Snack",
    description: "Experience the fiery taste of Fusion & Spicy Makhana, roasted fox nuts seasoned with exotic spices. High in protein, gluten‑free, and rich in antioxidants, this crunchy snack is a guilt‑free alternative to chips, perfect for fitness lovers and spice enthusiasts",
    image: "/about-image-04.webp",
  },
];
const page = () => {


  return (
    <section className='min-h-screen  bg-white mt-15 to-amber-100 py-12  md:px-12'>

      <h1 className=' text-3xl md:text-4xl font-bold  text-amber-600 text-center px-7 md:p-10 md:shadow-amber-800'>Premium Makhana- Healthy and flavorful Snacking</h1>
      <div className='text-gray-900  ml-7   md:ml-20 md:max-w-7xl'>

        <div className='text-gray-900   text-sm p-4 md:p-0 '>
          <h2 className='text-yellow-700 text-2xl  md:text-3xl'>What make  makhana a smart snack choices?</h2>
          <p className='text-gray-900 py-4 text-lg'>Makhana, also known as fox nuts or lotus seeds, is naturally light, protein-rich, and easy to digest. At Nirvana Nuts, we focus on maintaining purity and flavor in every batch. Our roasting process enhances crispness while preserving nutritional value.</p>



          <h2 className=' text-3xl md:text-3xl font-bold  text-amber-600 text-center px-6 mt-10 md:shadow-amber-800'>Explore Our Makhana Flavors</h2>

          <div className="max-w-6xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-2xl p-6 mt-12">

            {/* Image */}
            <div className="w-full">
              <Image
                src="/image-quality-01.avif"
                alt="Classic Salted Makhana"
                width={600}
                height={400}
                className="w-120 h-62.5 sm:h-75 md:h-80 object-fill rounded-xl"
              />
            </div>

            {/* Text */}
            <div className='h-full' >
              <h2 className="text-3xl mt-3 sm:text-3xl font-bold text-amber-600 mb-6">
                Classic Salted Makhana
              </h2>
              <p className="text-gray-900 text-lg">
                Our Classic Salted Makhana is gently roasted and lightly seasoned with pure salt to deliver a clean, natural flavor. A wholesome, protein-rich snack that’s perfect for everyday healthy munching.
              </p>
              <ul className='list-disc list-inside mx-auto text-lg py-6 '>
                <li>Made from premium quality fox nuts (makhana)</li>
                <li>Roasted, not fried for a lighter bite</li>
                <li>Lightly salted to enhance natural taste</li>
                <li>High in protein and low in calories</li>
                <li>Gluten-free and easy to digest</li>
                <li>Ideal for fasting, tea-time, or office snacks</li>
              </ul>
            </div>

          </div>

          {/* last */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-2xl p-6 mt-12">

            {/* Text */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-3xl font-bold mt-3 text-amber-600 mb-6">
                Modern Savory Flavored Makhana
              </h2>
              <p className="text-gray-900 text-lg">
                Experience a modern twist on traditional makhana with rich savory flavors and exciting spice blends. A crunchy, nutritious alternative to fried chips and processed snacks.
              </p>
              <ul className='list-disc list-inside text-lg py-6'>
                <li>Infused with bold and aromatic savory spices</li>
                <li>Perfectly roasted for extra crunch</li>
                <li>Healthy substitute for fried snacks</li>
                <li>Protein-rich and low-fat snack option</li>
                <li>Great for travel, parties, and evening cravings</li>
                <li>Crafted for modern taste preferences</li>
              </ul>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <Image
                src="/about-image-06.avif"
                alt="Savory Makhana"
                width={600}
                height={400}
                className="w-120 h-62.5 sm:h-75 md:h-80 object-fill rounded-xl"
              />
            </div>

          </div>
          {/* last */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-2xl p-6 mt-12">

            {/* Image */}
            <div className="w-full">
              <Image
                src="/product-07.avif"
                alt="Sweet Gourmet Flavors Makhana"
                width={600}
                height={400}
                className="w-120 h-62.5 sm:h-75 md:h-80 object-fill rounded-xl"
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-3xl mt-3 font-bold text-amber-600 mb-6">
                Sweet Gourmet Flavors Makhana
              </h2>
              <p className="text-gray-900 text-lg">
                Indulge in a delightful sweet crunch with our Sweet Gourmet Makhana. Carefully crafted with premium ingredients, it offers the perfect balance of taste and nutrition.
              </p>
              <ul className='list-disc list-inside text-lg py-6 '>
                <li>Made from premium quality fox nuts (makhana)</li>
                <li>Roasted, not fried for a lighter bite</li>
                <li>Lightly salted to enhance natural taste</li>
                <li>High in protein and low in calories</li>
                <li>Gluten-free and easy to digest</li>
                <li>Ideal for fasting, tea-time, or office snacks</li>
              </ul>
            </div>

          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-2xl p-6 mt-12">

            {/* Text */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-3xl mt-3 font-bold text-amber-600 mb-6">
                Fusion Spicy Makhana
              </h2>
              <p className="text-gray-900 text-lg">
                Turn up the heat with Fusion Spicy Makhana, seasoned with a vibrant blend of spices for a bold and exciting taste. A light, protein-rich snack made for spice lovers
              </p>
              <ul className='list-disc list-inside text-lg py-6'>
                <li>Unique fusion of traditional and modern spices</li>
                <li>Spicy kick in every crunchy bite</li>
                <li>Roasted for a light and airy texture</li>
                <li>High-protein, low-calorie snack</li>
                <li>Perfect for evening tea and gatherings</li>
                <li>Ideal for those who love bold flavors</li>
              </ul>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <Image
                src="/home-cover-02.avif"
                alt="Fusion Spicy Makhana"
                width={600}
                height={400}
                className="w-120 h-62.5 sm:h-75 md:h-80 object-fill rounded-xl"
              />
            </div>

          </div>

        </div>
        <div>
        </div>



        <h2 className='text-yellow-700 text-2xl mt-10 py-3'>Health Benefits of Makhana</h2>
        <p className='text-lg'>Makhana is known for being low in calories and rich in essential nutrients. It supports mindful eating and can be a smart alternative to heavily processed snacks. Its light texture makes it suitable for all age groups.</p>

        <h2 className='text-yellow-700 text-2xl mt-5 py-3'>Why Choose Nirvana Nuts Makhana?</h2>
        <p className='text-lg mb-10'>Nirvana Nuts ensures strict quality control, hygienic processing, and carefully sourced ingredients. Our goal is to provide consistent taste and premium crunch in every pack. Each flavor is crafted to meet the expectations of modern, health-conscious consumers.</p>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-14 p-10 md:px-8 md:py-12 max-w-7xl mx-auto'>
        {products.map((product, index) => (
          <div
            key={index}
            className='h-140 bg-white rounded-xl shadow-md overflow-hidden   duration-300 hover:scale-105 hover:shadow-lg'
          >
            <div className=" relative w-full aspect-4/3 sm:aspect-3/2 lg:aspect-4/3">
              <Image
                src={product.image}
                alt={product.description}
                height={100}
                width={200}
                className=' shadow-lg hover:scale-105   w-full   object-fill'
              />
            </div>
            <div className="p-5 flex flex-col justify-between h-55">
              <div>
                <h2 className="text-lg font-semibold text-amber-900">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
            </div>
          </div>
        )
        )}

      </div>

      {/* contact us */}

      <section className="bg-white py-16 px-6 text-center rounded-xl  mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Have questions about our products? We’d love to hear from you!
        </p>

        <a href="/contact">
          <button
            className="bg-linear-to-r from-amber-500 to-red-500 border-2  border-amber-400  focus:border-red-600 hover:scale-112 text-white cursor-pointer px-6 py-2 rounded-lg shadow-md  transition"
          >
            Contact Us
          </button>
        </a>
      </section>

    </section>
  )
}

export default page
