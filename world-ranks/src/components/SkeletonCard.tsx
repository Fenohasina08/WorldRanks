// src/components/SkeletonCard.tsx

export default function SkeletonCard() { // <--- Vérifie bien le "default" ici
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-2xl animate-pulse h-80 flex flex-col">
      <div className="bg-gray-300 dark:bg-gray-700 h-40 rounded-xl mb-4"></div>
      <div className="bg-gray-300 dark:bg-gray-700 h-6 w-3/4 rounded mb-3"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 dark:bg-gray-700 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 dark:bg-gray-700 h-4 w-2/3 rounded"></div>
      </div>
    </div>
  );
}