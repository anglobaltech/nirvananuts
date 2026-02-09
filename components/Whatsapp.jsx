"use client"
import React from 'react'

const Whatsapp = () => {
  return (
    <div>
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">

      {/* WhatsApp */}
      <a href="https://wa.me/+917782069184" target="_blank" rel="noopener noreferrer"
        className="group flex items-center justify-center w-12 h-12  rounded-full cursor-pointer  hover:scale-120 transition">
        <img src="/whatsapp.png" alt="Whatsapp"
          className="w-12 h-12  text-white "
          viewBox="0 0 24 24" fill="currentColor">
        </img>
      </a>

      {/* Dialer / Phone */}

      <a href="http:tel:+91 778 206 9184" target="_blank" rel="noopener noreferrer">
        <div className="group flex items-center justify-center w-12 h-12 cursor-pointer mb-8 rounded-full bg-white hover:scale-120 transition">
          <img src="/dialer-icon.webp" alt="dialer" 
          className='w-10 h-10  text-white '/>
        </div>
      </a>
      {/* <a href="tel:+91 778 206 9184"
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57.58 0 1.05.47 1.05 1.05v3.5c0 .58-.47 1.05-1.05 1.05C10.61 21.5 2.5 13.39 2.5 3.55c0-.58.47-1.05 1.05-1.05H7.1c.58 0 1.05.47 1.05 1.05 0 1.21.2 2.42.57 3.54.11.36.03.76-.24 1.05l-2.2 2.2z" />
        </svg>
      </a> */}

    </div>
    </div>
  )
}

export default Whatsapp
