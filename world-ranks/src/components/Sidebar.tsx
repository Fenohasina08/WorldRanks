interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: "population" | "name";
  setSortBy: (val: "population" | "name") => void;
  selectedRegion: string;
  setSelectedRegion: (val: string) => void;
  isUNMember: boolean;
  setIsUNMember: (val: boolean) => void;
  isIndependent: boolean;
  setIsIndependent: (val: boolean) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (val: boolean) => void;
}

export default function Sidebar({
  searchQuery, setSearchQuery,
  sortBy, setSortBy,
  selectedRegion, setSelectedRegion,
  isUNMember, setIsUNMember,
  isIndependent, setIsIndependent,
  showOnlyFavorites, setShowOnlyFavorites
}: SidebarProps) {
  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  return (
    <aside className="w-full lg:w-72 space-y-10">
      {/* 1. RECHERCHE */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Search</label>
        <input 
          type="text"
          placeholder="Name, Region..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-200 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white transition-all"
        />
      </div>

      {/* 2. FAVORIS (Nouveau !) */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Selection</label>
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`w-full p-3 rounded-xl text-sm font-bold transition-all border-2 ${
            showOnlyFavorites 
            ? "bg-red-500 border-red-500 text-white shadow-lg" 
            : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-400"
          }`}
        >
          {showOnlyFavorites ? "❤️ Favorites Only" : "🤍 All Countries"}
        </button>
      </div>

      {/* 3. TRI */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Sort by</label>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "population" | "name")}
          className="w-full p-3 rounded-xl bg-gray-200 dark:bg-gray-800 border-2 border-transparent outline-none cursor-pointer text-gray-900 dark:text-white transition-all"
        >
          <option value="population">Population</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* 4. RÉGIONS */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Region</label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedRegion("")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === "" ? "bg-gray-700 dark:bg-blue-600 text-white shadow-md" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>All</button>
          {regions.map(reg => (
            <button key={reg} onClick={() => setSelectedRegion(reg)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === reg ? "bg-gray-700 dark:bg-blue-600 text-white shadow-md" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>{reg}</button>
          ))}
        </div>
      </div>

      {/* 5. STATUS */}
      <div className="space-y-5">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={isUNMember} onChange={(e) => setIsUNMember(e.target.checked)} className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 accent-blue-600" />
            <span className="text-sm font-semibold group-hover:text-blue-500 transition-colors">UN Member</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={isIndependent} onChange={(e) => setIsIndependent(e.target.checked)} className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 accent-blue-600" />
            <span className="text-sm font-semibold group-hover:text-blue-500 transition-colors">Independent</span>
          </label>
        </div>
      </div>
    </aside>
  );
}