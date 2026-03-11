"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { createOrder } from "@/customerService/orderService"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { motion } from "framer-motion"
import { Trash2, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"


import AOS from "aos"
import "aos/dist/aos.css"
import { generateOrderId } from "@/services/generateOrderId"

export default function Checkout() {

const [cart,setCart] = useState([])
const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

const [contact,setContact] = useState({
name:"",
email:"",
phone:"",
address:"",
city:"",
state:"",
pincode:""
})


// example
/* UPDATE CART */

const updateCart = async (updatedCart) => {

setCart(updatedCart)

if(user){

await updateDoc(doc(db,"carts",user.uid),{
items: updatedCart
})

}else{

localStorage.setItem("cart",JSON.stringify(updatedCart))

}

}


/* INCREASE QTY */

const increaseQty = (index) => {

const updatedCart = [...cart]

updatedCart[index].quantity += 1

updateCart(updatedCart)

}


/* DECREASE QTY */

const decreaseQty = (index) => {

const updatedCart = [...cart]

if(updatedCart[index].quantity > 1){

updatedCart[index].quantity -= 1

updateCart(updatedCart)

}

}


/* REMOVE ITEM */

const removeItem = (index) => {

const updatedCart = cart.filter((_,i)=> i !== index)

updateCart(updatedCart)

toast.success("Item removed from cart")

}  
// example

/* AOS */

useEffect(()=>{
AOS.init({
duration:800,
once:true
})
},[])


/* USER + CART */

useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth, async (u)=>{

setUser(u)

if(u){

const docRef = doc(db,"carts",u.uid)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
setCart(docSnap.data().items || [])
}

}else{

const items = JSON.parse(localStorage.getItem("cart")) || []
setCart(items)

}

setLoading(false)

})

return ()=>unsubscribe()

},[])



/* INPUT CHANGE */

const handleChange = (e)=>{

setContact({
...contact,
[e.target.name]:e.target.value
})

}



/* PLACE ORDER */

const handleOrder = async () => {

if(!contact.name || !contact.phone || !contact.address){
toast.error("Please fill contact details")
return
}

const orderId = await generateOrderId();

await createOrder({

  orderId: orderId,

  customerName: contact.name,
  customerEmail: contact.email,
  customerPhone: contact.phone,

  address: contact.address,
  city: contact.city,
  state: contact.state,
  pincode: contact.pincode,

  products: cart,
  totalAmount: total,

  payment: "Online",
  status: "Pending",
  createdAt: new Date()

})

/* CLEAR CART */

if(user){

await updateDoc(doc(db,"carts",user.uid),{
items:[]
})

}else{

localStorage.removeItem("cart")

}

toast.success("Order created! Redirecting to payment...")

window.location.href="/payment"

}



/* TOTAL */

const subtotal = cart.reduce((acc,item)=>acc + item.price * item.quantity,0)
const shipping = subtotal > 0 ? 50 : 0
const total = subtotal + shipping


if(loading) return <p className="p-10 mt-20">Loading...</p>



return (

<div className="bg-[#F6F3EE] text-[#2B2B2B] mt-24 min-h-screen py-12 px-6">

<div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

{/* LEFT SECTION */}

<div className="lg:col-span-2 space-y-10">


{/* CONTACT DETAILS */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
className="bg-white p-8 rounded-2xl shadow-md"
>

<h2 className="text-2xl font-semibold mb-6">
Shipping Details
</h2>

<div className="grid md:grid-cols-2 gap-5">

<input
type="text"
name="name"
placeholder="Full Name"
onChange={handleChange}
className="border p-3 rounded-xl focus:ring-2 focus:ring-[#D9A441]"
/>

<input
type="email"
name="email"
placeholder="Email Address"
onChange={handleChange}
className="border p-3 rounded-xl focus:ring-2 focus:ring-[#D9A441]"
/>

<input
type="tel"
name="phone"
placeholder="Phone Number"
onChange={handleChange}
className="border p-3 rounded-xl"
/>

<input
type="text"
name="pincode"
placeholder="Pincode"
onChange={handleChange}
className="border p-3 rounded-xl"
/>

</div>

<textarea
name="address"
placeholder="Full Address"
onChange={handleChange}
className="border p-3 rounded-xl mt-5 w-full"
/>

<div className="grid md:grid-cols-2 gap-5 mt-5">

<input
type="text"
name="city"
placeholder="City"
onChange={handleChange}
className="border p-3 rounded-xl"
/>

<input
type="text"
name="state"
placeholder="State"
onChange={handleChange}
className="border p-3 rounded-xl"
/>

</div>

</motion.div>



{/* CART PRODUCTS */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.1}}
className="bg-white p-8 rounded-2xl shadow-md"
>

<h2 className="text-2xl font-semibold mb-6">
Your Items
</h2>

{cart.length === 0 && <p>Your cart is empty</p>}

{cart.map((item,index)=>(

<div
key={index}
className="flex items-center gap-4 border-b py-4"
>

<Image
src={item.image}
width={70}
height={70}
className="rounded-lg object-cover"
alt={item.name}
/>

<div className="flex-1">

<p className="font-semibold">
{item.name}
</p>

<p className="text-sm text-gray-500">
₹{item.price}
</p>

<div className="flex items-center gap-2 mt-2">

<button
onClick={()=>decreaseQty(index)}
className="px-2 py-1 border cursor-pointer rounded hover:bg-gray-100"
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={()=>increaseQty(index)}
className="px-2 py-1 border cursor-pointer rounded hover:bg-gray-100"
>
+
</button>

</div>

</div>

<div className="text-right">

<p className="font-semibold">
₹{item.price * item.quantity}
</p>

<button
onClick={()=>removeItem(index)}
className="text-red-500 mt-2 cursor-pointer flex items-center gap-1 text-sm hover:text-red-700"
>
<Trash2 size={16}/> Remove
</button>

</div>

</div>

))}

</motion.div>

</div>



{/* RIGHT SIDE → ORDER SUMMARY */}

<motion.div
initial={{opacity:0,x:40}}
animate={{opacity:1,x:0}}
className="bg-white p-8 rounded-2xl shadow-md h-fit sticky top-28"
>

<h2 className="text-2xl font-semibold mb-6">
Order Summary
</h2>


{/* COUPON */}

<input
type="text"
placeholder="Coupon Code"
className="border w-full p-3 rounded-xl mb-4"
/>


<div className="space-y-3">

<div className="flex justify-between">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span>₹{shipping}</span>
</div>

<div className="flex justify-between text-sm text-gray-500">
<span className="flex items-center gap-1">
<Truck size={16}/> Delivery
</span>
<span>3 - 5 Days</span>
</div>

<hr/>

<div className="flex justify-between text-lg font-semibold">
<span>Total</span>
<span className="text-[#7A4E2D]">
₹{total}
</span>
</div>

</div>


<button
onClick={handleOrder}
className="mt-6 w-full cursor-pointer bg-[#7A4E2D] text-white py-3 rounded-xl hover:bg-[#5c3a21] transition font-semibold"
>
Proceed to Payment
</button>


<div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">

<ShieldCheck size={16}/>

Secure Checkout

</div>

</motion.div>

</div>

<ToastContainer position="top-right"/>

</div>
)

}