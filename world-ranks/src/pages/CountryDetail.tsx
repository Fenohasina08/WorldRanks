import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Country } from '../types/country';

// 1. Définition des Props
interface CountryDetailProps {
  favorites: string[];
  toggleFavorite: (cca3: string) => void;
}

export default function CountryDetail({ favorites, toggleFavorite }: CountryDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isFav = country ? favorites.includes(country.cca3) : false;

  useEffect(() => {
    const fetchCountryDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors">
        <div className="text-xl font-medium animate-pulse">Loading details... ⏳</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">Country not found.</h1>
        <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 md:p-12 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
        <Link to="/" className="inline-flex items-center gap-2 mb-12 px-8 py-2 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:shadow-lg dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700 font-medium">
          <span className="text-xl">←</span> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <img src={country.flags.svg} alt={country.name.common} className="w-full h-auto object-cover" />
          </div>

          <div className="py-2">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">{country.name.common}</h1>
              {/* BOUTON FAVORIS DANS DETAIL */}
              <button 
                onClick={() => toggleFavorite(country.cca3)}
                className={`p-3 rounded-xl shadow-md transition-all ${isFav ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 text-base border-t border-gray-200 dark:border-gray-800 pt-8">
              {/* Même contenu que précédemment (Official Name, Population, etc.) */}
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Official Name</span><p className="font-medium">{country.name.official}</p></div>
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Population</span><p className="font-medium">{country.population.toLocaleString()}</p></div>
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Region</span><p className="font-medium">{country.region}</p></div>
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Capital</span><p className="font-medium">{country.capital?.join(', ') || 'N/A'}</p></div>
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Languages</span><p className="font-medium">{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p></div>
              <div className="space-y-1"><span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest block mb-1">Currencies</span><p className="font-medium">{country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p></div>
            </div>

            {country.borders && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-bold mb-4 text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-widest">Border Countries</h3>
                <div className="flex flex-wrap gap-3">
                  {country.borders.map(border => (
                    <Link key={border} to={`/country/${border}`} className="px-5 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 transition-all duration-200">{border}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}