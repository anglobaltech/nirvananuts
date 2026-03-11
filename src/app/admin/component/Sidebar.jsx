"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
LayoutDashboard,
PackageOpen,
ShieldCheck,
ShoppingCart,
LogOut,
Menu,
X
} from "lucide-react"

import { usePathname } from "next/navigation"
import { toast } from "react-toastify"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const Sidebar = () => {

const pathname = usePathname()
const [open,setOpen] = useState(false)

const menuList = [
{ name:"Dashboard", link:"/admin", icon:<LayoutDashboard size={18}/> },
{ name:"Products", link:"/admin/products", icon:<PackageOpen size={18}/> },
{ name:"Orders", link:"/admin/orders", icon:<ShoppingCart size={18}/> },
{ name:"Admins", link:"/admin/admins", icon:<ShieldCheck size={18}/> }
]

return(

<>

{/* MOBILE HEADER */}

<div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 flex items-center justify-between  shadow-md">

<Image
src="/nirvana-logo.avif"
alt="logo"
width={45}
height={45}
/>

<button
onClick={()=>setOpen(true)}
className="text-black font-extrabold h-5 w-5 p-2 cursor-pointer"
>
<Menu size={20}/>
</button>

</div>



{/* OVERLAY */}

{open && (

<div
onClick={()=>setOpen(false)}
className="fixed inset-0 bg-black/60 z-40 lg:hidden"
/>

)}



{/* SIDEBAR */}

<aside
className={`
fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white flex flex-col
transform transition-transform duration-300 ease-in-out shadow-xl

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
>

{/* CLOSE BUTTON MOBILE */}

<div className="lg:hidden flex justify-end p-4">

<button
onClick={()=>setOpen(false)}
className="text-white cursor-pointer"
>
<X size={26}/>
</button>

</div>



{/* LOGO */}

<div className="flex justify-center py-6 border-b border-gray-700">

<Image
src="/nirvana-logo.avif"
alt="logo"
width={70}
height={70}
/>

</div>



{/* MENU */}

<ul className="flex-1 px-4 py-6  space-y-2 overflow-y-auto">

{menuList.map((item,key)=>{

const active = pathname === item.link

return(

<Link
href={item.link}
key={key}
onClick={()=>setOpen(false)}
>

<li
className={`
flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
cursor-pointer transition

${active
? "bg-orange-500 text-white shadow"
: "text-gray-300 hover:bg-gray-800"
}
`}
>

{item.icon}
{item.name}

</li>

</Link>

)

})}

</ul>



{/* LOGOUT */}

<div className="p-4 border-t border-gray-700">

<button

onClick={async()=>{

try{

await toast.promise(signOut(auth),{
loading:"Logging out...",
success:"Logged out successfully",
error:(e)=>e.message
})

}
catch(error){
toast.error(error.message)
}

}}

className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
bg-red-500 hover:bg-red-600 transition cursor-pointer font-medium
hover:scale-105 active:scale-95 shadow"
>

<LogOut size={18}/>
Logout

</button>

</div>

</aside>

</>

)

}

export default Sidebar