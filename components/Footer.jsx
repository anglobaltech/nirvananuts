"use client";
const Footer = () => {

  return (
    <footer className="bg-gray-900  text-white pt-16 pb-8 px-6 fadeInUp">
      <div className="h-20 w-20 ml-25">
        <img src="./nirvana-logo.avif" alt="logo" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* WHO ARE WE */}
        <div>
          <h3 className="text-xl font-semibold mb-4">WHO ARE WE?</h3>
          <p className="text-sm text-gray-300">
            Welcome to Nirvana Nuts — Where Flavor Meets Wholesome Goodness! We create delicious snacks that nourish your body and delight your taste buds.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-blue-700 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-700 transition">About</a></li>
            <li><a href="/products" className="hover:text-blue-700 transition">Products</a></li>
            <li><a href="/food-ingredients" className="hover:text-blue-700 transition">Food Ingredient</a></li>
            <li><a href="/contact" className="hover:text-blue-700 transition">Contact us</a></li>
          </ul>
        </div>
        <div>

          <h1 className="text-xl font-semibold mb-4">Our Product</h1>
          <div className="space-y-2 text-sm text-gray-300  ">
            <ul>
            <a href="/products"> <li  className="hover:text-blue-700  p-1 transition">Classic Salted Makhana</li></a>
            <a href="/products"><li className="hover:text-blue-700 p-1 transition">Modern Savory Flavors makhana</li></a>
            <a href="/products"><li className="hover:text-blue-700 p-1 transition">Sweet Gourmet Flavors makhana</li></a>
            <a href="/products"><li className="hover:text-blue-700 p-1 transition">Fusion Spicy makhana</li></a>
            <a href="/products"><li className="hover:text-blue-700 p-1 transition">Whey Protein</li></a>
            </ul>
          </div>
        </div>

        {/* GET IN TOUCH */}
        <div>
          <h3 className="text-xl font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li> <a href="https://maps.app.goo.gl/fCnvbW9fFsHGkm2d6" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition" >📍 S-63, 7th floor, Urbtech NPX, Noida Sector 153, Uttar Pradesh, INDIA Pin-201310 </a></li>
            <li><a href="https://wa.me/+917782069184" target="_blank" className="hover:text-blue-700 transition"> 📞 (+91) 778 206 9184 </a></li>
            <li>✉️ <a href="mailto:info.nirvananuts@gmail.com" target="_blank" className="hover:text-blue-700 transition">info.nirvananuts@gmail.com</a></li>
          </ul>

          <div className="flex justify-end mt-10 pr-6 gap-4">

            {/* Facebook */}
            {/* <a href="#" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 group-hover:text-blue-400"
                viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.9V12h2.1V9.8c0-2.07 1.23-3.2 3.1-3.2.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.87h-1.93v6.93c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a> */}

            {/* Instagram */}
            <a href="https://www.instagram.com/nirvana.nuts/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-pink-500 group-hover:text-pink-400"
                viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </a>

            {/* LinkedIn */}
            {/* <a href="#" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-sky-500 group-hover:text-sky-400"
                viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 17v-7H6v7h2.34zM7.17 9.25a1.34 1.34 0 100-2.68 1.34 1.34 0 000 2.68zM18 17v-3.6c0-2.16-1.15-3.16-2.68-3.16-1.23 0-1.78.68-2.09 1.16v-1h-2.34v7h2.34v-3.6c0-.19.01-.38.07-.52.16-.38.52-.77 1.13-.77.8 0 1.13.58 1.13 1.43V17H18z" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>© 2026 Nirvana Nuts | Powered by AN Global Services</p>
      </div>
    </footer>

  );

}

export default Footer
