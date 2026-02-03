import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Whatsapp from "../../components/Whatsapp";
import Popup from "../../components/Popup";




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
  description: "Nirvana Nuts provide best quality Makhana, Almonds and Mixed Nuts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Popup/>
        <Header />



      <main>{children} </main> 


      <Whatsapp/>
        <Footer />


      </body>
    </html>
  );
}
