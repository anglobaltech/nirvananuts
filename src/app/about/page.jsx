"use client"
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-r from-white via-gray-100 to-white  ">
      <section >
        <div className='mt- h-50   w-full ' >
          <h1 className='text-amber-600  bg-gray-100 font-bold  p-35 h-70  text-center text-5xl'>About Nirvana Nuts</h1>
        </div>
      </section>

      {/* Hero Section */}
      <section className="md:w-7xl mt-5 items-center p-8 mx-auto space-y-6  mb-16">
        <div className="flex justify-center mt-10">
        </div>
        <h1 className="text-4xl font-bold text-center text-yellow-900 ">
          Welcome to Nirvana Nuts
        </h1>
        <div className="text-lg text-black items-center text-left leading-relaxed max-w-8xl mx-auto ">
          <p className="mb-2">
            At Nirvana Nuts, we craft healthy, flavorful snacks using premium handpicked makhana (fox nuts).
            Our mission is to bring joy to snacking without compromising on health, ensuring every bite
            is packed with nutrition and taste.
          </p>
          <p className="mb-2">
            Nirvana Nuts is a customer‑focused brand redefining healthy snacking in India. With a vision to deliver premium quality dry fruits, makhana, almonds, and mixed nuts at the best price, the brand combines taste, nutrition, and sustainability.
          </p>
          <p className="mb-2">Guided by core values of quality, integrity, leadership, collaboration, and customer satisfaction, Nirvana Nuts ensures every product supports wellness while offering convenience through its direct‑to‑consumer e‑commerce model
          </p>
          <p className="mb-2">From the popular Makhana varieties like Plain, Cheese Masti, and Especially for Fast to premium crunchy almonds and mixed nut blends, Nirvana Nuts provides snacks that are fresh, nutritious, and delivered straight to your door.
          </p>
          <p className="text-lg text-black mb-2  text-left leading-relaxed max-w-8xl mx-auto ">Nirvana Nuts is proudly maintained by <span className='text-lg text-black font-bold'>"An global Services"</span> ensuring that every customer enjoys premium dry fruits and healthy snacks with world‑class standards. By combining local trust with international reach, we deliver makhana, almonds, and mixed nut blends that are fresh, nutritious, and accessible worldwide.</p>
          <p className="text-lg text-black  mb-2 text-left leading-relaxed max-w-8xl mx-auto ">Our commitment to quality, integrity, and customer satisfaction is supported by seamless logistics and responsive support, making Nirvana Nuts not just a brand, but a global partner in healthy snacking.</p>

        </div>
        <div >
        </div>
        <div>
          <h1 className='text-4xl font-bold text-center text-blue-600 mb-8 '>An Global Services </h1>
          <p className="text-lg text-black mb-2  text-left leading-relaxed max-w-8xl mx-auto ">At Nirvana Nuts, We also deliver trusted global certification and compliance solutions to help businesses meet international standards. Our services include ISI Mark Certification, FMCS, CRS, hallmarking of precious metals and jewellery, BEE Registration, EPR Authorization for e‑waste, WPC Approval, TEC Certification, NSIC, WMI, NABL Accreditation, and more. With our expertise, brands can achieve seamless market entry, regulatory compliance, and global recognition </p>
          <p className="text-lg text-black mb-2  text-left leading-relaxed max-w-8xl mx-auto ">View our website for more details</p>
          <a href="https://www.anglobalservices.com/" target='blank' >
          <div className='text-center'>
            <button className='bg-black border-amber-400 border-3 text-shadow-white transition-shadow p-2 rounded-2xl mt-6  cursor-pointer  text-2xl font-bold  hover:bg-amber-600 shadow-2xl'>Visit Our Website</button>
            </div>
          </a>
        </div>

        {/* Production Timeline Section */}
        <section>
          <div className=''>
            <h1 className='text-center items-center text-amber-800 text-3xl font-bold'>Premium Nut Production</h1>
            <ul>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Premium Raw Nut Sourcing :</span> Hand‑picked nuts sourced directly from trusted farms, sun‑dried for freshness and spoilage prevention.</li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Precision Nut Calibration :</span>Nuts sorted by size (18mm–24mm) for efficient shelling and minimal kernel breakage. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Hygienic Nut Cleaning :</span> Foreign matter removed with sieves and manual sorting to ensure purity and safe processing.</li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Flavorful Nut Roasting :</span>Heat‑treated to enhance taste, brittle shells ease extraction, and natural oils are preserved. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Natural Nut Cooling :</span>Roasted nuts cooled gradually to maintain texture, prevent scorching, and prepare for shelling. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Efficient Nut Shelling :</span>Kernels extracted manually or mechanically for clean, whole cashew kernels. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Pure Kernel Separation :</span>Advanced blowers and shakers ensure maximum yield and shell‑free kernels. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Smart Kernel Pre‑grading :</span>Initial sorting improves efficiency and reduces grading workload. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Moisture‑Controlled Drying :</span>Kernels dried to safe levels (3–6%) for longer shelf life and pest resistance. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Smooth Kernel Peeling :</span>Testa removed for blanched, premium‑quality kernels with improved appearance. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>International Kernel Grading :</span>Kernels sorted by W180, W240, splits, and other global export standards. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Kernel Rehumidification :</span>Moisture adjusted to reduce breakage during transport and maintain quality. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Gourmet Nut Flavoring :</span>Salted, spiced, honey‑coated, or chocolate‑dipped for diverse consumer preferences. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Rigorous Quality Testing :</span>Chemical, hardness, and dimensional checks ensure safety and consistency. </li>
              <li className="text-lg text-black   m-5  text-left leading-relaxed max-w-8xl mx-auto "> <span className=' text-xl font-bold  text-center text-yellow-900 '>Freshness‑Preserving Packaging :</span>Sealed in pouches, jars, or tins to retain flavor, protect from contaminants, and inform consumers. </li>
            </ul>
          </div>
        </section>

        {/* Health Benefits Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-yellow-900 mb-6 text-center">Health Benefits of Nirvana Nuts Makhana</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 text-sm">
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition">🌱 <strong>Nutrient-Rich:</strong> Packed with protein, fiber, and essential minerals.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition">⚡ <strong>Low-Calorie:</strong> Ideal for weight management and low in fat.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition">🛡️ <strong>Antioxidant-Rich:</strong> Helps reduce oxidative stress and lower disease risks.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition">❤️ <strong>Heart Health:</strong> High in magnesium and low in sodium.</li>
            <li className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition">🍃 <strong>Digestive Aid:</strong> Promotes healthy digestion and prevents constipation.</li>
          </ul>
        </section>

        {/* image  */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 py-12 max-w-6xl mx-auto">
          {[
            { src: "/about-image-04.jpeg", alt: "Makhana Bowl" },
            { src: "/about-image-05.jpeg", alt: "Nirvana Nuts Packet" },
            { src: "/about-image-06.png", alt: "Roasted Almonds" },

          ].map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={`rounded-lg shadow-lg hover:scale-105 transition-transform duration-500  delay-${i * 100} w-full h-auto object-cover`}
            />
          ))}
        </section>

        {/* Cultural Origin Section */}
        <section className="max-w-6xl  mx-auto mb-16 text-center space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-900">Cultural Heritage of Makhana</h2>
          <p className="text-yellow-700 max-w-3xl mx-auto">
            Makhana, also known as fox nuts, originates from the Mithila region of Bihar.
            It has been part of traditional Indian medicine for centuries, used in Ayurveda
            for its health benefits. Rich in nutrients, makhana is a staple in Indian households
            and symbolizes tradition and nutritional excellence.
          </p>
        </section>

        {/* contact us */}
        <section className="bg-white py-16 px-6 text-center rounded-xl shadow-md mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Have questions about our products? We’d love to hear from you!
          </p>
          <a href="/contact" >
            <button
              className="bg-amber-600 text-white  px-8 py-3 rounded-lg shadow-md hover:bg-amber-800 transition cursor-pointer"
            >
              Contact Us
            </button>
          </a>
        </section>
      </section>
    </div>

  );
}

export default page;


