 import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar';

function App() {
  const [isDark, setIsDark] = useState(false);

  // Gestion des favoris
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("world-ranks-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("world-ranks-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cca3: string) => {
    setFavorites(prev => 
      prev.includes(cca3) ? prev.filter(id => id !== cca3) : [...prev, cca3]
    );
  };

  // Gestion du mode sombre
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    // On remet les couleurs grises ici 
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} /> 
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          } 
        />
        <Route 
          path="/country/:id" 
          element={
            <CountryDetail 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;