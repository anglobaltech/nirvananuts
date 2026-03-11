"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import Image from "next/image"

export default function CartPage() {

const [cartItems,setCartItems] = useState([])
const [loading,setLoading] = useState(true)
const [coupon,setCoupon] = useState("")
const [discount,setDiscount] = useState(0)

const user = auth.currentUser


/* FETCH CART */

useEffect(() => {

const unsubscribe = onAuthStateChanged(auth, async (user) => {

if(user){

const docRef = doc(db,"carts",user.uid)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
setCartItems(docSnap.data().items || [])
}

}else{

const localCart = JSON.parse(localStorage.getItem("cart")) || []
setCartItems(localCart)

}

setLoading(false)

})

return () => unsubscribe()

},[])


useEffect(()=>{
AOS.init({
duration:800,
once:true
})
},[])



/* UPDATE QUANTITY */

const updateQuantity = async (index,change) => {

const updated = [...cartItems]

updated[index].quantity += change

if(updated[index].quantity <= 0){
updated.splice(index,1)
}

setCartItems(updated)

if(user){
await updateDoc(doc(db,"carts",user.uid),{
items: updated
})
}

}



/* REMOVE ITEM */

const removeItem = async (index) => {

const updated = cartItems.filter((_,i)=>i!==index)

setCartItems(updated)

if(user){
await updateDoc(doc(db,"carts",user.uid),{
items: updated
})
}

}



/* COUPON */

const applyCoupon = () => {

if(coupon === "SAVE10"){
setDiscount(0.10)
}

else if(coupon === "SAVE20"){
setDiscount(0.20)
}

else{
alert("Invalid Coupon")
}

}



/* TOTALS */

const subtotal = cartItems.reduce((acc,item)=>acc + item.price * item.quantity,0)

let shipping = 80

if(subtotal > 500){
shipping = 0
}

const discountAmount = subtotal * discount

const total = subtotal + shipping - discountAmount

const freeShippingLeft = 500 - subtotal


/* DELIVERY DATE */

const today = new Date()

const deliveryDate = new Date(today)

deliveryDate.setDate(today.getDate()+3)

const deliveryText = deliveryDate.toDateString()



return (

<div className="min-h-screen mt-24 px-6 py-10 bg-linear-to-br from-[#fff7e6] via-[#f5f5dc] to-[#e6f4ea] text-gray-800">

<h1
data-aos="fade-right"
className="text-4xl font-bold mb-10"
>
🛒 Your Shopping Cart
</h1>


{loading ? (

<p>Loading...</p>

) : (

<div className="grid lg:grid-cols-3 gap-10">


{/* CART ITEMS */}

<div className="lg:col-span-2 space-y-6">

{cartItems.map((item,index)=>(

<div
key={index}
data-aos="fade-up"
className="bg-white border shadow-lg p-6 rounded-2xl flex items-center justify-between hover:shadow-2xl hover:-translate-y-1 transition"
>


{/* PRODUCT */}

<div className="flex items-center gap-5">

<Image
src={item.image}
height={100}
width={100}
alt="product image"
className="w-24 h-24 rounded-xl object-cover"
/>

<div>

<h2 className="font-semibold text-lg">
{item.name}
</h2>

<p className="text-gray-500">
₹{item.price} / {item.unit}
</p>

<button
onClick={()=>removeItem(index)}
className="text-red-500 text-sm cursor-pointer hover:underline mt-1"
>
Remove
</button>

</div>

</div>



{/* QUANTITY */}

<div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full">

<button
onClick={()=>updateQuantity(index,-1)}
className="w-8 h-8 rounded-full bg-white shadow hover:bg-gray-200"
>
-
</button>

<span className="font-semibold">
{item.quantity}
</span>

<button
onClick={()=>updateQuantity(index,1)}
className="w-8 h-8 rounded-full bg-white shadow hover:bg-gray-200"
>
+
</button>

</div>


{/* PRICE */}

<p className="text-lg font-bold text-indigo-600">
₹{item.price * item.quantity}
</p>

</div>

))}



<Link href="/">

<button className="mt-4 px-6 py-3 cursor-pointer bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:scale-105 transition">
← Continue Shopping
</button>

</Link>

</div>



{/* ORDER SUMMARY */}

<div className="bg-white border p-8 rounded-2xl shadow-xl h-fit sticky top-28">

<h2 className="text-2xl font-bold mb-6">
Order Summary
</h2>


{/* FREE SHIPPING */}

{subtotal < 500 && (

<div className="mb-6">

<p className="text-sm mb-2 text-gray-600">
Add ₹{freeShippingLeft} more for FREE Shipping 🚚
</p>

<div className="w-full bg-gray-200 h-3 rounded-full">

<div
className="bg-green-500 h-3 rounded-full"
style={{width:`${(subtotal/500)*100}%`}}
></div>

</div>

</div>

)}



{/* COUPON */}

<div className="flex gap-2 mb-6">

<input
type="text"
placeholder="Coupon code"
value={coupon}
onChange={(e)=>setCoupon(e.target.value)}
className="border px-4 py-2 rounded-lg w-full"
/>

<button
onClick={applyCoupon}
className="bg-black text-white cursor-pointer px-4 rounded-lg"
>
Apply
</button>

</div>



<div className="flex justify-between mb-3 text-gray-600">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="flex justify-between mb-3 text-gray-600">
<span>Shipping</span>
<span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
</div>

{discount > 0 && (

<div className="flex justify-between mb-3 text-green-600">
<span>Discount</span>
<span>-₹{discountAmount}</span>
</div>

)}


<hr className="my-4"/>


<div className="flex justify-between text-xl font-bold">
<span>Total</span>
<span className="text-indigo-600">
₹{total}
</span>
</div>


{/* DELIVERY */}

<p className="text-sm text-gray-500 mt-4">
📦 Estimated Delivery: <b>{deliveryText}</b>
</p>



<Link href="/customer/checkout">

<button className="mt-8 w-full py-4 rounded-xl text-white font-semibold cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg hover:scale-105 transition">
Proceed to Checkout →
</button>

</Link>


</div>

</div>

)}

</div>

)

}