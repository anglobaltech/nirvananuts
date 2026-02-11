"use client"
import React from 'react'
import Image from 'next/image'

const Whatsapp = () => {
  return (
<section>

      {/* WhatsApp */}

      <div className='fixed  bottom-6 right-6 h-10 w-15  mb-30'>
        <a href="http://wa.me/+917782069184" aria-label="visit whatsapp" target="_blank" rel="noopener noreferrer"
        className='h- w-20'>
          <div className='bg-white rounded-full hover:scale-120'>
        <Image src="/whatsapp-image.webp" alt='Whatsapp' width={200} height={100}/></div>
        </a>
      </div>

      <div className='fixed  bottom-6 right-6 h-10 w-15 mb-8 '>
        <a href="tel:+917782069184" aria-label="visit whatsapp" target="_blank" rel="noopener noreferrer"
        className='h-10 w-20 '>
          <div className='bg-white rounded-full hover:scale-120'>
        <Image src="/dialer-icon.avif" alt='dialer' width={200} height={100}/></div>
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
