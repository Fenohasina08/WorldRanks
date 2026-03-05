import { useParams, Link } from 'react-router-dom';

const CountryDetail = () => {
  const { id } = useParams(); // Récupère le code pays (ex: FRA)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-4">Détails pour : {id}</h1>
      <p className="text-gray-500 italic">Le chargement des données complètes arrive au prochain commit...</p>
    </div>
  );
};

export default CountryDetail;