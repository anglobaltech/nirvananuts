import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Whatsapp from "../../components/Whatsapp";
import ClientOnly from "../../components/ClientOnly";

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
        <Header />

        <main>{children}</main>

        {/* Client-side UI */}
        <ClientOnly />

        <Whatsapp />
        <Footer />
      </body>
    </html>
  );
}
