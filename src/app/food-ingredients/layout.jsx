// app/food-ingredient/layout.jsx

export const metadata = {
  // Google Search mein jo Title dikhega (Max 60 characters - Perfect for SEO)
  title: "Premium Food Ingredients & Bulk Makhana Supplier | Nirvana Nuts",
  
  // Google Search ke niche jo description dikhta hai (Max 160 characters)
  description: "Buy high-quality industrial food ingredients, wholesale roasted fox nuts (Makhana), and bulk dairy proteins from Nirvana Nuts. Certified global standards.",
  
  // Hidden keywords jo Google algorithm scan karta hai
  keywords: [
    "Food ingredients supplier India",
    "Bulk Makhana wholesale",
    "Premium fox nuts distributor",
    "Nirvana Nuts food ingredients",
    "Industrial healthy snacks bulk"
  ],

  // Social media (WhatsApp, LinkedIn, Facebook) par link share karne par jo card banta hai
  openGraph: {
    title: "Premium Food Ingredients Catalogue | Nirvana Nuts",
    description: "Sourcing and supplying finest grade Makhana and industrial-grade food ingredients globally.",
    type: "website",
  },
};

export default function FoodIngredientLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}