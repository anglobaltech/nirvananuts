// src/app/contact/page.js
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Get in Touch With Nirvana Nuts | Premium Healthy Snacks & Wholesale",
  description:
    "Connect with Nirvana Nuts for product inquiries, wholesale orders, or corporate distribution. We offer premium roasted makhana and healthy fitness supplements.",
  alternates: {
    canonical: "https://nirvananuts.in/contact",
  },
  openGraph: {
    title: "Contact Nirvana Nuts | Premium Snacks",
    description: "Get in touch for bulk orders and wholesale partnership opportunities.",
    url: "https://nirvananuts.in/contact",
    type: "website",
  }
};

export default function Page() {
  // JSON-LD Structured Data Schema for Google Rank 1 SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Nirvana Nuts Contact Page",
    "description": "Corporate contact gateway for wholesale and customer support.",
    "url": "https://nirvananuts.in/contact"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}