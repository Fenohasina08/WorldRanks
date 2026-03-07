export default function Navbar() {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="flex items-center justify-between px-4 py-6 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          WorldRanks
        </span>
      </div>

      {/* Bouton Thème */}
      <button 
        onClick={toggleDark}
        className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xl"
      >
        <span className="block dark:hidden">🌙</span>
        <span className="hidden dark:block">☀️</span>
      </button>
    </nav>
  );
}