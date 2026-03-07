 import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 1. Ajout des hooks
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar';

 function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    /* LIGNE DE TEST : Rouge en Light mode, Bleu en Dark mode */
    <div className="min-h-screen bg-red-500 dark:bg-blue-500 transition-colors">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;