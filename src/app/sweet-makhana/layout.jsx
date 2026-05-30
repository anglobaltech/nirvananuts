

export const metadata = {
  title: "Buy Sweet Premium Makhana Online – Premium Roasted Snacks | Nirvana Nuts",
  description:
    "Order premium Sweet Gourmet Makhana online from Nirvana Nuts. Enjoy perfectly roasted, crunchy fox nuts coated in a delightful, signature sweet blend. Healthy dessert snacking delivered fresh across India.",
  keywords: [
    "Sweet Makhana",
    "Buy Sweet Makhana online India",
    "Premium roasted fox nuts",
    "Healthy sweet snacks online",
    "Nirvana Nuts makhana",
    "Gourmet sweetened makhana",
  ],
  alternates: {
    canonical: "https://www.nirvananuts.com/sweet-makhana",
  },
  openGraph: {
    title: "Buy Sweet Premium Makhana Online – Premium Roasted Snacks | Nirvana Nuts",
    description:
      "Order premium Sweet Gourmet Makhana online from Nirvana Nuts. Enjoy perfectly roasted, crunchy fox nuts coated in a delightful, signature sweet blend.",
    url: "https://www.nirvananuts.com/sweet-makhana",
    siteName: "Nirvana Nuts",
    images: [
      {
        url: "https://www.nirvananuts.com/product-03.avif", // Sweet Makhana ke liye correct asset mapping (product-03)
        width: 1200,
        height: 630,
        alt: "Nirvana Nuts Premium Sweet Gourmet Makhana Pack",
      },
    ],
    locale: "en_IN",
    type: "video.other", // Product details fallback layer
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Sweet Premium Makhana Online – Nirvana Nuts",
    description:
      "Perfectly roasted, crunchy fox nuts coated in a delightful sweet blend. Order your healthy dessert snack pack online today.",
    images: ["https://www.nirvananuts.com/product-03.avif"],
  },
};

export default function SweetMakhanaLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}