"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";


const Popup = () => {
    const [show, setShow] = useState(false);
    const [hasShownOnce, setHasShownOnce] = useState(false);
    const form = useRef(null);
    const timeRef= useRef(false)

    useEffect(() => {
        timeRef.current = setTimeout(() => {
            setShow(true);
        }, 4000);
        return () => clearTimeout(timeRef.current);
    }, [])

    const closePopup = ()=>{
        setShow(false);
        clearTimeout(timeRef.current);
        timeRef.current=setTimeout(()=>{
            setShow(true);
        },60000)
    }

    if (!show) return null;


    const popUpForm = async (e) => {
        e.preventDefault();

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            toast.success("We will connect you shorty ✅", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });

            form.current.reset();
            setShow(false)
        } catch (error) {
            console.error(error);
            toast.error("Fail to sent message❌", {
                theme: "dark",
            })
        }

    }


    return (
        <main role="dialog" aria-modal="true" className="fixed   inset-0 z-50 flex items-center justify-center bg-black/10 ">
        
        
            <section className="bg-amber-50  shadow-xl mx-auto sm:h-130 sm:mt-9 overflow-hidden h-132 mt-6 w-80 md:w-190 md:h-120  rounded-lg   relative">

                <div className="md:flex">
                    <div className=" md:shrink-0">
                    <Image src="/popup-image-03.avif" alt="nirvana nuts image" priority  height={300} width={400} className="h-40 w-full   md:h-120 md:mt-0  md:p-0  md:w-105 md:ml-0 object-fill  " />
                    </div>
                    <div >
                    <button
                    onClick={() => setShow(false)}
                    className="absolute top-3 right-4 font-extrabold  hover:text-red-600 text-black cursor-pointer text-xl">✕
                    </button>
                        <h1 className=" md:text-3xl text-lg  text-amber-800 md:mt-5 font-bold md:text-left md:ml-20  text-center">Nirvana Nuts</h1>
                        <h2 className="text-amber-600 md:text-sm text-sm text-center md:text-left md:ml-10 mt-1 mb-2">Bulk premium makhana and whey protein</h2>

                        <div className="w-100 ">
                            <form ref={form} onSubmit={popUpForm} >
                                <div className="text-black  ">
                                    <div className="grid  grid-rows-3  md:ml-10 md:gap-1 text-sm md:text-lg ml-4">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" placeholder=" Enter your name "  name="name" required className="border-gray-500 border-2 text-base w-66 px-1 rounded-sm " />

                                        <label htmlFor="phone">Phone No</label>
                                        <input type="phone" pattern="[0-9]{10}" title="Enter 10 digit mobile number" placeholder=" Enter your phone no " name="phone" required className="border-gray-500 text-base border-2 w-66 px-1 rounded-sm " />

                                        <label htmlFor="email">Email </label>
                                        <input type="email" placeholder=" you@example.com "  name="email" required className="border-gray-500 text-base  border-2 rounded-sm w-66 px-1 " />

                                        <label htmlFor="message">Requirement</label>
                                        <textarea type="text" placeholder=" Type your message here... "  cols={5} name="message" required className="border-gray-500 w-66 text-base px-1 h-20 border-2 rounded-sm " />

                                    </div>
                                    <button type="submit" className="md:h-8 px-1.5 h-8 mt-3 md:mt-5  md:w-22 cursor-pointer   md:ml-30 ml-32  bg-linear-to-r from-amber-500 to-amber-700 hover:scale-110 transition text-white rounded-md">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>


            </section>
        </main>
    );
}

export default Popup;