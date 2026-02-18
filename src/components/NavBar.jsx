function Navbar({setSearch}) {
  

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white border-b border-gray-800">
      {/* LEFT */}
      <h1 className="text-xl font-bold">YouTube</h1>

      {/* CENTER */}
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
         
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-1 bg-zinc-900 border border-gray-700 rounded-l-full outline-none"
        />
        <button className="px-4 py-1 bg-zinc-800 border border-gray-700 rounded-r-full">
          🔍
        </button>
      </div>

      {/* RIGHT */}
      <div className="text-sm">Profile</div>
    </div>
  );
}

export default Navbar;
