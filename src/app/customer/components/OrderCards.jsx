import OrderItem from "./OrderItems";
import OrderTracker from "./orderTracker";
import { generateInvoice } from "@/utils/generateInvoice";

export default function OrderCard({ order }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-6">

      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-4">
        
        <div>
          <p className="text-xs text-gray-400">ORDER ID</p>
          <p className="font-semibold text-gray-800">
            {order.orderId || order.id}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {order.createdAt?.toDate?.().toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">TOTAL</p>
          <p className="text-xl font-bold text-green-600">
            ₹{order.total || order.totalAmount || 0}
          </p>

         <span
  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Shipped"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {order.status}
</span>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mt-5 space-y-3">
       {Array.isArray(order.products) && order.products.length > 0 ? (
  order.products.map((item, i) => (
    <OrderItem key={i} item={item} />
  ))
) : (
  <p className="text-sm text-gray-400">No items</p>
)}
      </div>

      {/* TRACKER */}
      <div className="mt-6">
        <OrderTracker status={order.status || "Placed"} />
      </div>

      {/* ADDRESS */}
      <div className="mt-5 bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
  📍 {
  order.address && typeof order.address === "object"
    ? [
        order.address.address,
        order.address.city,
        order.address.state,
        order.address.pincode,
      ]
        .filter(Boolean)
        .join(", ")
    : order.address || "No address"
}
</div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-black text-white py-2 rounded-xl text-sm hover:opacity-80">
          Track Order
        </button>

        <button
          onClick={() => generateInvoice(order)}
          className="flex-1 text-black border py-2 rounded-xl text-sm hover:bg-gray-100"
        >
          Invoice
        </button>
      </div>
    </div>
  );
}