"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";


const Popup = () => {
    const [show, setShow] = useState(false);
    const form = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [])
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
            <ToastContainer />
            <section className="bg-amber-50 shadow-xl p-6 h-160 w-90 md:w-190 md:h-125  rounded-lg   relative">
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-2 right-3 text-black cursor-pointer text-xl">✕
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
                    <div className=" overflow-hidden">
                    <Image src="/product-07.png" alt="nirvana nuts image" priority height={500} width={500} className="h-40 w-40 ml-21 md:h-full md:mt-5 md:w-full md:ml-0 object-contain rounded-2xl " />
                    </div>
                    <div>
                        <h1 className="text-2xl  text-amber-800 md:m-4 font-bold  text-center">Nirvana Nuts</h1>
                        <h2 className="text-amber-600 text-sm  text-center  mb-4">Get Premium Makhana, Whey Protein at Wholesale Prices</h2>

                        <div className="w-100">
                            <form ref={form} onSubmit={popUpForm} >
                                <div className="text-black m-3 ">
                                    <div className="grid  grid-rows-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" placeholder=" Enter your name " name="name" required className="border-gray-700 border-2  w-70 px-4 rounded-sm " />

                                        <label htmlFor="phone">Phone No</label>
                                        <input type="text" placeholder=" Enter your phone no " name="phone" required className="border-gray-800  border-2 w-70 px-4 rounded-sm " />

                                        <label htmlFor="email">Email </label>
                                        <input type="text" placeholder=" you@example.com " name="email" required className="border-gray-700  border-2 rounded-sm w-70 px-4 " />

                                        <label htmlFor="message">Requirement</label>
                                        <textarea type="text" placeholder=" Type your message here... " rows={4} cols={5} name="message" required className="border-gray-700 w-70 px-4  border-2 rounded-sm " />

                                    </div>
                                    <button type="submit" className="h-8 mt-5 ml-56 md:ml-61 w-22 cursor-pointer  text-center block  items-center bg-linear-to-r from-amber-500 to-amber-700 hover:scale-110 transition text-white rounded-md">Submit</button>
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