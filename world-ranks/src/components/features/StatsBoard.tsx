interface StatsBoardProps {
  totalCountries: number;
  totalPopulation: number;
  activeRegion: string;
}

export default function StatsBoard({ totalCountries, totalPopulation, activeRegion }: StatsBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3 animate-fade-in">
      {/* Pays Trouvés */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <p className="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">Countries Found</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black text-gray-900 dark:text-white">{totalCountries}</p>
          <span className="text-sm font-medium text-gray-400">nations</span>
        </div>
      </div>
      
      {/* Population Totale */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Total Population</p>
        <p className="text-3xl font-black text-gray-900 dark:text-white">
          {totalPopulation.toLocaleString()}
        </p>
      </div>

      {/* Région Filtrée */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <p className="mb-2 text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">Current Region</p>
        <p className="text-3xl font-black text-gray-900 capitalize dark:text-white">
          {activeRegion || "World"}
        </p>
      </div>
    </div>
  );
}