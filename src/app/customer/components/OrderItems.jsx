export default function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
      
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover border"
      />

      <div className="flex-1">
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
      </div>

      <p className="font-semibold text-gray-800">₹{item.price}</p>
    </div>
  );
}