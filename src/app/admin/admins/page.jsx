"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
collection,
getDocs,
addDoc,
deleteDoc,
doc,
updateDoc,
serverTimestamp
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage(){

const [admins,setAdmins] = useState([])
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [editId,setEditId] = useState(null)



const fetchAdmins = async () => {

const snapshot = await getDocs(collection(db,"admins"))

setAdmins(snapshot.docs.map(doc => ({
id:doc.id,
...doc.data()
})))

}

useEffect(()=>{
fetchAdmins()
},[])



// Create admin
const handleAddAdmin = async () => {

if(!name || !email || !password){
toast.error("Please fill all fields")
return
}

try{

const userCredential = await createUserWithEmailAndPassword(auth,email,password)

await addDoc(collection(db,"admins"),{
uid:userCredential.user.uid,
name,
email,
createdAt:serverTimestamp()
})

setName("")
setEmail("")
setPassword("")

fetchAdmins()

toast.success("Admin created")

}catch(error){
toast.error(error.message)
}

}



// Delete admin
const deleteAdmin = async (id,uid) => {

try{

const res = await fetch("/apiAdmin/deleteAdmin",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({uid})
})

const data = await res.json()

if(!res.ok){
toast.error(data.error)
return
}

await deleteDoc(doc(db,"admins",id))

fetchAdmins()

toast.success("Admin deleted")

}catch{
toast.error("Error deleting admin")
}

}



// Update admin
const handleEditAdmin = async (id) => {

if(!name || !email){
toast.error("Fill all fields")
return
}

await updateDoc(doc(db,"admins",id),{
name,
email
})

setEditId(null)
setName("")
setEmail("")

fetchAdmins()

toast.success("Admin updated")

}



return(

<div className="min-h-screen bg-gray-100 py-10 px-4">

<ToastContainer position="top-right" autoClose={2000} />

<div className="max-w-6xl mx-auto">

{/* Header */}

<h1 className="text-2xl text-center md:text-3xl font-bold text-gray-800 mb-10">
Admin Management
</h1>



{/* Create Admin Form (Centered) */}

<div className="flex justify-center mb-12">

<div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">

<h2 className="text-lg  font-semibold text-gray-700 mb-6">
{editId ? "Update Admin" : "Add New Admin"}
</h2>

<div className="flex flex-col gap-4">

<div>
<label className="text-sm text-gray-600">Admin Name</label>

<input
className="w-full border text-gray-900 mt-1 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="Enter name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
</div>


<div>
<label className="text-sm text-gray-600">Email</label>

<input
className="w-full border mt-1 p-3 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="Enter email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</div>


{!editId && (

<div>
<label className="text-sm text-gray-600">Password</label>

<input
type="password"
className="w-full border mt-1 p-3 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="Enter password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

)}



<button
onClick={editId ? ()=>handleEditAdmin(editId) : handleAddAdmin}
className={`mt-2 py-3 rounded-lg text-white font-semibold transition cursor-pointer
${editId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}
`}
>

{editId ? "Update Admin" : "Add Admin"}

</button>

</div>

</div>

</div>



{/* MOBILE ADMIN CARDS */}

<div className="md:hidden flex flex-col gap-4">

{admins.map(admin => (

<div
key={admin.id}
className="bg-white p-4 rounded-xl shadow-md"
>

<p className="text-sm text-gray-500">
Name
</p>

<p className="font-medium text-gray-800">
{admin.name}
</p>


<p className="text-sm text-gray-500 mt-2">
Email
</p>

<p className="font-medium text-gray-800">
{admin.email}
</p>


<div className="flex gap-3 mt-4">

<button
onClick={()=>{
setEditId(admin.id)
setName(admin.name)
setEmail(admin.email)
}}
className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded cursor-pointer"
>
Edit
</button>

<button
onClick={()=>deleteAdmin(admin.id,admin.uid)}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
>
Delete
</button>

</div>

</div>

))}

</div>



{/* DESKTOP TABLE */}

<div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">

<table className="w-full">

<thead>

<tr className="bg-gray-800 text-white">

<th className="p-4 text-left">Name</th>
<th className="p-4 text-left">Email</th>
<th className="p-4 text-center">Actions</th>

</tr>

</thead>

<tbody>

{admins.map(admin => (

<tr
key={admin.id}
className="border-b hover:bg-gray-50"
>

<td className="p-4 text-gray-700">
{admin.name}
</td>

<td className="p-4 text-gray-700">
{admin.email}
</td>

<td className="p-4 flex justify-center gap-3">

<button
onClick={()=>{
setEditId(admin.id)
setName(admin.name)
setEmail(admin.email)
}}
className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded cursor-pointer"
>
Edit
</button>

<button
onClick={()=>deleteAdmin(admin.id,admin.uid)}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}