 import { useEffect, useState, useMemo } from 'react';
import type { Country } from './types/country';

function App() {
  // --- ÉTATS (La mémoire du composant) ---
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"population" | "name">("population");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  // --- RÉCUPÉRATION DES DONNÉES ---
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError("Impossible de charger les pays.");
      } finally {
        setIsLoading(false); // On arrête le chargement quoi qu'il arrive
      }
    };
    fetchCountries();
  }, []);

  // --- LOGIQUE DE FILTRAGE ET TRI ---
  
  // 1. On filtre d'abord par recherche ET par région
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // 2. On trie le résultat (optimisé avec useMemo)
  const sortedCountries = useMemo(() => {
    const result = [...filteredCountries];
    if (sortBy === "population") {
      return result.sort((a, b) => b.population - a.population);
    } else {
      return result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
  }, [filteredCountries, sortBy]);

  // --- AFFICHAGES CONDITIONNELS ---
  if (isLoading) return <div className="p-10 text-center">Chargement des pays... ⏳</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  // --- RENDU FINAL ---
  return (
    <main className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-8">World Ranks</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* SECTION FILTRES (Panneau latéral ou barre du haut) */}
        <aside className="w-full md:w-64 space-y-6">
          {/* Recherche */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-500">Search</label>
            <input
              type="text"
              placeholder="Name, Region..."
              className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tri */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-500">Sort by</label>
            <select 
              className="w-full p-3 rounded-lg bg-gray-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "population" | "name")}
            >
              <option value="population">Population</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Régions */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-500">Region</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion("")}
                className={`px-3 py-1 rounded-full text-sm ${selectedRegion === "" ? "bg-gray-700 text-white" : "bg-gray-200"}`}
              >
                All
              </button>
              {regions.map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1 rounded-full text-sm ${selectedRegion === reg ? "bg-gray-700 text-white" : "bg-gray-200"}`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* SECTION GRILLE DES PAYS */}
        <section className="flex-1">
          <p className="mb-4 text-gray-500 font-semibold">Found {sortedCountries.length} countries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCountries.map((country) => (
              <div key={country.cca3} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <img 
                  src={country.flags.svg} 
                  alt={country.name.common} 
                  className="w-full h-32 object-cover rounded-md mb-4" 
                />
                <h2 className="text-lg font-bold mb-1">{country.name.common}</h2>
                <p className="text-sm text-gray-600">Region: {country.region}</p>
                <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;