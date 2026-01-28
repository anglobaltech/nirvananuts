// import React from 'react'

// const page = () => {
//   return (
//     <div className='min-h-screen bg-white'>
//     <div className='p-8 h-600 w-600 items-center'>
//       <h1 className='text-black mt-20 m-30' >Whey Protein – The Muscle Builder</h1>
//       <p className="mt-4 text-gray-700 text-lg leading-relaxed">
//       Whey is a high-quality protein derived from milk during the
//       cheese-making process. It contains all 9 essential amino acids and
//       is highly digestible.
//       </p>
//       </div>
      
//     </div>
//   )
// }

// export default page


import React from "react";

const Page = () => {
  return (
    // <div className="min-h-screen bg-white flex justify-baseline">
    //   <div className="max-w-3xl px-8 py-20 ">
    //     <h1 className="text-3xl font-semibold m-40 text-black mb-6">
    //       Whey Protein – The Muscle Builder
    //     </h1>

    //     <p className="text-gray-700 text-lg leading-relaxed">
    //       Whey is a high-quality protein derived from milk during the
    //       cheese-making process. It contains all 9 essential amino acids and
    //       is highly digestible.
    //     </p>
    //   </div>
    // </div>




    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#fbf7ef] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl mt-20 md:text-4xl text-amber-900 font-bold ">
            Whey Protein – The Muscle Builder
          </h1>
          <p className="mt-6 text-gray-700 text-base md:text-lg max-w-3xl leading-relaxed">
            Whey is a high-quality protein derived from milk during the
            cheese-making process. It contains all 9 essential amino acids
            and is highly digestible.
          </p>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-amber-900 font-semibold mb-10">
            The Three Main Types
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl text-amber-800 font-semibold mb-3">
                Whey Protein Concentrate (WPC)
              </h3>
              <p className="text-gray-600 mb-4">
                70–80% protein with natural fats and lactose.
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Nutrient dense & immune support</li>
                <li>Better taste & texture</li>
                <li>Cost-effective</li>
                <li>Slower digestion</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl text-amber-800 font-semibold mb-3">
                Whey Protein Isolate (WPI)
              </h3>
              <p className="text-gray-600 mb-4">
                90%+ protein, almost no fat or lactose.
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Lactose-friendly</li>
                <li>Low calorie</li>
                <li>Fast absorption</li>
                <li>High purity</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl text-amber-800 font-semibold mb-3">
                Whey Protein Hydrolysate (WPH)
              </h3>
              <p className="text-gray-600 mb-4">
                Pre-digested whey for ultra-fast absorption.
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Fastest digestion</li>
                <li>Easy on stomach</li>
                <li>Hypoallergenic</li>
                <li>Elite recovery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <h2 className="text-2xl text-amber-900 md:text-3xl font-semibold mb-8">
            Summary Comparison
          </h2>

          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-amber-200">
              <tr className=" text-black">
                <th className="text-left p-4 ">Type</th>
                <th className="text-left p-4">Protein</th>
                <th className="text-left p-4">Digestion</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t text-gray-900">
                <td className="p-4">Concentrate</td>
                <td className="p-4">70–80%</td>
                <td className="p-4">Medium</td>
                <td className="p-4">Low</td>
                <td className="p-4">Daily Fitness</td>
              </tr>
              <tr className="border-t text-gray-900">
                <td className="p-4">Isolate</td>
                <td className="p-4">90%+</td>
                <td className="p-4">Fast</td>
                <td className="p-4">Medium</td>
                <td className="p-4">Weight Loss</td>
              </tr>
              <tr className="border-t text-gray-900">
                <td className="p-4">Hydrolysate</td>
                <td className="p-4">80–90%</td>
                <td className="p-4">Super Fast</td>
                <td className="p-4">High</td>
                <td className="p-4">Elite Recovery</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Page;

