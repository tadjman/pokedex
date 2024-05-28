import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './HomePage.module.css';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:3001/pokemons');
        if (!response.ok) {
          throw new Error('Le serveur json rep pas');
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
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
    const typeMatch = pokemon.types.some(type => type.toLowerCase().includes(searchTerm));
    return nameMatch || typeMatch;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-page">
      <h1></h1>
      <input
        type="text"
        placeholder="Filter the pokemon list, ex: Pikachu..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredPokemons.length === 0 ? (
        <div>No Pokémon found for "{searchTerm}"</div>
      ) : (
      
      <div className="pokemon-list">
        {filteredPokemons.map(pokemon => (
          <Card key={pokemon.id} id={pokemon.id} />
        ))}
      </div>
      )}
    </div>
  );
};

export default HomePage;
