import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/layout/Navbar';
import { getSavedFavorites, saveFavoritesToStorage, toggleFavoriteId } from './backend/favoriteService';

function App() {
  // On utilise notre service backend pour initialiser les favoris
  const [favorites, setFavorites] = useState<string[]>(() => getSavedFavorites());

  // On synchronise avec le localStorage à chaque changement
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const handleToggleFavorite = (cca3: string) => {
    setFavorites(prev => toggleFavoriteId(prev, cca3));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121214] transition-colors duration-300">
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={<Home favorites={favorites} toggleFavorite={handleToggleFavorite} />} 
        />
        <Route 
          path="/country/:id" 
          element={<CountryDetail favorites={favorites} toggleFavorite={handleToggleFavorite} />} 
        />
      </Routes>
    </div>
  );
}

export default App;