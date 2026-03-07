import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Country } from '../types/country';

export default function CountryDetail() {
  const { id } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <div className="p-10 text-center dark:bg-gray-900 dark:text-white h-screen">Loading details... ⏳</div>;
  if (!country) return <div className="p-10 text-center dark:bg-gray-900 dark:text-white h-screen">Country not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-4 md:p-8 max-w-5xl mx-auto text-gray-800 dark:text-gray-100">
        <Link to="/" className="inline-block mb-8 px-6 py-2 bg-white dark:bg-gray-800 shadow-md rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          ← Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src={country.flags.svg} alt={country.name.common} className="w-full rounded-lg shadow-2xl" />

          <div>
            <h1 className="text-4xl font-black mb-6">{country.name.common}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
              <p><span className="font-bold opacity-60 uppercase text-xs block">Official Name</span> {country.name.official}</p>
              <p><span className="font-bold opacity-60 uppercase text-xs block">Population</span> {country.population.toLocaleString()}</p>
              <p><span className="font-bold opacity-60 uppercase text-xs block">Region</span> {country.region}</p>
              <p><span className="font-bold opacity-60 uppercase text-xs block">Capital</span> {country.capital?.join(', ') || 'N/A'}</p>
              <p><span className="font-bold opacity-60 uppercase text-xs block">Languages</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
              <p><span className="font-bold opacity-60 uppercase text-xs block">Currencies</span> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
            </div>

            {country.borders && (
              <div className="mt-10">
                <h3 className="font-bold mb-3 opacity-60 uppercase text-xs">Border Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map(border => (
                    <Link 
                      key={border} 
                      to={`/country/${border}`}
                      className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded text-xs hover:border-blue-400"
                    >
                      {border}
                    </Link>
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