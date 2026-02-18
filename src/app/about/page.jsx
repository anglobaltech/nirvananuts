
import Image from 'next/image';
import React from 'react'

export const metadata={
  title:"About Nirvana Nuts – Crafted for Healthy Living",
  description:"At Nirvana Nuts, we create thoughtfully sourced makhana and nutritious snacks designed for modern lifestyles, combining purity, taste and quality."
}


const page = () => {
  const steps=[
    {
      title:"Premium Raw Nut Sourcing ",
      description: "Hand‑picked nuts sourced directly from trusted farms, sun‑dried for freshness and spoilage prevention."
    },
    {
      title:"Precision Nut Calibration",
      description:"Nuts sorted by size (18mm–24mm) for efficient shelling and minimal kernel breakage."
    },
    {
      title:"Hygienic Nut Cleaning ",
      description:" Foreign matter removed with sieves and manual sorting to ensure purity and safe processing."
    },
    {
      title:"Flavorful Nut Roasting",
      description:"Heat‑treated to enhance taste, brittle shells ease extraction, and natural oils are preserved."
    },
    {
      title:"Natural Nut Cooling",
      description:"Roasted nuts cooled gradually to maintain texture, prevent scorching, and prepare for shelling. "
    },
        {
      title:"Efficient Nut Shelling",
      description:"Kernels extracted manually or mechanically for clean, whole cashew kernels."
    },
        {
      title:"Pure Kernel Separation",
      description:"Advanced blowers and shakers ensure maximum yield and shell‑free kernels."
    },
        {
      title:"Smart Kernel Pre‑grading",
      description:"Initial sorting improves efficiency and reduces grading workload."
    },
        {
      title:"Moisture‑Controlled Drying",
      description:"Kernels dried to safe levels (3–6%) for longer shelf life and pest resistance. "
    },
        {
      title:"Smooth Kernel Peeling ",
      description:"Testa removed for blanched, premium‑quality kernels with improved appearance."
    },
        {
      title:"International Kernel Grading",
      description:"Kernels sorted by W180, W240, splits, and other global export standards."
    },
        {
      title:"Kernel Rehumidification",
      description:"Moisture adjusted to reduce breakage during transport and maintain quality."
    },
      {
      title:"Gourmet Nut Flavoring",
      description:"Salted, spiced, honey‑coated, or chocolate‑dipped for diverse consumer preferences."
    },
    {
      title:"Rigorous Quality Testing",
      description:"Chemical, hardness, and dimensional checks ensure safety and consistency. "
    },
    {
      title:"Freshness‑Preserving Packaging",
      description:"Sealed in pouches, jars, or tins to retain flavor, protect from contaminants, and inform consumers. "
    },
  ]
  return (
    <main className="min-h-screen  bg-linear-to-r  from-white via-gray-100 to-white  ">
      <div className="md:w-7xl lg:w-7xl  mt-5 items-center p-8 mx-auto space-y-6  ">

        <div className="flex justify-center mt-10">
        </div>
        <h1 className="text-4xl font-bold md:p-3 text-center md:text-4xl text-yellow-900 ">
          About Nirvana Nuts – Pure Nutrition You Can Trust
        </h1>
        <div className="text-17px text-gray-900 items-center text-left leading-relaxed max-w-8xl mx-auto ">
          <h2 className='text-2xl font-bold text-yellow-800 py-1'>Our Purpose</h2>
          <p className='mb-2'>At Nirvana Nuts, we believe healthy eating should be simple, honest, and accessible. Our journey began with the aim to replace overly processed snacks with natural, nutrient-rich alternatives that suit Indian tastes and lifestyles.</p>
          <h2 className='text-2xl font-bold text-yellow-800 py-1'>Our Expertise</h2>
          <p className=' mb-2'>Backed by research-driven sourcing and strict quality standards, Nirvana Nuts focuses on delivering clean-label nutrition through makhana, nuts, dry fruits, and protein supplements. Our team prioritizes ingredient integrity, freshness, and transparency.</p>
          <h2 className='text-2xl font-bold text-yellow-800 py-1'>Our Commitment</h2>
          <ul className='mb-6 list-disc list-inside'>
            <li>Quality-checked sourcing</li>
              <li>Nutrition-first product development</li>
              <li>Clear labeling & honest communication</li>
              <li>Customer trust above everything else</li>
          </ul>


          {/* <p className="mb-2">
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
          </p> */}
          <p className="text-17px text-gray-900 mb-2  text-left leading-relaxed max-w-8xl mx-auto ">Nirvana Nuts is proudly maintained by <span className='text-lg text-black font-bold'>"An global Services"</span> ensuring that every customer enjoys premium dry fruits and healthy snacks with world‑class standards. By combining local trust with international reach, we deliver makhana, almonds, and mixed nut blends that are fresh, nutritious, and accessible worldwide.</p>
          <p className="text-17px text-black  mb-2 text-left leading-relaxed max-w-8xl mx-auto ">Our commitment to quality, integrity, and customer satisfaction is supported by seamless logistics and responsive support, making Nirvana Nuts not just a brand, but a global partner in healthy snacking.</p>

        </div>
        <div >
        </div>
        <div>
          <a href="http://www.anglobalservices.com/" target="_blank" rel="noopener noreferrer"> <h2  className='text-4xl font-bold text-center text-blue-600 mb-8 '>An Global Services </h2></a>
          <p className="text-17px text-gray-900 mb-2  text-left leading-relaxed max-w-8xl mx-auto ">At Nirvana Nuts, We also deliver trusted global certification and compliance solutions to help businesses meet international standards. Our services include (ISI mark), Foreign Manufactures Certification Scheme (FMCS), Compulsory Registration Scheme (CRS) for Electronics & IT Goods, BIS hallmarking of precious For metals/jewellery, BEE Registration Services, Trademark Registration Services, CE Certification Services, EPR Authorization (for e-waste), Solar Panel BIS Registration Services, WPC Approval and TEC Certification, MSME & NSIC Certification, WMI Certification, NABL Accreditation Consultancy, WPC License and many more. With our expertise, brands can achieve seamless market entry, regulatory compliance, and global recognition </p>
          <p className="text-17px text-gray-900 mb-2  text-left leading-relaxed max-w-8xl mx-auto ">View our website for more details</p>
          <a href="https://www.anglobalservices.com/" target='blank' >
          <div className='text-center'>
            <button className='bg-linear-to-r from-amber-500 to-amber-700 hover:scale-110 text-shadow-white transition-shadow p-2 rounded-2xl mt-6  cursor-pointer  text-2xl font-bold  hover:bg-amber-600 shadow-2xl'>Visit Our Website</button>
            </div>
          </a>
        </div>

        {/* Production Timeline Section */}
    <section className=" py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-4xl font-bold text-yellow-900 mb-16">
          Premium Nut Production
        </h2>

        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-4 top-0 w-1 h-full bg-yellow-300"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-16">

                {/* Step Circle */}
                <div className="absolute left-0 top-2 w-8 h-8 flex items-center justify-center bg-yellow-700 text-white rounded-full font-bold shadow-md">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-yellow-200">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>


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


