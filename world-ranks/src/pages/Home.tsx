import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Country } from '../types/country';
import SkeletonCard from '../components/SkeletonCard';

// 1. Définition des Props pour TypeScript
interface HomeProps {
  favorites: string[];
  toggleFavorite: (cca3: string) => void;
}

export default function Home({ favorites, toggleFavorite }: HomeProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"population" | "name">("population");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [isUNMember, setIsUNMember] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);

  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region,unMember,independent");
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError("Impossible de charger les pays.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    const matchesUN = !isUNMember || country.unMember === true;
    const matchesIndep = !isIndependent || country.independent === true;
    return matchesSearch && matchesRegion && matchesUN && matchesIndep;
  });

  const sortedCountries = useMemo(() => {
    const result = [...filteredCountries];
    if (sortBy === "population") {
      return result.sort((a, b) => b.population - a.population);
    } else {
      return result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
  }, [filteredCountries, sortBy]);

  if (isLoading) {
    return (
      <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 space-y-10 animate-pulse">
             <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </aside>
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-900 dark:text-white">World Ranks</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 font-medium italic">
          Found {sortedCountries.length} countries
        </p>
      </header>
      
      {error && (
        <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-center border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 space-y-10">
          {/* RECHERCHE, TRI, RÉGIONS, STATUS (Identique à ton code précédent) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Search</label>
            <input 
              type="text"
              placeholder="Name, Region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-200 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white transition-all placeholder-gray-500"
            />
          </div>
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
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Region</label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedRegion("")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === "" ? "bg-gray-700 dark:bg-blue-600 text-white shadow-md" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>All</button>
              {regions.map(reg => (
                <button key={reg} onClick={() => setSelectedRegion(reg)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === reg ? "bg-gray-700 dark:bg-blue-600 text-white shadow-md" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>{reg}</button>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isUNMember} onChange={(e) => setIsUNMember(e.target.checked)} className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 accent-blue-600 cursor-pointer" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">UN Member</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isIndependent} onChange={(e) => setIsIndependent(e.target.checked)} className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 accent-blue-600 cursor-pointer" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">Independent</span>
              </label>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCountries.map((country) => {
              const isFav = favorites.includes(country.cca3);
              return (
                <div key={country.cca3} className="relative group">
                  {/* BOUTON FAVORIS */}
                  <button 
                    onClick={() => toggleFavorite(country.cca3)}
                    className={`absolute top-6 right-6 z-10 p-2 rounded-full shadow-lg transition-all transform hover:scale-110 ${isFav ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-400'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  <Link to={`/country/${country.cca3}`} className="h-full flex flex-col">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden rounded-xl mb-4 h-40">
                        <img src={country.flags.svg} alt={country.name.common} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{country.name.common}</h2>
                      <div className="space-y-1 mt-auto">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Region: <span className="font-medium text-gray-800 dark:text-gray-200">{country.region}</span></p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Population: <span className="font-medium text-gray-800 dark:text-gray-200">{country.population.toLocaleString()}</span></p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}