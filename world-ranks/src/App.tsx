import { useState, useEffect } from 'react';
import { fetchAllCountries } from './api/countries';
import type { Country } from './types/country';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState({
    unMember: false,
    independent: false,
  });

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    let result = countries;

    if (selectedRegions.length > 0) {
      result = result.filter(c => selectedRegions.includes(c.region));
    }

    if (statusFilters.unMember) {
      result = result.filter(c => c.unMember === true);
    }
    if (statusFilters.independent) {
      result = result.filter(c => c.independent === true);
    }

    setFilteredCountries(result);
  }, [countries, selectedRegions, statusFilters]);

  const handleRegionChange = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const handleStatusChange = (type: 'unMember' | 'independent') => {
    setStatusFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <div className = "flex w-full h-1/3">{header}</div>
      <div className='flex w-full h-3/2'>{sidebar}</div>
     </div>
  );
};

export default App;