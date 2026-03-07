import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar'; // 1. On importe la Navbar

function App() {
  return (
    // 2. On ajoute un conteneur avec les classes de base pour le thème
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 3. On affiche la Navbar (avec des fonctions vides pour le moment) */}
      <Navbar isDark={false} toggleDark={() => {}} /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;