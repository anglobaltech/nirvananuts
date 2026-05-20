"use client"

import { usePathname } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Whatsapp from "../../components/Whatsapp"


export default function LayoutWrapper({ children }) {

  const pathname = usePathname()

  const hideLayout =
    pathname === "/login" ||
    pathname === "/forget-password" ||
    pathname.startsWith("/admin")

  return (
    <>
      {!hideLayout && <Header />}

      <main>{children}</main>
      {!hideLayout && <Whatsapp />}
      {!hideLayout && <Footer />}
    </>
  )
}