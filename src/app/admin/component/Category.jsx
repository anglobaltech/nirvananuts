"use client";
 
export default function CategoryBreakdown({ categoryData = [] }) {
  if (!categoryData.length) {
    return (
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-black mb-4">Sales by Category</h2>
        <p className="text-sm text-gray-400">No data yet</p>
      </div>
    );
  }
 
  // Sort highest first
  const sorted = [...categoryData].sort((a, b) => b.pct - a.pct);
 
  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold text-black mb-4">Sales by Category</h2>
      <div className="flex flex-col gap-4">
        {sorted.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span className="capitalize">{cat.name}</span>
              <span className="font-medium text-black">{cat.pct}%</span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 7, background: "#f3f4f6" }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${cat.pct}%`,
                  background: cat.color,
                  borderRadius: 4,
                  transition: "width .6s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}