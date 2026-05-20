export default function Navbar() {
  return (
    <div className="bg-white mt-30 shadow p-4 flex justify-between">
      <h2 className="font-bold">Dashboard</h2>

      <button className="bg-red-500 text-white px-4 py-1 rounded">
        Logout
      </button>
    </div>
  )
}