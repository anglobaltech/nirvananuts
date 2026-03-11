"use client"

import { usePathname } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Whatsapp from "../../components/Whatsapp"
import ClientOnly from "../../components/ClientOnly"


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
      {!hideLayout && <ClientOnly />}
      {!hideLayout && <Whatsapp />}
      {!hideLayout && <Footer />}
    </>
  )
}