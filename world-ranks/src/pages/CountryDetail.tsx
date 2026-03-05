 import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Country } from '../types/country';

export default function CountryDetail() {
  const { id } = useParams(); // Récupère le code (ex: FRA)
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetail = async () => {
      try {
        setIsLoading(true);
        // On cherche par code "alpha" (cca3)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        const data = await response.json();
        setCountry(data[0]); // L'API renvoie toujours un tableau
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryDetail();
  }, [id]); // On relance si l'ID change (ex: clic sur un pays frontalier)

  if (isLoading) return <div className="p-10 text-center">Chargement des détails... ⏳</div>;
  if (!country) return <div className="p-10 text-center">Pays non trouvé.</div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto text-gray-800">
      <Link to="/" className="inline-block mb-8 px-6 py-2 bg-white shadow-md rounded-md hover:bg-gray-50 transition-colors">
        ← Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Drapeau */}
        <img src={country.flags.svg} alt={country.name.common} className="w-full rounded-lg shadow-sm" />

        {/* Infos principales */}
        <div>
          <h1 className="text-4xl font-black mb-6">{country.name.common}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <p><span className="font-bold">Official Name:</span> {country.name.official}</p>
            <p><span className="font-bold">Population:</span> {country.population.toLocaleString()}</p>
            <p><span className="font-bold">Region:</span> {country.region}</p>
            <p><span className="font-bold">Sub Region:</span> {country.subregion}</p>
            <p><span className="font-bold">Capital:</span> {country.capital?.join(', ')}</p>
            
            {/* Transformation des objets en listes lisibles */}
            <p><span className="font-bold">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><span className="font-bold">Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          </div>

          {/* Pays frontaliers */}
          {country.borders && (
            <div className="mt-10">
              <h3 className="font-bold mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <Link 
                    key={border} 
                    to={`/country/${border}`}
                    className="px-4 py-1 bg-white shadow-sm border border-gray-100 rounded text-xs hover:border-blue-400"
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
  );
}