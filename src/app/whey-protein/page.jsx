import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">

      <section className="py-16 px-6 gap-5 mt-15 mb-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl mt-2 text-center md:text-3xl text-amber-900 font-bold ">Whey Protein – The Muscle Builder</h2>
          <p className="mt-6 mb-5 text-gray-700 text-base md:text-base max-w-6xl leading-relaxed">
            Whey Protein is a high-quality, fast-absorbing protein supplement derived from milk during the cheese-making process. Rich in essential amino acids and BCAAs, it supports muscle growth, faster recovery, and overall strength development. Ideal for athletes, gym enthusiasts, and anyone looking to increase daily protein intake, whey protein helps improve lean muscle mass, boost metabolism, and maintain overall wellness. Our premium whey protein powder is easy to mix, delicious in taste, and perfect for post-workout recovery, weight management, and active lifestyles.
          </p>
          <h2 className="text-2xl text-center md:text-3xl text-amber-900 font-semibold mb-10">
            The Three Main Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

              <Image
                src="/whey-protein-02.avif"
                alt="Whey Protein Concentrate"
                height={200}
                width={200}
                className="w-full h-48 object-fill rounded-lg mb-4"
              />

              <h3 className="text-xl text-amber-700 font-semibold mb-2">
                Whey Protein Concentrate (WPC)
              </h3>

              <p className="text-gray-600 mb-4">
                Contains 70–80% protein. Budget-friendly and nutrient-rich,
                ideal for daily fitness and muscle support.
              </p>

              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Creamy taste</li>
                <li>Affordable protein</li>
                <li>Supports muscle growth</li>
                <li>Good for daily use</li>
              </ul>

            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

              <Image
                src="/whey-protein-07.avif"
                alt="Whey Protein Isolate"
                height={200}
                width={200}
                className="w-full h-48 object-fill rounded-lg mb-4"
              />

              <h3 className="text-xl text-amber-700 font-semibold mb-2">
                Whey Protein Isolate (WPI)
              </h3>

              <p className="text-gray-600 mb-4">
                90%+ pure protein with low lactose. Perfect for weight loss
                and lean muscle building.
              </p>

              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Low fat & low carb</li>
                <li>Fast absorption</li>
                <li>Great for cutting phase</li>
                <li>Lactose friendly</li>
              </ul>

            </div>
            <div className="bg-white rounded-xl shadow-md  p-6 hover:shadow-xl transition duration-300">

              <Image
                src="/whey-protein-04.avif"
                alt="Whey Protein Hydrolysate"
                height={250}
                width={250}
                className="w-full h-48 object-fill rounded-lg mb-4"
              />

              <h3 className="text-xl text-amber-700 font-semibold mb-2">
                Whey Protein Hydrolysate (WPH)
              </h3>

              <p className="text-gray-600 mb-4">
                Pre-digested protein for fastest absorption and elite
                muscle recovery.
              </p>

              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Super fast digestion</li>
                <li>Easy on stomach</li>
                <li>Advanced recovery</li>
                <li>Premium performance</li>
              </ul>

            </div>



          </div>

          <div className="grid gap-8 md:grid-cols-1 ">
            {/* Card 1 */}
            <div className="border rounded-xl p-6 mt-20 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl text-amber-800 text-center font-semibold mb-3">
                Whey Protein Concentrate (WPC)
              </h2>
              <div className="text-gray-600">
                <p className="text-center mb-4">
                  This is the least processed form, typically containing 70–80% protein. The rest is made up of milk fats and lactose.
                </p>
                <h2 className="text-lg text-amber-700 mt-1">Nutrient Dense</h2>
                <p>Because it is less filtered, it retains higher levels of beneficial bioactive compounds (like phospholipids and lactoferrin) that support the immune system.</p>
                <h2 className="text-lg text-amber-700 mt-1">Better Taste</h2>
                <p>The small amount of fat and lactose gives it a creamier texture and a more "natural" milky flavour compared to other types.</p>
                <h2 className="text-lg text-amber-700 mt-1">Cost-Effective </h2>
                <p>It is the most affordable type of whey, making it the best choice for those looking for a daily protein supplement on a budget.  </p>
                <h2 className="text-lg text-amber-700 mt-1">Sustained Release </h2>
                <p>Due to the fat content, it digests slightly slower than isolate, which can help keep you full a bit longer.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl text-center text-amber-800 font-semibold mb-3">
                Whey Protein Isolate (WPI)
              </h3>
              <div className="text-gray-600">
                <p className=" text-center mb-4">
                  Isolate undergoes intense processing to remove almost all fat and lactose, resulting in 90% or more protein.
                </p>
                <h2 className="text-lg text-amber-700 mt-1 ">Lactose-Friendly </h2>
                <p>It is the "gold standard" for people with lactose intolerance. Most isolates have less than 1% lactose.</p>
                <h2 className="text-lg text-amber-700 mt-1 ">Low Calorie</h2>
                <p>Since the fats and sugars are stripped away, it is perfect for those on a strict weight loss or "cutting" phase who want maximum protein for minimum calories.  </p>
                <h2 className="text-lg text-amber-700 mt-1 ">Rapid Absorption </h2>
                <p>It digests very quickly, making it ideal for immediate post-workout recovery to shuttle amino acids to the muscles fast.  </p>
                <h2 className="text-lg text-amber-700 mt-1">High Purity </h2>
                <p>You get more actual protein per gram of powder than you do with concentrate.  </p>
              </div>

            </div>

            {/* Card 3 */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl text-center text-amber-800 font-semibold mb-3">
                Whey Protein Hydrolysate (WPH)
              </h2>
              <div className="text-gray-600">
                <p className="text-center mb-4">
                  This is "pre-digested" whey. It has undergone partial hydrolysis—a process that breaks down the protein chains into smaller segments called peptides.
                </p>
                <h2 className="text-lg text-amber-700 mt-1 ">Fastest Absorption </h2>
                <p>This is the "express lane" of protein. Because it’s pre-digested, your body doesn't have to work as hard to break it down, leading to a rapid spike in insulin levels (which can help with muscle growth post-workout).</p>
                <h2 className="text-lg text-amber-700 mt-1 ">Easiest on the Stomach</h2>
                <p>It is often the best choice for athletes who experience severe bloating or digestive distress with other powders. </p>
                <h2 className="text-lg text-amber-700 mt-1 ">Hypoallergenic </h2>
                <p>It is less likely to cause an allergic reaction, which is why it’s often used in specialized infant formulas and medical      nutrition.</p>
              </div>
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
                <td className="p-4">Concentrate (WPC)</td>
                <td className="p-4">70–80%</td>
                <td className="p-4">Medium</td>
                <td className="p-4">Low</td>
                <td className="p-4">Daily Fitness</td>
              </tr>
              <tr className="border-t text-gray-900">
                <td className="p-4">Isolate (WPI)</td>
                <td className="p-4">90%+</td>
                <td className="p-4">Fast</td>
                <td className="p-4">Medium</td>
                <td className="p-4">Weight Loss/ Lactose Sensitive</td>
              </tr>
              <tr className="border-t text-gray-900">
                <td className="p-4">Hydrolysate (WPH)</td>
                <td className="p-4">80–90%</td>
                <td className="p-4">Super Fast</td>
                <td className="p-4">High</td>
                <td className="p-4">Elite Recovery/ Sensitive Stomachs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 py-12 max-w-6xl mx-auto">
        {[
          { src: "/whey-protein-06.avif", alt: "whey protein image" },
          { src: "/whey-protein-04.avif", alt: "whey protein image 2" },
          { src: "/whey-protein-05.avif", alt: "whey protein image 03" },

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

      {/* contact us */}

      <section className="bg-white py-5 px-6 text-center rounded-xl  mt-8">
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
    </div>
  );
};

export default Page;

