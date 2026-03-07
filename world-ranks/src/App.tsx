import { useState, useEffect } from 'react';
import { fetchAllCountries } from './api/countries';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    unMember: false,
    independent: false,
  });

  // Chargement initial
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Appliquer les filtres à chaque changement
  useEffect(() => {
    let result = countries;

    // Filtre par région
    if (selectedRegions.length > 0) {
      result = result.filter(c => selectedRegions.includes(c.region));
    }

    // Filtre par statut
    if (statusFilters.unMember) {
      result = result.filter(c => c.unMember === true);
    }
    if (statusFilters.independent) {
      result = result.filter(c => c.independent === true);
    }

    setFilteredCountries(result);
  }, [countries, selectedRegions, statusFilters]);

  // Gestionnaires
  const handleRegionChange = (region) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleStatusChange = (type) => {
    setStatusFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <Header total={countries.length} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedRegions={selectedRegions}
          onRegionChange={handleRegionChange}
          statusFilters={statusFilters}
          onStatusChange={handleStatusChange}
        />
        <MainContent countries={filteredCountries} />
      </div>
    </div>
  );
};

export default App;