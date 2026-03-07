import { Country } from '../types/country';

interface FilterOptions {
  searchQuery: string;
  selectedRegion: string;
  isUNMember: boolean;
  isIndependent: boolean;
  showOnlyFavorites: boolean;
  favorites: string[];
  sortBy: "population" | "name";
}

export const getFilteredCountries = (countries: Country[], options: FilterOptions) => {
  const { 
    searchQuery, selectedRegion, isUNMember, 
    isIndependent, showOnlyFavorites, favorites, sortBy 
  } = options;

  const filtered = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    const matchesUN = !isUNMember || country.unMember === true;
    const matchesIndep = !isIndependent || country.independent === true;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(country.cca3);

    return matchesSearch && matchesRegion && matchesUN && matchesIndep && matchesFavorites;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "population") return b.population - a.population;
    return a.name.common.localeCompare(b.name.common);
  });
};
