"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const ContactClient = () => {
  const form = useRef(null);

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

      // verify captcha on server
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

  return (
    <main className="min-h-screen relative mt-16 sm:mt-20 bg-gradient-to-br from-amber-50 via-orange-100 to-stone-200 overflow-hidden">
      <ToastContainer />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Heading */}
        <header className="text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold p-2 sm:p-4 tracking-tight text-amber-900 leading-snug">
            Contact Nirvana Nuts for Orders, Bulk Enquiries & Support
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We do love to hear from you—questions, collaborations, or
            feedback. Drop us a message and we will get back soon.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* LEFT FORM */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl rounded-2xl bg-white/60 backdrop-blur-md shadow-lg shadow-stone-300/50 border border-white/40 p-5 sm:p-6 lg:p-8">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
                aria-label="Contact form"
              >
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-base sm:text-lg font-medium text-stone-900"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-sm sm:text-base text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                      focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                      group-focus-within:scale-[1.01] hover:border-stone-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label
                      htmlFor="phone"
                      className="block text-base sm:text-lg font-medium text-stone-900"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      title="Enter 10 digit mobile number"
                      required
                      placeholder="Enter your phone number"
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-sm sm:text-base text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                      focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                      group-focus-within:scale-[1.01] hover:border-stone-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-base sm:text-lg font-medium text-stone-900"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-sm sm:text-base text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                    focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                    group-focus-within:scale-[1.01] hover:border-stone-400"
                    aria-describedby="email-desc"
                  />

                  <p
                    id="email-desc"
                    className="mt-1 text-xs sm:text-sm text-stone-500"
                  >
                    We’ll only use this to reply to your message.
                  </p>
                </div>

                {/* Message */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-base sm:text-lg font-medium text-stone-900"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us more…"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-sm sm:text-base text-stone-800 placeholder-stone-400 shadow-sm outline-none transition-all duration-200
                    focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                    group-focus-within:scale-[1.01] hover:border-stone-400 resize-none"
                  />
                </div>

                {/* Recaptcha */}
                <div className="overflow-x-auto">
                  <div className="min-w-[304px]">
                    <ReCAPTCHA
                      sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                      }
                      onChange={(token) => setCaptchaToken(token)}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-600 to-stone-700 text-white px-6 py-3 font-medium shadow-md
                    transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer disabled:opacity-70"
                    aria-label="Submit contact form"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl rounded-2xl bg-white/50 backdrop-blur-md shadow-lg shadow-stone-300/50 border border-white/40 p-5 sm:p-6 lg:p-8 flex flex-col justify-between lg:min-h-[620px]">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-stone-800">
                  Reach us directly
                </h2>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <a href="tel:917782069184">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center hover:scale-110 transition">
                      <Image
                        src="/dialer-icon.avif"
                        alt="dialer"
                        width={200}
                        height={200}
                      />
                    </div>
                  </a>

                  <div className="break-all">
                    <p className="text-sm text-stone-500">Phone</p>
                    <p className="font-medium text-stone-800 text-sm sm:text-base">
                      +91 778 206 9184
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <a href="https://wa.me/917782069184">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center hover:scale-110 transition">
                      <Image
                        src="/whatsapp.avif"
                        alt="whatsapp"
                        width={200}
                        height={200}
                      />
                    </div>
                  </a>

                  <div className="break-all">
                    <p className="text-sm text-stone-500">WhatsApp</p>
                    <p className="font-medium text-stone-800 text-sm sm:text-base">
                      +91 778 206 9184
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <a href="mailto:info.nirvananuts@gmail.com">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center hover:scale-110 transition">
                      <Image
                        src="/email-icon.webp"
                        alt="email"
                        width={200}
                        height={200}
                        priority
                      />
                    </div>
                  </a>

                  <div className="break-all">
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="font-medium text-stone-800 text-sm sm:text-base">
                      info@nirvananuts.in
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center">
                    <Image
                      src="/location-01.avif"
                      alt="location"
                      height={200}
                      width={200}
                    />
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">Location</p>

                    <p className="font-medium text-stone-800 text-sm sm:text-base leading-relaxed">
                      VILL- SEMRA HAT, THANA-TURKULIYA, Semra (East
                      Champaran), Banjaria, East Champaran 845435, Bihar
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8">
                <p className="text-sm text-stone-500 mb-3">
                  Follow us
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/nirvana.nuts/"
                    aria-label="Visit Instagram"
                    className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm hover:scale-105 transition"
                  >
                    <Image
                      src="/instagram-icon.avif"
                      alt="instagram"
                      width={200}
                      height={200}
                    />
                  </a>

                  <a
                    href="#"
                    aria-label="Visit Facebook"
                    className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm hover:scale-105 transition"
                  >
                    <Image
                      src="/facebook-icon.avif"
                      alt="Facebook"
                      height={200}
                      width={200}
                    />
                  </a>

                  <a
                    href="#"
                    aria-label="Visit LinkedIn"
                    className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/70 border border-stone-200 shadow-sm hover:scale-105 transition"
                  >
                    <Image
                      src="/linkedin-icon.avif"
                      alt="Linkedin"
                      height={200}
                      width={200}
                    />
                  </a>
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