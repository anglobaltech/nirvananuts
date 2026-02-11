"use client"
import Image from "next/image";
import React from "react";



const page = () => {
  return (
    <main className="bg-gray-50 min-h-screen   ">
    <section className="p-8  ">
      <div className="max-w-7xl" >
        <h1 className="text-4xl mt-20 p-10 font-bold text-center text-gray-800 mb-12">
          🥛 Lactose – Dairy Ingredient
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/food-ingredient.webp"
              alt="Lactose Powder and Milk"
              width={200} height={200}
              priority
              className=" w-full h-full object-cover"

            />
          </div>
          <div >
            <h2 className="text-2xl font-bold text-amber-600 mb-4">
              1. Lactose
            </h2>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              What is Lactose?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lactose is a naturally occurring disaccharide sugar found in milk
              and dairy products. It consists of glucose and galactose
              (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) and serves as an important
              energy source.
            </p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Benefits
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
              <li>Improves absorption of calcium, magnesium & zinc</li>
              <li>Low impact on tooth decay</li>
              <li>Low glycemic index</li>
              <li>Promotes healthy intestinal flora</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mb-3">Specifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm text-left">
                <thead className="bg-amber-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Parameter</th>
                    <th className="px-4 py-2">Low pH</th>
                    <th className="px-4 py-2">Low pH IP</th>
                    <th className="px-4 py-2">Powder 99%</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="px-4 py-2">pH</td>
                    <td className="px-4 py-2">3.5 – 4.5</td>
                    <td className="px-4 py-2">3.5 – 4.5</td>
                    <td className="px-4 py-2">5.5 – 7.5</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-4 py-2">Moisture</td>
                    <td className="px-4 py-2">≤0.10%</td>
                    <td className="px-4 py-2">≤0.50%</td>
                    <td className="px-4 py-2">0.3%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Protein</td>
                    <td className="px-4 py-2">≤0.05%</td>
                    <td className="px-4 py-2">≤0.02%</td>
                    <td className="px-4 py-2">≤0.3%</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-4 py-2">Lactose</td>
                    <td className="px-4 py-2">≥99.75%</td>
                    <td className="px-4 py-2">≥99.83%</td>
                    <td className="px-4 py-2">≥99.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* second ingredient */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-15 items-start">

        <div className="rounded-xl overflow-hidden  shadow-lg">
          <Image
            src="/food-ingredient-02.webp"
            alt="Lactose Powder and Milk"
            width={200} height={200}
            className=" w-full h-full  object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold  text-amber-600 mb-4">
            2. Whey Protein Concentrate
          </h2>

          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            What is Whey Protein Concentrate?

          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Whey is a by-product of cheese manufacturing from cow milk. It contains high biological value proteins essential for growth and recovery.
          </p>

          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Benefits
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Rich in essential amino acidsc</li>
            <li>Rapid muscle recovery</li>
            <li>Improves bakery and dairy nutrition</li>
            <li>Acts as protein fortifier</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Protein</th>
                  <th className="px-4 py-2">Fat</th>
                  <th className="px-4 py-2">pH</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td className="px-4 py-2">WPC 80 Instant</td>
                  <td className="px-4 py-2">80%</td>
                  <td className="px-4 py-2">8%</td>
                  <td className="px-4 py-2">6.0–6.6</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-2">WPC 80 Regular</td>
                  <td className="px-4 py-2">80%</td>
                  <td className="px-4 py-2">7.5%</td>
                  <td className="px-4 py-2">6.0-7.0%</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">WPC 35%	</td>
                  <td className="px-4 py-2">35%</td>
                  <td className="px-4 py-2">6%</td>
                  <td className="px-4 py-2">6.2-6.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* third ingredient */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/food-ingredient-03.webp"
            alt="Lactose Powder and Milk"
            height={200} width={200}
            className=" w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-amber-600 mb-4 "> 3. Lactoferrin </h2>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">What is Lactoferrin? </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lactoferrin is a glycoprotein present in milk and body fluids. It supports immunity, iron metabolism and exhibits antimicrobial and antioxidant properties.
          </p>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Benefits
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Immune system support</li>Immune system support
            <li>Antioxidant & anti-inflammatory</li>
            <li>Gastrointestinal health</li>
            <li>Wound healing & skin health</li>
          </ul>

          {/* Specifications Table */}
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="px-4 py-2">Parameter	</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td className="px-4 py-2">Protein	</td>
                  <td className="px-4 py-2">95%</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-2">Moisture	</td>
                  <td className="px-4 py-2">4.5%</td>

                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">pH (2% solution)	5.2–7.2</td>
                  <td className="px-4 py-2">5.2-7.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* forth ingredient */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 mt-15 gap-10 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/food-ingredient-04.webp"
            alt="Lactose Powder and Milk"
            width={200} height={200}
            className=" w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-amber-600 mb-4">
            4. Whey Protein Isolate (Instantised 90%)
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            What is Whey Protein Isolate?
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Whey Protein Isolate is highly purified whey with ≥90% protein and very low lactose and fat.
          </p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Benefits
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>High protein with low carbs & fat</li>
            <li>Low glycemic index</li>
            <li>Ideal for sports & medical nutrition</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Specifications
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="px-4 py-2">Parameter	</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td className="px-4 py-2">Protein	</td>
                  <td className="px-4 py-2">91%</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-2">Lactose	</td>
                  <td className="px-4 py-2">≤2.0%	</td>

                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Fat	</td>
                  <td className="px-4 py-2">≤2.0%</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">pH</td>
                  <td className="px-4 py-2">6.0–6.5</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Moisture		</td>
                  <td className="px-4 py-2">≤6.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* contact us */}
      <section className="bg-white py-16 px-6 text-center rounded-xl shadow-md mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Have questions about our products? We’d love to hear from you!
        </p>

        <a href="/contact">
          <button
            className="bg-linear-to-r from-amber-500 to-red-500 border-2  border-amber-400  focus:border-red-600 text-white cursor-pointer px-6 py-2 rounded-lg shadow-md  transition"
          >
            Contact Us
          </button>
        </a>
      </section>
    </section>
    </main>
  );
}


export default page;