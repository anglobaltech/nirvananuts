export default function OrderItem({ name, price, status, date }) {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold">₹{price}</p>
        <span className={`text-xs px-3 py-1 rounded-full ${
          status === "Delivered"
            ? "bg-green-100 text-green-600"
            : status === "Shipped"
            ? "bg-blue-100 text-blue-600"
            : "bg-yellow-100 text-yellow-600"
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}