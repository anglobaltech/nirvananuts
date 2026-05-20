"use client"

import Sidebar from "../customer/components/Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className=" overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}