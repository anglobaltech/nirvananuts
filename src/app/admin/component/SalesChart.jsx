"use client"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";

const data = [
{ name: "Jan", sales: 400 },
{ name: "Feb", sales: 800 },
{ name: "Mar", sales: 600 },
{ name: "Apr", sales: 1200 },
{ name: "May", sales: 900 },
];

export default function SalesChart() {

return (

<div className="bg-white p-4 lg:p-6 rounded-xl shadow">

<h2 className="text-lg lg:text-xl text-black font-bold mb-4">
Sales Overview
</h2>

<div className="w-full h-62.5 lg:h-75">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={data}>

<CartesianGrid stroke="#eee" />

<XAxis dataKey="name" />

<YAxis />

<Tooltip />

<Line
type="monotone"
dataKey="sales"
stroke="#4f46e5"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

);

}