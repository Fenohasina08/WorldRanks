 import { useParams, Link } from 'react-router-dom';

export default function CountryDetail() {
  const { id } = useParams(); // Récupère le code pays (ex: FRA)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold mb-4">Détails du pays : {id}</h1>
        <p className="text-gray-500">Bientôt ici : Toutes les infos sur ce pays !</p>
      </div>
    </div>
  );
}