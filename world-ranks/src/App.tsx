 import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 1. Ajout des hooks
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar';

function App() {
  // 2. Création de l'état pour le thème
  const [isDark, setIsDark] = useState(false);

  // 3. Effet pour ajouter/supprimer la classe 'dark' sur l'élément racine (html)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 4. On passe les vraies données à la Navbar */}
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;