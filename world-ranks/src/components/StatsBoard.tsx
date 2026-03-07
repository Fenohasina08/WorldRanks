interface StatsBoardProps {
  totalCountries: number;
  totalPopulation: number;
  activeRegion: string;
}

export default function StatsBoard({ totalCountries, totalPopulation, activeRegion }: StatsBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Carte : Nombre de pays */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center md:items-start">
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Countries Found</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black text-gray-900 dark:text-white">{totalCountries}</p>
          <span className="text-gray-400 text-sm font-medium">nations</span>
        </div>
      </div>
      
      {/* Carte : Population totale */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center md:items-start">
        <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">Total Population</p>
        <p className="text-3xl font-black text-gray-900 dark:text-white">
          {totalPopulation.toLocaleString()}
        </p>
      </div>

      {/* Carte : Région actuelle */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center md:items-start">
        <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">Region Filter</p>
        <p className="text-3xl font-black text-gray-900 dark:text-white capitalize">
          {activeRegion || "All Regions"}
        </p>
      </div>
    </div>
  );
}