"use client"

import DashboardCards from "../component/DashboardCards";
import SalesChart from "../component/SalesChart";

export default function DashboardPage(){

return(

<div className="min-h-screen bg-gray-100 p-4 lg:p-8">

<h1 className="text-2xl lg:text-3xl text-black font-bold mb-6">
Dashboard
</h1>

{/* Stats */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">

<DashboardCards
title="Total Sales"
value="₹12,400"
/>

<DashboardCards
title="Orders"
value="120"
/>

<DashboardCards
title="Customers"
value="85"
/>

<DashboardCards
title="Products"
value="15"
/>

</div>

{/* Chart */}

<SalesChart />

</div>

)

}