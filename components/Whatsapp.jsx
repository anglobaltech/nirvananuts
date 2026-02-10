"use client"
import React from 'react'

const Whatsapp = () => {
  return (
    <div>
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">

      {/* WhatsApp */}
      <a href="https://wa.me/+917782069184" target="_blank" rel="noopener noreferrer"
        className="group flex items-center justify-center w-12 h-12  rounded-full cursor-pointer  hover:scale-120 transition">
        <img src="/whatsapp.avif" alt="Whatsapp" fetchPriority='high' sizes='100vw'
          className="w-10 h-10  text-white "
          fill="currentColor">
        </img>
      </a>

      {/* Dialer / Phone */}

      <a href="tel:+917782069184" target="_blank" rel="noopener noreferrer">
        <div className="group flex items-center justify-center w-12 h-12 cursor-pointer mb-8 rounded-full bg-white hover:scale-120 transition">
          <img src="/dialer-icon.avif" alt="dialer" fetchPriority='high'sizes='100vw'
          className='w-10 h-10  text-white '/>
        </div>
      </a>


    </div>
    </div>
  )
}

export default Whatsapp
