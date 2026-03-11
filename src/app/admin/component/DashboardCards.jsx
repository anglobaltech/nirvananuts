"use client"

export default function DashboardCards({title,value}) {

return(

<div className="bg-white shadow-md p-4 lg:p-5 rounded-xl hover:shadow-lg transition">

<h2 className="text-gray-500 text-sm lg:text-base">
{title}
</h2>

<p className="text-2xl lg:text-3xl font-bold text-black">
{value}
</p>

</div>

)

}