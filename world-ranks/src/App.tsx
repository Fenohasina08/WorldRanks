import './App.css'
import { useEffect,useState } from 'react'
import type { Country } from './types/country'

function App() {
  const [countries , setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch ("https://restcountries.com/v3.1/all");

        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError("Impossible de charger les données");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries();
  }, [])

  if (isLoading) return <p> Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">World Ranks</h1>
      
      {/* Grille de pays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div key={country.cca3} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <img 
              src={country.flags.svg} 
              alt={country.name.common} 
              className="w-full h-32 object-cover rounded-md mb-4" 
            />
            <h2 className="text-lg font-bold text-gray-900 mb-1">{country.name.common}</h2>
            <p className="text-sm text-gray-600">🌍 Région : {country.region}</p>
            <p className="text-sm text-gray-600">👥 Population : {country.population.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
