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
    {
    name: "Whey Protein – The Muscle Builder",
    description: "Boost strength and recovery with premium whey protein powder, rich in all 9 essential amino acids. Fast‑absorbing, highly digestible, perfect for athletes, gym enthusiasts, and fitness lovers",
    image: "/whey-protein-01.avif",
  },
];

const page = () => {
  return (
    <section className="min-h-screen  bg-white mt-20 to-amber-100 py-12  md:px-12">
      {/* about nirvana nuts */}
      <h1 className='text-4xl font-bold  text-amber-600 text-center px-6 md:shadow-amber-800'>Welcome  to  NIRVANA  NUTS</h1>

      <div className="flex flex-col md:flex-row mb-10 items-center justify-between bg-white  p-2 mt-4 rounded-xl shadow-md">
        <div className="text-gray-900 text-sm md:text-xl md:w-1/2 ml-7 space-y-6 md:pr-8">
          <h2 className='text-4xl text-amber-700 '>About Nirvana Nuts</h2>
          <p>
            At Nirvana Nuts, we believe snacking should be both delightful and
            nourishing. That's why our Makhana is carefully sourced from the best
            farms, ensuring superior quality and purity.
          </p>
          <p>
            Our Makhana is roasted to perfection, offering a crunchy, delicious snack
            that's as good for your body as it is for your taste buds. Our variety of
            flavors, from classic salted to exotic spice blends, caters to every
            palate, ensuring that every bite is a step towards snack enlightenment.
          </p>
          <p>
            Discover the ultimate in healthy, delicious snacking with Nirvana Nuts
            today!
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/product-welcome.avif"
            alt="Nirvana Nuts Makhana"
            width={500}
            height={500}
            className="object-contain rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>

      <div className='text-gray-900 ml-7 text-sm md:text-xl md:ml-20 max-w-7xl '>
      <h2 className="text-center  text-3xl md:text-4xl font-bold text-amber-900  mb-10">
        Our Products
      </h2>

        <div className='text-yellow-700 font-semibold text-center '>
        <h2 className='text-xl '>1. Premium Makhana (Fox Nuts) – Light, Crunchy & Healthy</h2>
        <h3 className='text-base ml-5 '>(India’s Favourite Guilt-Free Snack)</h3>
        </div>
        <p className='text-gray-900 py-4  '>Nirvana Nuts premium makhana is naturally low in calories and high in plant-based protein. Carefully roasted and packed, our fox nuts retain their crunch, taste, and nutritional value.</p>
        <h3 className='text-yellow-700 text-lg'>Health Benefits of Makhana</h3>
        <ul className='list-disc list-inside text-gray-900'>
          <li>High in protein & antioxidants</li>
          <li>Low fat & low calorie</li>
          <li>Supports weight management</li>
          <li>Gluten-free & easy to digest</li>
          <li>Ideal for fasting & mindful snacking</li>
        </ul>
        <h3 className='text-yellow-700 text-lg' >Best for</h3>
        <ul className='list-disc list-inside text-gray-900 '>
          <li>Office & evening snacks</li>
          <li>Fitness & weight-loss diets</li>
          <li>Kids, adults & seniors</li>
        </ul>
        <div className='text-yellow-700 font-semibold py-4 text-center'>
        <h2 className='text-xl '>2. Whey Protein – Clean Muscle-Building Nutrition</h2>
        <h2 className='text-base ml-5 '>(High-Quality Protein for Strength & Recovery)</h2>
        </div>
        <p className=' py-2 '>Nirvana Nuts whey protein is derived from milk and contains all 9 essential amino acids, making it a complete and highly digestible protein source.</p>
        <h3 className='text-yellow-700 text-lg font-semibold py-1'>Types of Whey Protein:-</h3>
        <h4 className='text-yellow-700 text-base py-1.5' >Whey Protein Concentrate (WPC)</h4>
        <ul className='list-disc list-inside'>
          <li>70–80% protein</li>
          <li>Budget-friendly daily protein</li>
          <li>Better taste & sustained digestion</li>
        </ul>
        <h4 className='text-yellow-700 text-base py-1.5'>Whey Protein Isolate (WPI)</h4>
        <ul className='list-disc list-inside'>
          <li>90%+ protein</li>
          <li>Low lactose & low calorie</li>
          <li>Fast post-workout recovery</li>
        </ul>
        <h4 className='text-yellow-700 text-base py-1.5'>Whey Protein Hydrolysate (WPH)</h4>
        <ul className='list-disc list-inside mb-10'>
          <li>Pre-digested & fastest absorption</li>
          <li>Gentle on digestion</li>
          <li>Ideal for advanced athletes</li>
        </ul>
      </div>
      {/* Product Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:max-w-7xl ml-7 m-10 md:m-0 md:ml-20 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className=" h-138 bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Product Image */}
<div className="relative w-full aspect-4/3 sm:aspect-3/2 lg:aspect-4/3">
  <Image
    src={product.image}
    alt={product.name}
    fill
    sizes="(max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          33vw"
    className="object-fill rounded-t-xl"
    priority
  />
</div>
            {/* Product Info */}
            <div className="p-5 flex flex-col justify-between h-49">
              <div>
                <h3 className="text-lg font-semibold text-amber-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>
                <p className="text-md font-bold text-amber-700 mt-2">
                  {product.price}
                </p>
              </div>

              {/* Add to Cart Button */}
              {/* <button className="mt-4 bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition duration-300">
                button
              </button> */}

          {product.name.includes("Whey Protein") && (
          <a href="/whey-protein">
          <button className="mt-6 bg-radial from-amber-600 border-2   to-amber-700 cursor-pointer border-amber-900 outline-2 outline-offset-2 text-white p-2 rounded-lg hover:text-amber-300 transition duration-300">
            View More
          </button>
          </a>
        )}

            </div>
          </div>
        ))}
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
  );
}

export default page;