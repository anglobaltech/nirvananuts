"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrder, deleteOrder } from "@/services/orderService";

export default function OrdersPage() {

const [orders,setOrders] = useState([])
const [loading,setLoading] = useState(false)

const fetchOrders = async ()=>{

setLoading(true)

try{

const data = await getOrders()
setOrders(Array.isArray(data) ? data : [])

}
catch(error){

console.error("Error fetching orders:",error)
setOrders([])

}

setLoading(false)

}

useEffect(()=>{

fetchOrders()

},[])



const handleStatusChange = async (id,status)=>{

await updateOrder(id,{status})
fetchOrders()

}



const handleDelete = async(id)=>{

if(confirm("Are you sure you want to delete this order?")){

await deleteOrder(id)
fetchOrders()

}

}



return(

<div className="min-h-screen p-4 lg:p-10 bg-gray-100 text-black">

<h1 className="text-2xl lg:text-3xl font-bold mb-6">
Orders
</h1>

{loading ? (

<p>Loading orders...</p>

) : (

<>

{/* ================= DESKTOP TABLE ================= */}

<div className="hidden lg:block overflow-x-auto">

<table className="w-full bg-white rounded-xl shadow overflow-hidden">

<thead className="bg-gray-200">

<tr>
<th className="p-3 text-left">Order ID</th>
<th className="p-3 text-left">Customer</th>
<th className="p-3 text-left">Phone</th>
<th className="p-3 text-left">Address</th>
<th className="p-3 text-left">Products</th>
<th className="p-3 text-left">Total</th>
<th className="p-3 text-left">Status</th>
<th className="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

{orders.length === 0 ? (

<tr>
<td colSpan="8" className="text-center p-5">
No Orders Found
</td>
</tr>

) : (

orders.map(order=>(

<tr key={order.id} className="border-b hover:bg-gray-50">

<td className="p-3">{order.orderId || order.id}</td>

<td className="p-3">
{order.customerName || "No Name"}
<br/>
<span className="text-sm text-gray-500">
{order.customerEmail}
</span>
</td>

<td className="p-3">
{order.customerPhone || "N/A"}
</td>

<td className="p-3 text-sm">
{order.address}
<br/>
{order.city}, {order.state}
<br/>
{order.pincode}
</td>

<td className="p-3 space-y-2">

{(order.products || []).map((prod,idx)=>(

<div key={idx} className="flex items-center space-x-2">

<img
src={prod.image || "/no-image.png"}
className="w-12 h-12 object-cover rounded"
/>

<div>
<p className="font-semibold">{prod.name}</p>
<p className="text-sm text-gray-500">
{prod.quantity} x ₹{prod.price}
</p>
</div>

</div>

))}

</td>

<td className="p-10 font-bold">
₹{order.totalAmount}
</td>

<td className="p-3">

<select
value={order.status || "Pending"}
onChange={(e)=>handleStatusChange(order.id,e.target.value)}
className="border px-2 py-1 rounded"
>

<option value="Pending">Pending</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>

</select>

</td>

<td className="p-3">

<button
onClick={()=>handleDelete(order.id)}
className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
>

Delete

</button>

</td>

</tr>

))

)}

</tbody>

</table>

</div>



{/* ================= MOBILE CARDS ================= */}

<div className="grid gap-4 lg:hidden">

{orders.length === 0 ? (

<p>No Orders Found</p>

) : (

orders.map(order=>(

<div
key={order.id}
className="bg-white rounded-xl shadow p-4 space-y-3"
>

<div className="flex justify-between">

<p className="font-bold">
#{order.orderId || order.id}
</p>

<select
value={order.status || "Pending"}
onChange={(e)=>handleStatusChange(order.id,e.target.value)}
className="border px-2 py-1 rounded text-sm"
>

<option value="Pending">Pending</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>

</select>

</div>


<div className="text-sm">

<p className="font-semibold">
{order.customerName || "No Name"}
</p>

<p className="text-gray-500">
{order.customerEmail}
</p>

<p className="text-gray-500">
{order.customerPhone}
</p>

</div>


<div className="text-sm">

<p className="font-semibold">Address</p>

<p className="text-gray-500">
{order.address}
</p>

<p className="text-gray-500">
{order.city}, {order.state} - {order.pincode}
</p>

</div>


<div>

<p className="font-semibold mb-2">
Products
</p>

{(order.products || []).map((prod,idx)=>(

<div
key={idx}
className="flex items-center gap-3 mb-2"
>

<img
src={prod.image || "/no-image.png"}
className="w-10 h-10 rounded object-cover"
/>

<div className="text-sm">

<p className="font-medium">
{prod.name}
</p>

<p className="text-gray-500">
{prod.quantity} x ₹{prod.price}
</p>

</div>

</div>

))}

</div>


<div className="flex justify-between items-center pt-2">

<p className="font-bold text-lg">
₹{order.totalAmount}
</p>

<button
onClick={()=>handleDelete(order.id)}
className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
>

Delete

</button>

</div>

</div>

))

)}

</div>

</>

)}

</div>

)

}