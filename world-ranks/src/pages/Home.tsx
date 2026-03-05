import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import important !
import type { Country } from '../types/country';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"population" | "name">("population");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        // On garde ton URL qui marche !
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region");
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
    return matchesSearch && matchesRegion;
  });

  const sortedCountries = useMemo(() => {
    const result = [...filteredCountries];
    if (sortBy === "population") {
      return result.sort((a, b) => b.population - a.population);
    } else {
      return result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
  }, [filteredCountries, sortBy]);

  if (isLoading) return <div className="p-10 text-center">Chargement... ⏳</div>;

  return (
    <main className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">World Ranks</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
            {/* ... Tes filtres (Search, Sort, Region) inchangés ... */}
        </aside>

        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCountries.map((country) => (
              /* ON CHANGE LA DIV PAR UN LINK */
              <Link to={`/country/${country.cca3}`} key={country.cca3}>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-400 transition-all cursor-pointer h-full">
                  <img src={country.flags.svg} alt={country.name.common} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-lg font-bold mb-1">{country.name.common}</h2>
                  <p className="text-sm text-gray-600">Region: {country.region}</p>
                  <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}