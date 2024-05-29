import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card';
import './HomePage.module.css';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer la liste des Pokémon
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:3001/pokemons');
        if (!response.ok) {
          throw new Error('Le serveur json ne repond pas');
        }
        const data = await response.json();
        setPokemons(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []); // Le tableau vide signifie que ça se lance une seule fois au montage du compsant

  // Fonction pour gérer les changement dans la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filtre les Pokémon en fonction du nom oui du type
  const filteredPokemons = pokemons.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
    const typeMatch = pokemon.types.some(type => type.toLowerCase().includes(searchTerm));
    return nameMatch || typeMatch;
  });

  if (loading) return <div>Loading...</div>; // Affiche un message de chargement
  if (error) return <div>Error: {error.message}</div>; // Affiche un message d'erreur

  return (
    <div className="home-page container">
      <input
        type="text"
        placeholder="Filter the pokemon list, ex: Pikachu..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-4 mt-4"
        style={{ maxWidth: '500px', margin: '0 auto' }} // Centre la barre
      />
      {filteredPokemons.length === 0 ? (
        <div className="text-center">No Pokémon found for "{searchTerm}"</div> // Message si aucun Pokémon trouvé
      ) : (
        <div className="row">
          {filteredPokemons.map(pokemon => (
            <div className="col-sm-6 col-md-4 col-lg-2 mb-4 d-flex align-items-stretch" key={pokemon.id}>
              <Card id={pokemon.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
