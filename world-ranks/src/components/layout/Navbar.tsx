export default function Navbar() {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
      <div className="flex items-center gap-2 cursor-pointer group">
        <span className="text-3xl transition-transform group-hover:rotate-12">🌍</span>
        <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
          World<span className="text-blue-600">Ranks</span>
        </span>
      </div>

      <button 
        onClick={toggleDark}
        className="p-3 text-xl transition-all bg-white border border-gray-200 shadow-sm rounded-xl dark:border-gray-800 dark:bg-gray-900 hover:scale-110"
        aria-label="Toggle Theme"
      >
        <span className="block dark:hidden">🌙</span>
        <span className="hidden dark:block">☀️</span>
      </button>
    </nav>
  );
}