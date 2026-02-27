"use client"
import React from 'react'
import Image from 'next/image'

const Whatsapp = () => {
  return (
<section>

    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-4">

      {/* WhatsApp */}
      <a
        href="https://wa.me/917782069184"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group"
      >
        <div className="bg-white shadow-xl rounded-full p-3 transition-all duration-300 group-hover:scale-110 hover:shadow-2xl">
          <Image
            src="/whatsapp-image.webp"
            alt="WhatsApp"
            width={30}
            height={30}
            priority
          />
        </div>
      </a>

      {/* Call */}
      <a
        href="tel:+917782069184"
        aria-label="Call Now"
        className="group"
      >
        <div className="bg-white shadow-xl rounded-full p-3 transition-all duration-300 group-hover:scale-110 hover:shadow-2xl">
          <Image
            src="/dialer-icon.avif"
            alt="Call"
            width={30}
            height={30}
            priority
          />
        </div>
      </a>

    </div>






      {/* <a href="https://wa.me/+917782069184" target="_blank" rel="noopener noreferrer"
        className="group flex items-center justify-center w-12 h-12  rounded-full cursor-pointer  hover:scale-120 transition">
        <Image src="/whatsapp.avif" alt="Whatsapp"
          className="w-10 h-10 mb-50 text-white " 
          fill/>
      </a> */}

      {/* Dialer / Phone */}

      {/* <a href="tel:+917782069184" target="_blank" rel="noopener noreferrer">
        <div className="group flex items-center justify-center w-12 h- cursor-pointer mb-8 rounded-full bg-white hover:scale-120 transition">
          <Image src="/dialer-icon.avif" alt="dialer"  fill
          className='w-5 h-5  text-white '/>
        </div>
      </a> */}


</section>
  )
}

export default Whatsapp
