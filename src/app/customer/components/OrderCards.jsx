import OrderItem from "./OrderItems";
import OrderTracker from "./orderTracker";
import { generateInvoice } from "@/utils/generateInvoice";

export default function OrderCard({ order }) {
  return (
    <div className="w-full bg-white border rounded-2xl shadow-sm hover:shadow-xl transition p-4 sm:p-5 lg:p-6">

      {/* HEADER: Switches to row at 'lg' (768px) breakpoint */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start border-b pb-4">
        
        <div>
          <p className="text-xs text-gray-400">ORDER ID</p>
          <p className="font-semibold text-gray-800 break-all text-sm sm:text-base">
            {order.orderId || order.id}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {order.createdAt?.toDate?.().toLocaleString()}
          </p>
        </div>

        {/* Aligns left on mobile, right on 'lg' screens */}
        <div className="text-left lg:text-right mt-1 lg:mt-0">
          <p className="text-xs text-gray-400">TOTAL</p>
          <p className="text-lg sm:text-xl font-bold text-green-600">
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

      {/* TRACKER: Horizontal scroll container in case step-labels bunch up on tiny screens */}
      <div className="mt-6 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
        <OrderTracker status={order.status || "Placed"} />
      </div>

      {/* ADDRESS */}
      <div className="mt-5 bg-gray-50 rounded-xl p-3 text-xs sm:text-sm text-gray-600 break-words">
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

      {/* ACTIONS: Grid layout that goes side-by-side starting at 'xs' (320px) */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mt-6">
        <button className="w-full bg-black text-white py-2.5 sm:py-2 rounded-xl text-sm hover:opacity-80 transition duration-200">
          Track Order
        </button>

        <button
          onClick={() => generateInvoice(order)}
          className="w-full text-black border py-2.5 sm:py-2 rounded-xl text-sm hover:bg-gray-100 transition duration-200"
        >
          Invoice
        </button>
      </div>
    </div>
  );
}