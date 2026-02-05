"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const page = () => {
  const form = useRef(null);
  const [isSent, setIsSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify that you are not a robot 🤖", {
        theme: "dark",
      });
      return;
    }

    if (!form.current) {
      toast.error("Form not found ❌");
      return;
    }

    try {
      setLoading(true);

      //  verify captcha on server
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error("Captcha verification failed");
      }

      await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      form.current.reset();
      setCaptchaToken(null);

      toast.success("Message sent successfully! ✅", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message ❌", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };



  // Refs for fade-in on scroll
  const sectionRefs = useRef([]);

  useEffect(() => {
    // IntersectionObserver for fade-in sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (el, idx) => {
    sectionRefs.current[idx] = el;
  };

  return (
    <main className="min-h-screen   relative overflow-hidden mt-14 bg-linear-to-br from-amber-50 via-orange-100 to-stone-200" >
      <ToastContainer />

      <div aria-hidden="true" className=" pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72  rounded-full bg-linear-to-br from-amber-200 to-stone-300 blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-70 w-80  rounded-full bg-linear-to-br from-stone-300 to-amber-200 blur-3xl opacity-40 animate-pulse" />
      </div>

      {/* Page container */}
      <section
        ref={(el) => setRef(el, 0)}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 opacity-0 translate-y-6 transition-all duration-700 ease-out"
      >
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-amber-900">
            Contact Us
          </h1>
          <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
            We do love to hear from you—questions, collaborations, or feedback. Drop us a message and we will get back soon.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  ">
          <div
            ref={(el) => setRef(el, 1)}
            className="relative     translate-y-6  transition-all duration-700 ease-out"
          >
            <div className="rounded-2xl bg-white/60  backdrop-blur-md shadow-lg shadow-stone-300/50 border border-white/40 p-6 sm:p-8">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
                aria-label="Contact form"
              >
                {/* Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                              focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                              group-focus-within:scale-[1.01] hover:border-stone-400"
                  />
                </div>

                {/* phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    pattern="[0-9]{10}"
                    title="Enter 10 digit mobile number"
                    required
                    placeholder="Enter your phone number"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                              focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                              group-focus-within:scale-[1.01] hover:border-stone-400"

                  />

                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                              focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                              group-focus-within:scale-[1.01] hover:border-stone-400"
                    aria-describedby="email-desc"
                  />
                  <p id="email-desc" className="mt-1 text-xs text-stone-500">
                    We’ll only use this to reply to your message.
                  </p>
                </div>


                {/* Message */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us more…"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                              focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                              group-focus-within:scale-[1.01] hover:border-stone-400 resize-y"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="mb-4 ">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>

                {/* Submit button with hover animation */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-linear-to-r from-amber-600 to-stone-700 text-white px-6 py-3 font-medium shadow-md
                              transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    aria-label="Submit contact form"
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Floating contact info + social bar */}
          <aside
            ref={(el) => setRef(el, 2)}
            className="relative opacity-0 translate-y-6 transition-all duration-700 ease-out"
          >
            <div className="rounded-2xl bg-white/50 backdrop-blur-md shadow-lg shadow-stone-300/50 border border-white/40 p-6 sm:p-8 h-full flex flex-col justify-between">
              {/* Contact info */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-stone-800">Reach us directly</h2>

                {/* Phone */}
                <div className="flex items-start gap-3 ">
                  <a href="tel:917782069184">
                    <div className="flex h-10 w-10 items-center justify-center hover:h-12 hover:w-12 ">
                      <img src="/dialer-icon.webp" alt="dialer" />
                    </div>
                  </a>
                  <div>
                    <p className="text-sm text-stone-500">Phone</p>
                    <p className="font-medium text-stone-800">+91 778 206 9184</p>
                  </div>
                </div>
                <br />

                {/* Whatsapp */}
                <div className="flex items-start gap-3 ">
                  <a href="https://wa.me/+917782069184">
                    <div className="flex h-10 w-10 items-center justify-center hover:h-12 hover:w-12  ">
                      <img src="/whatsapp.avif" alt="whatsapp" />

                    </div>
                  </a>
                  <div>
                    <p className="text-sm text-stone-500">Phone</p>
                    <p className="font-medium text-stone-800">+91 778 206 9184</p>
                  </div>
                </div>
                <br />

                {/* Email */}
                <div className="flex items-start gap-3">
                  <a href="mailto:info.nirvananuts@gmail.com">
                    <div className="flex h-10 w-10 items-center justify-center hover:h-12 hover:w-12 cursor-pointer ">
                      <img src="email-icon.webp" alt="email" />
                    </div>
                  </a>
                  <div>
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="font-medium text-stone-800">info.nirvananuts@gmail.com</p>
                  </div>
                </div>
                <br />

                {/* Location */}
                <div className="flex items-start gap-3">
                  <a href="https://maps.app.goo.gl/fCnvbW9fFsHGkm2d6">
                    <div className="flex h-10 w-10 items-center justify-center hover:h-12 hover:w-12">
                      <img src="location-01.avif" alt="location" />
                    </div>
                  </a>

                  <div>
                    <p className="text-sm text-stone-500">Location</p>
                    <p className="font-medium text-stone-800">Unit No. S63, 7th, Urbtech NPx, Sector 153, Noida, Uttar Pradesh 201304</p>
                  </div>
                </div>
              </div>

              {/* Floating social bar with animated icons */}
              <div className="mt-8">
                <p className="text-sm text-stone-500 mb-3">Follow us</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/nirvana.nuts/"
                    aria-label="Visit Instagram"
                    className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm transition-all duration-200 hover:scale-105 "
                  >
                    <img src="/instagram-icon.avif" alt="instagram" />
                  </a>
                  <a
                    href="#"
                    aria-label="Visit Facebook"
                    className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm transition-all duration-200 hover:scale-105 "
                  >
                    <img src="/facebook-icon.avif" alt="Facebook" />
                  </a>
                  <a
                    href="#"
                    aria-label="Visit LinkedIn"
                    className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm transition-all duration-200 hover:scale-105 "
                  >
                    <img src="/linkedin-icon.avif" alt="Linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

    </main>
  );
}


export default page
