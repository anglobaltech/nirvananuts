// app/about/layout.jsx

export const metadata = {
  // Google Search mein dikhne wala precise Title (Perfect for Brand & Authority Ranking)
  title: "About Nirvana Nuts | Our Heritage, Vision & Leadership Team",
  
  // High-CTR Description jo users ko search result par click karne par majboor karegi
  description: "Discover the journey of Nirvana Nuts. From sourcing premium farm fox nuts (Makhana) in Mithila to supplying high-grade 20kg bulk whey protein globally.",
  
  // Google aur baki search engines ke crawlers ke liye highly targeted long-tail keywords
  keywords: [
    "About Nirvana Nuts",
    "Makhana production heritage",
    "Premium quality fox nuts manufacturer",
    "Bulk whey protein supplier India",
    "Nirvana Nuts founder leadership",
    "Healthy snacks processing factory"
  ],

  // Social Sharing Layout Optimization (WhatsApp/LinkedIn links ke liye)
  openGraph: {
    title: "Our Story & Global Standards | Nirvana Nuts",
    description: "Committed to purity, performance, and international safety standards in healthy snacking and fitness nutrition.",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}