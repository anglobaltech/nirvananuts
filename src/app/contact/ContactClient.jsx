"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const ContactClient = () => {
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);

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

    if (!formRef.current) {
      toast.error("Form not found ❌");
      return;
    }

    try {
      setLoading(true);

      // 1. Verify captcha on your backend API route
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Captcha verification failed");
      }

      // 2. Dispatch data via EmailJS 
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      // 3. Reset form and security state cleanly
      formRef.current.reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();

      toast.success("Message sent successfully! ✅", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to send message ❌", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center relative mt-12 sm:mt-16 bg-gradient-to-br from-amber-50 via-orange-100/70 to-stone-200/50 overflow-hidden selection:bg-amber-200">
      <ToastContainer />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-amber-950 leading-tight">
            Contact Nirvana Nuts
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about bulk wholesale pricing, custom order profiles, or our distribution network? Let's connect.
          </p>
        </header>

        {/* Content Structure */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Interactive Input Card */}
          <div className="w-full lg:col-span-7 flex justify-center">
            <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-xl shadow-stone-200/40 border border-white/60 p-5 sm:p-6 lg:p-7">
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-4"
                aria-label="Corporate contact channel"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-stone-800 tracking-wide">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white/90 px-3.5 py-2 text-sm text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    />
                  </div>

                  {/* Phone Line */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-stone-800 tracking-wide">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      minLength={10}
                      onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                      title="Please enter a valid 10-digit phone number"
                      required
                      placeholder="10-digit mobile number"
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white/90 px-3.5 py-2 text-sm text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    />
                  </div>
                </div>

                {/* Email Destination */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-stone-800 tracking-wide">
                    Corporate Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-white/90 px-3.5 py-2 text-sm text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    aria-describedby="email-privacy-notice"
                  />
                </div>

                {/* Detailed Enquiry */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-800 tracking-wide">
                    Enquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Specify volume requirements, product variant interests, or support context..."
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-white/90 px-3.5 py-2 text-sm text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Security Gate & Submission (Compact layout) */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                  <div className="overflow-x-auto scale-90 sm:scale-100 origin-left">
                    <div className="min-w-[304px]">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-700 to-stone-800 text-white px-8 py-3 text-sm font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Directory / Contact Reference Card */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="w-full rounded-2xl bg-white/40 backdrop-blur-md shadow-xl shadow-stone-200/30 border border-white/50 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">

              {/* HQ Channels */}
              <div className="space-y-5">
                <h2 className="text-lg sm:text-xl font-semibold text-stone-900 tracking-tight">
                  Get In Touch
                </h2>

                <div className="space-y-4">
                  {/* Phone Line */}
                  <div className="flex items-center gap-3 group">
                    <a href="tel:917782069184" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Call HQ">
                      <div className="flex h-10 w-10 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/dialer-icon.avif" alt="" width={20} height={20} className="opacity-80" />
                      </div>
                    </a>
                    <div>
                      <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">phone</p>
                      <p className="font-medium text-stone-800 text-sm mt-0.5">+91 778 206 9184</p>
                    </div>
                  </div>

                  {/* Message Gateway */}
                  <div className="flex items-center gap-3 group">
                    <a href="https://wa.me/917782069184" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Message via WhatsApp">
                      <div className="flex h-10 w-10 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/whatsapp.avif" alt="" width={20} height={20} />
                      </div>
                    </a>
                    <div>
                      <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider"> Chat</p>
                      <p className="font-medium text-stone-800 text-sm mt-0.5">+91 778 206 9184</p>
                    </div>
                  </div>

                  {/* Mailbox */}
                  <div className="flex items-center gap-3 group">
                    <a href="mailto:info@nirvananuts.in" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Email HQ">
                      <div className="flex h-10 w-10 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/email-icon.webp" alt="" width={20} height={20} className="opacity-80" />
                      </div>
                    </a>
                    <div className="break-all">
                      <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">Corporate Mail</p>
                      <p className="font-medium text-stone-800 text-sm mt-0.5">info@nirvananuts.in</p>
                    </div>
                  </div>

                  {/* Global Location */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 flex h-10 w-10 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                      <Image src="/location-01.avif" alt="" height={20} width={20} className="opacity-80" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">our location </p>
                      <p className="font-medium text-stone-700 text-xs mt-1 leading-relaxed">
                        Vill- Semra Hat, Thana-Turkuliya,<br />
                        Semra (East Champaran), Banjaria,<br />
                        East Champaran, Bihar — 845435
                      </p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactClient;