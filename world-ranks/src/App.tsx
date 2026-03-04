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
    <div className='p-8'>
      <h1 className="text-3xl font-bold mb-6">World Ranks</h1>
        <p>Nombre de pays chargés : {countries.length}</p>
    </div>
  )
}

export default App
