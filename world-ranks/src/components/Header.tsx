const Header = ({ total }) => {
  return (
    <div className="p-4 border-b shadow-sm bg-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">WorldRanks</h1>
        <span className="text-gray-600">Found {total} countries</span>
      </div>
      <div className="flex gap-3 mt-3">
        <input
          type="text"
          placeholder="Search by Name, Region, Subregion"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="px-5 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
          Sort by
        </button>
      </div>
    </div>
  );
};

export default Header;