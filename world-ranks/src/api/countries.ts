import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const fields = 'name,cca3,flags,population,region,area,unMember,independent';
  const response = await fetch(`${BASE_URL}/all?fields=${fields}`);
  if (!response.ok) throw new Error('Erreur réseau lors de l’appel API');
  return await response.json();
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!response.ok) throw new Error(`Impossible de trouver le pays : ${code}`);
  const data = await response.json();
  return data[0];
};