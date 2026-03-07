interface SidebarProps {
  selectedRegions: string[];
  onRegionChange: (region: string) => void;
  statusFilters: {
    unMember: boolean;
    independent: boolean;
  };
  onStatusChange: (type: 'unMember' | 'independent') => void;
}

const Sidebar = ({ selectedRegions, onRegionChange, statusFilters, onStatusChange }: SidebarProps) => {
  const regions = ['Americas', 'Antarctic', 'Asia', 'Africa', 'Europe', 'Oceania'];

  return (
    <aside className="w-64 p-4 overflow-y-auto border-r bg-gray-50">
      <div className="mb-6">
        <h3 className="mb-2 font-semibold text-gray-700">Region</h3>
        <ul className="space-y-1">
          {regions.map(region => (
            <li key={region}>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => onRegionChange(region)}
                  className="text-blue-600 rounded focus:ring-blue-500"
                />
                {region}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-gray-700">Status</h3>
        <ul className="space-y-1">
          <li>
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={statusFilters.unMember}
                onChange={() => onStatusChange('unMember')}
                className="text-blue-600 rounded focus:ring-blue-500"
              />
              Member of the United Nations
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={statusFilters.independent}
                onChange={() => onStatusChange('independent')}
                className="text-blue-600 rounded focus:ring-blue-500"
              />
              Independent
            </label>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;