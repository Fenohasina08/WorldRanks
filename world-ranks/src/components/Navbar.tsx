export default function Navbar({ isDark, toggleDark }: { isDark: boolean, toggleDark: () => void }) {
  return (
    <nav className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <span className="text-xl font-bold dark:text-white">🌍 WorldRanks</span>
      <button 
        onClick={toggleDark}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:ring-2 ring-blue-400 transition-all text-xl"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}