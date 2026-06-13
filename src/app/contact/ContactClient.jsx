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
    <main className="min-h-screen relative mt-16 sm:mt-20 bg-gradient-to-br from-amber-50 via-orange-100/70 to-stone-200/50 overflow-hidden selection:bg-amber-200">
      <ToastContainer />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-amber-950 leading-tight">
            Contact Nirvana Nuts
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about bulk wholesale pricing, custom order profiles, or our distribution network? Let's connect.
          </p>
        </header>

        {/* Content Structure */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Interactive Input Card */}
          <div className="w-full lg:col-span-7 flex justify-center">
            <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-xl shadow-stone-200/40 border border-white/60 p-6 sm:p-8 lg:p-10">
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-6"
                aria-label="Corporate contact channel"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-800 tracking-wide">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="E.g., Alexander Wright"
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white/90 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    />
                  </div>

                  {/* Phone Line */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-800 tracking-wide">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      required
                      placeholder="10-digit mobile number"
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white/90 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    />
                  </div>
                </div>

                {/* Email Destination */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-800 tracking-wide">
                    Corporate Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/90 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400"
                    aria-describedby="email-privacy-notice"
                  />
                  <p id="email-privacy-notice" className="mt-1.5 text-xs text-stone-500">
                    Your communication is protected under strict privacy protocols.
                  </p>
                </div>

                {/* Detailed Enquiry */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-800 tracking-wide">
                    Enquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Specify volume requirements, product variant interests, or support context..."
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/90 px-4 py-3 text-stone-800 placeholder-stone-400 shadow-inner outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 hover:border-stone-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Security Gate */}
                <div className="overflow-x-auto py-1">
                  <div className="min-w-[304px]">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(token) => setCaptchaToken(token)}
                    />
                  </div>
                </div>

                {/* Submission Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-700 to-stone-800 text-white px-8 py-3.5 font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide"
                  >
                    {loading ? "Processing Dispatch..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Directory / Contact Reference Card */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="w-full rounded-2xl bg-white/40 backdrop-blur-md shadow-xl shadow-stone-200/30 border border-white/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between lg:min-h-[640px]">
              
              {/* HQ Channels */}
              <div className="space-y-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
                  Direct Headquarter Directory
                </h2>

                <div className="space-y-6">
                  {/* Phone Line */}
                  <div className="flex items-center gap-4 group">
                    <a href="tel:917782069184" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Call HQ">
                      <div className="flex h-12 w-12 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/dialer-icon.avif" alt="" width={24} height={24} className="opacity-80" />
                      </div>
                    </a>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Voice Directory</p>
                      <p className="font-medium text-stone-800 text-sm sm:text-base mt-0.5">+91 778 206 9184</p>
                    </div>
                  </div>

                  {/* Message Gateway */}
                  <div className="flex items-center gap-4 group">
                    <a href="https://wa.me/917782069184" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Message via WhatsApp">
                      <div className="flex h-12 w-12 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/whatsapp.avif" alt="" width={24} height={24} />
                      </div>
                    </a>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Instant Chat</p>
                      <p className="font-medium text-stone-800 text-sm sm:text-base mt-0.5">+91 778 206 9184</p>
                    </div>
                  </div>

                  {/* Mailbox */}
                  <div className="flex items-center gap-4 group">
                    <a href="mailto:info@nirvananuts.in" className="shrink-0 transition-transform duration-200 group-hover:scale-105" aria-label="Email HQ">
                      <div className="flex h-12 w-12 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                        <Image src="/email-icon.webp" alt="" width={24} height={24} className="opacity-80" />
                      </div>
                    </a>
                    <div className="break-all">
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Corporate Mail</p>
                      <p className="font-medium text-stone-800 text-sm sm:text-base mt-0.5">info@nirvananuts.in</p>
                    </div>
                  </div>

                  {/* Global Location */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center bg-white rounded-xl shadow-sm border border-stone-200/60">
                      <Image src="/location-01.avif" alt="" height={24} width={24} className="opacity-80" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Physical Infrastructure</p>
                      <p className="font-medium text-stone-700 text-sm sm:text-base mt-1 leading-relaxed">
                        Vill- Semra Hat, Thana-Turkuliya,<br />
                        Semra (East Champaran), Banjaria,<br />
                        East Champaran, Bihar — 845435
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ecosystem Social Links */}
              <div className="mt-10 pt-6 border-t border-stone-200/40">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">Brand Ecosystem</p>
                <div className="flex items-center gap-3">
                  {["instagram", "facebook", "linkedin"].map((platform) => (
                    <a
                      key={platform}
                      href={platform === "instagram" ? "https://www.instagram.com/nirvana.nuts/" : "#"}
                      aria-label={`Follow Nirvana Nuts on ${platform}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-stone-200/70 shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Image
                        src={`/${platform}-icon.avif`}
                        alt=""
                        width={20}
                        height={20}
                        className="opacity-75 hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
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