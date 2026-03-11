"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteProduct, updateProduct } from "@/services/productService";

export default function ProductTable(){

const [products,setProducts] = useState([])
const [editId,setEditId] = useState(null)

const [editName,setEditName] = useState("")
const [editPrice,setEditPrice] = useState("")
const [editDesc,setEditDesc] = useState("")
const [editQuantity,setEditQuantity] = useState("")
const [editUnit,setEditUnit] = useState("gm")

const fetchProducts = async()=>{

const snapshot = await getDocs(collection(db,"products"))

const data = snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}))

setProducts(data)

}

useEffect(()=>{
fetchProducts()
},[])

const startEdit = (p)=>{
setEditId(p.id)
setEditName(p.name)
setEditPrice(p.price)
setEditDesc(p.description)
setEditQuantity(p.quantity)
setEditUnit(p.unit)
}

const handleUpdate = async(id)=>{

await updateProduct(id,{
name:editName,
price:editPrice,
description:editDesc,
quantity:Number(editQuantity),
unit:editUnit
})

setEditId(null)
fetchProducts()

}

const handleDelete = async(id)=>{

await deleteProduct(id)
fetchProducts()

}

const toggleStock = async(product)=>{

await updateProduct(product.id,{
stock: !product.stock
})

fetchProducts()

}

return(

<div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6">

<h2 className="text-xl lg:text-2xl font-semibold mb-6">
📦 Products List
</h2>

{/* ================= DESKTOP TABLE ================= */}

<div className="hidden lg:block overflow-x-auto">

<table className="w-full">

<thead>

<tr className="bg-gray-100">
<th className="p-3 text-left">Image</th>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Price</th>
<th className="p-3 text-left">Description</th>
<th className="p-3 text-left">Quantity</th>
<th className="p-3 text-left">Stock</th>
<th className="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

{products.map(product=>{

const editing = editId === product.id

return(

<tr key={product.id} className="border-b hover:bg-gray-50">

<td className="p-3">
<img
src={product.image}
className="w-14 h-14 rounded object-cover"
/>
</td>

<td className="p-3">

{editing ? (
<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
className="border p-1 rounded"
/>
) : product.name}

</td>

<td className="p-3">

{editing ? (
<input
value={editPrice}
onChange={(e)=>setEditPrice(e.target.value)}
className="border p-1 rounded"
/>
) : `₹${product.price}`}

</td>

<td className="p-3 text-sm">

{editing ? (
<textarea
value={editDesc}
onChange={(e)=>setEditDesc(e.target.value)}
className="border p-1 rounded"
 />
) : product.description}

</td>

<td className="p-3">

{editing ? (

<div className="flex gap-2">

<input
type="number"
value={editQuantity}
onChange={(e)=>setEditQuantity(e.target.value)}
className="border p-1 rounded w-20"
/>



<select
value={editUnit}
onChange={(e)=>setEditUnit(e.target.value)}
className="border p-1 rounded"
>
<option value="gm">gm</option>
<option value="kg">kg</option>
<option value="pcs">pcs</option>
</select>

</div>

) : `${product.quantity} ${product.unit}`}

</td>

{/* stock */}
<td className="p-3">

<button
onClick={()=>toggleStock(product)}
className={`px-3 py-1 rounded text-white cursor-pointer ${
product.stock ? "bg-green-500" : "bg-red-500"
}`}
>
{product.stock ? "In Stock" : "Out of Stock"}
</button>

</td>

<td className="p-3 space-x-2">

{editing ? (

<button
onClick={()=>handleUpdate(product.id)}
className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
>
Save
</button>

) : (

<button
onClick={()=>startEdit(product)}
className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
>
Edit
</button>

)}

<button
onClick={()=>handleDelete(product.id)}
className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
>
Delete
</button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>


{/* ================= MOBILE PRODUCT CARDS ================= */}

<div className="grid gap-5 lg:hidden">

{products.map(product=>{

const editing = editId === product.id

return(

<div
key={product.id}
className="border rounded-xl p-4 shadow-sm bg-gray-50 space-y-3"
>

<img
src={product.image}
className="w-full h-40 object-cover rounded"
/>

{/* NAME */}

{editing ? (
<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
className="border p-2 rounded w-full"
/>
) : (
<p className="font-semibold text-lg">
{product.name}
</p>
)}


{/* PRICE */}

{editing ? (
<input
value={editPrice}
onChange={(e)=>setEditPrice(e.target.value)}
className="border p-2 rounded w-full"
/>
) : (
<p className="text-gray-600">
Price: ₹{product.price}
</p>
)}


{/* DESCRIPTION */}

{editing ? (
<textarea
value={editDesc}
onChange={(e)=>setEditDesc(e.target.value)}
className="border p-2 rounded w-full"
/>
) : (
<p className="text-gray-500 text-sm">
{product.description}
</p>
)}


{/* QUANTITY */}

{editing ? (

<div className="flex gap-2">

<input
type="number"
value={editQuantity}
onChange={(e)=>setEditQuantity(e.target.value)}
className="border p-2 rounded w-24"
/>

<select
value={editUnit}
onChange={(e)=>setEditUnit(e.target.value)}
className="border p-2 rounded"
>

<option value="gm">gm</option>
<option value="kg">kg</option>
<option value="pcs">pcs</option>

</select>



</div>

) : (

<p className="text-sm">
Stock: {product.quantity} {product.unit}
</p>

)}


{/* BUTTONS */}

<div className="flex gap-3 pt-2">

{editing ? (

<button
onClick={()=>handleUpdate(product.id)}
className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
>
Save
</button>

) : (

<button
onClick={()=>startEdit(product)}
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
>
Edit
</button>

)}

<button
onClick={()=>handleDelete(product.id)}
className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
>
Delete
</button>

</div>

</div>

)

})}

</div>

</div>

)

}