"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary";
import { createProduct } from "@/services/productService";
import { toast } from "react-toastify";

export default function ProductForm() {

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [description,setDescription] = useState("")
const [quantity,setQuantity] = useState("")
const [unit,setUnit] = useState("gm")
const [image,setImage] = useState(null)
const [loading,setLoading] = useState(false)
const [stock,setStock] = useState(true)

const handleSubmit = async(e)=>{
e.preventDefault()

if(!image){
toast.error("Upload product image")
return
}

setLoading(true)

const imageUrl = await uploadImage(image)

await createProduct({
name,
price,
description,
quantity:Number(quantity),
unit,
image:imageUrl,
stock
})

toast.success("Product created successfully")

setName("")
setPrice("")
setDescription("")
setQuantity("")
setUnit("gm")
setImage(null)
setLoading(false)

}

return(

<form
onSubmit={handleSubmit}
className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-6"
>

<h2 className="text-xl lg:text-2xl font-semibold">
➕ Add Product
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Product Name"
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
value={price}
onChange={(e)=>setPrice(e.target.value)}
placeholder="Price ₹"
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>

</div>

<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Product Description"
className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
/>

<div className="grid grid-cols-2 gap-4">

<input
type="number"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
placeholder="Quantity"
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
/>

<select
value={unit}
onChange={(e)=>setUnit(e.target.value)}
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
>
<option value="gm">gm</option>
<option value="kg">kg</option>
<option value="pcs">pcs</option>
</select>

</div>

<select
value={stock}
onChange={(e)=>setStock(e.target.value === "true")}
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
>
<option value="true">In Stock</option>
<option value="false">Out Of Stock</option>
</select>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
className="border p-3 rounded-lg w-full"
/>

<button
type="submit"
className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:scale-105 hover:shadow-lg transition cursor-pointer"
>

{loading ? "Creating..." : "Create Product"}

</button>

</form>

)
}