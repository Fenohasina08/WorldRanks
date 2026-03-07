import { Link } from 'react-router-dom';

interface HeaderProps {
  countryCount: number;
}

export default function Header({ countryCount }: HeaderProps) {
  return (
    <>
      {/* NAVBAR & LOGO */}
      <nav className="flex items-center justify-between mb-12">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 transition-transform bg-blue-600 shadow-lg rounded-xl shadow-blue-500/30 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            World<span className="text-blue-600">Ranks</span>
          </span>
        </Link>

        {/* BOUTON DARK MODE */}
        <button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="p-3 text-gray-600 transition-all bg-white border border-gray-200 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Toggle Dark Mode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="block w-5 h-5 dark:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="hidden w-5 h-5 dark:block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
          </svg>
        </button>
      </nav>

      {/* TITRE CENTRAL */}
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">World Ranks</h2>
        <p className="font-medium text-gray-500 dark:text-gray-400">
          Exploring {countryCount} nations across the globe
        </p>
      </div>
    </>
  );
}