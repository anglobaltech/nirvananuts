export default function StatCard({ title, value, sub, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
      <p className={`text-sm mt-1 ${color}`}>{sub}</p>
    </div>
  );
}