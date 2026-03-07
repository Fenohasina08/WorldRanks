const STORAGE_KEY = "world-ranks-favorites";

export const getSavedFavorites = (): string[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveFavoritesToStorage = (favorites: string[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const toggleFavoriteId = (favorites: string[], id: string): string[] => {
  return favorites.includes(id) 
    ? favorites.filter(favId => favId !== id) 
    : [...favorites, id];
};
