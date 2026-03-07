import { Country } from '../types/country';

interface MainContentProps {
  countries: Country[];
}

const MainContent = ({ countries }: MainContentProps) => {
  return (
    <main className="flex-1 p-4 overflow-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Flag</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Population</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Area (km²)</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Region</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country => (
            <tr key={country.cca3} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <img
                  src={country.flags.png}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  className="w-8 h-6 object-cover shadow-sm"
                />
              </td>
              <td className="p-3 font-medium">{country.name.common}</td>
              <td className="p-3">{country.population.toLocaleString()}</td>
              <td className="p-3">{country.area ? country.area.toLocaleString() : 'N/A'}</td>
              <td className="p-3">{country.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {countries.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Aucun pays ne correspond aux filtres</p>
      )}
    </main>
  );
};

export default MainContent;
