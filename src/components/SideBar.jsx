import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-56 bg-black text-white h-screen px-4 py-6 border-r border-gray-800">
      <h1 className="text-xl font-bold mb-6">YouTube</h1>

      <nav className="space-y-4">
        <Link
          to="/"
          className="block text-sm font-medium hover:bg-zinc-800 px-3 py-2 rounded"
        >
          Home
        </Link>

        <div className="block text-sm text-gray-400 px-3 py-2 rounded">
          Explore
        </div>

        <div className="block text-sm text-gray-400 px-3 py-2 rounded">
          Subscriptions
        </div>

        <div className="block text-sm text-gray-400 px-3 py-2 rounded">
          Library
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
