import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/component/LayoutWrapper";

// 1. Import the necessary tools from react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nirvana Nuts",
  description: "Shop premium makhana (fox nuts) and high-quality whey protein at Nirvana Nuts. Healthy snacks, clean nutrition & fast delivery across India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>
          <main>{children}</main>
        </LayoutWrapper>

        {/* 
          FIX: Adding the single, centralized Toast notification channel.
          This will seamlessly catch and display all "Add to Cart" and 
          "Wishlist" alerts across your entire shop without duplicates or server crashes!
        */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}