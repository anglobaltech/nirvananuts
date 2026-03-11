"use client"
import React, { useEffect, useRef, useState } from "react"
import Sidebar from "./Sidebar"

import { usePathname } from "next/navigation"

const AdminLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {

    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  return (

    <main className="flex">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        
        <Sidebar />
        
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`fixed md:hidden z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* CONTENT */}
      <section className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">

       

        <div className="p-8">
          {children}
        </div>

      </section>

    </main>

  )
}

export default AdminLayout