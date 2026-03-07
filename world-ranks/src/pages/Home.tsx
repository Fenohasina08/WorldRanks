import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Country } from '../types/country';
import SkeletonCard from '../components/SkeletonCard';
import StatsBoard from '../components/StatsBoard';
import Navbar from '../components/Navbar'; // Import de la Tâche 1

interface HomeProps {
  favorites: string[];
  toggleFavorite: (cca3: string) => void;
}

export default function Home({ favorites, toggleFavorite }: HomeProps) {
  // --- ÉTATS ---
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"population" | "name">("population");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [isUNMember, setIsUNMember] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  // --- APPEL API ---
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region,unMember,independent"
        );
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

  // --- LOGIQUE DE FILTRAGE ET TRI ---
  const filteredAndSortedCountries = useMemo(() => {
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
      const matchesUN = !isUNMember || country.unMember === true;
      const matchesIndep = !isIndependent || country.independent === true;
      const matchesFavorites = !showOnlyFavorites || favorites.includes(country.cca3);

      return matchesSearch && matchesRegion && matchesUN && matchesIndep && matchesFavorites;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "population") return b.population - a.population;
      return a.name.common.localeCompare(b.name.common);
    });
  }, [countries, searchQuery, selectedRegion, isUNMember, isIndependent, showOnlyFavorites, favorites, sortBy]);

  // --- CALCUL DES STATS ---
  const totalPopulation = useMemo(() => {
    return filteredAndSortedCountries.reduce((acc, c) => acc + c.population, 0);
  }, [filteredAndSortedCountries]);

  // --- ÉCRAN DE CHARGEMENT ---
  if (isLoading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full space-y-10 lg:w-72 animate-pulse">
             <div className="w-1/2 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </aside>
          <section className="flex-1">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 text-gray-800 transition-colors bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      
      {/* Tâche 1 : Navbar */}
      <Navbar />

      {/* Tâche 2 : En-tête Titre (Header Section) */}
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white">World Ranks</h1>
        <p className="font-medium text-gray-500 dark:text-gray-400">
          Exploring {countries.length} nations across the globe
        </p>
      </header>

      {/* COMPOSANT DES STATS */}
      <StatsBoard 
        totalCountries={filteredAndSortedCountries.length}
        totalPopulation={totalPopulation}
        activeRegion={selectedRegion || "World"}
      />
      
      {error && (
        <div className="p-4 mb-8 text-center text-red-700 bg-red-100 border border-red-200 rounded-lg dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* BARRE LATÉRALE */}
        <aside className="w-full space-y-10 lg:w-72">
          {/* RECHERCHE */}
          <div className="space-y-3">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">Search</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Name, Region, Code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 text-gray-900 transition-all bg-white border-2 border-gray-100 shadow-sm outline-none rounded-xl dark:bg-gray-800 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 dark:text-white"
              />
            </div>
          </div>

          {/* FILTRE FAVORIS */}
          <div className="space-y-3">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">Selection</label>
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`w-full p-3 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                showOnlyFavorites 
                ? "bg-red-500 border-red-500 text-white shadow-lg" 
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-400"
              }`}
            >
              <span>{showOnlyFavorites ? "❤️" : "🤍"}</span>
              {showOnlyFavorites ? "Showing Favorites" : "Show Favorites Only"}
            </button>
          </div>

          {/* TRI */}
          <div className="space-y-3">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "population" | "name")}
              className="w-full p-3 text-gray-900 bg-white border-2 border-gray-100 shadow-sm outline-none cursor-pointer rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="population">Population</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* RÉGIONS */}
          <div className="space-y-3">
            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">Region</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion("")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === "" ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"}`}
              >
                All
              </button>
              {regions.map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedRegion === reg ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"}`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">Status</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isUNMember}
                  onChange={(e) => setIsUNMember(e.target.checked)}
                  className="w-5 h-5 border-gray-300 rounded cursor-pointer dark:border-gray-600 accent-blue-600"
                />
                <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-blue-500 dark:text-gray-300">UN Member</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isIndependent}
                  onChange={(e) => setIsIndependent(e.target.checked)}
                  className="w-5 h-5 border-gray-300 rounded cursor-pointer dark:border-gray-600 accent-blue-600"
                />
                <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-blue-500 dark:text-gray-300">Independent</span>
              </label>
            </div>
          </div>
        </aside>

        {/* GRILLE DE CARTES */}
        <section className="flex-1">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedCountries.map((country, index) => {
              const isFav = favorites.includes(country.cca3);
              return (
                <div 
                  key={country.cca3} 
                  className="relative group animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <button 
                    onClick={() => toggleFavorite(country.cca3)}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-lg transition-all transform hover:scale-125 active:scale-95 ${
                      isFav ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-700/90 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  <Link to={`/country/${country.cca3}`} className="flex flex-col h-full">
                    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:shadow-xl">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={country.flags.svg} 
                          alt={country.name.common} 
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <h2 className="mb-4 text-lg font-bold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {country.name.common}
                        </h2>
                        <div className="mt-auto space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Region</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{country.region}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Population</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{country.population.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {filteredAndSortedCountries.length === 0 && (
            <div className="py-20 text-center animate-fade-in">
              <p className="mb-4 text-3xl">🏜️</p>
              <p className="text-xl text-gray-500 dark:text-gray-400">No countries found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}