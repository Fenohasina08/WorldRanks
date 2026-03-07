import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Country } from '../types/country';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // États de filtrage
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"population" | "name">("population");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  
  // NOUVEAUX ÉTATS (Filtres de statut)
  const [isUNMember, setIsUNMember] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);

  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        // Note : On ajoute unMember et independent dans les fields !
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

  // LOGIQUE DE FILTRAGE MISE À JOUR
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    
    // Application de la règle du "Laissez-passer"
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

  if (isLoading) return <div className="p-10 text-center dark:text-white">Chargement... ⏳</div>;

  return (
    <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 transition-colors">
      <h1 className="text-3xl font-bold mb-8 text-center">World Ranks</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-8">
          {/* ... Barre de recherche et Tri (inchangés) ... */}

          {/* SECTION STATUS (Nouveaux inputs) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase">Status</h2>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isUNMember}
                onChange={(e) => setIsUNMember(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm font-medium group-hover:text-blue-500">UN Member</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isIndependent}
                onChange={(e) => setIsIndependent(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm font-medium group-hover:text-blue-500">Independent</span>
            </label>
          </div>
        </aside>

        <section className="flex-1">
          <p className="mb-4 text-gray-500">Found {sortedCountries.length} countries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCountries.map((country) => (
              <Link to={`/country/${country.cca3}`} key={country.cca3}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-400 transition-all h-full">
                  <img src={country.flags.svg} alt={country.name.common} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-lg font-bold mb-1">{country.name.common}</h2>
                  <p className="text-sm opacity-70">Region: {country.region}</p>
                  <p className="text-sm opacity-70">Population: {country.population.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}