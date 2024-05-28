import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PKMN_TYPES } from '../../constants/constants'; // Import des constantes
import './Card.module.css';

const Card = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisation du hook useNavigate

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getTypeColor = (type) => {
    const typeData = PKMN_TYPES.find(t => t.name.toLowerCase() === type.toLowerCase());
    return typeData ? typeData.color : '#000';
  };

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h2>#{id} {pokemon.name}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} />
      <div className="types">
        {pokemon.types.map((type, index) => (
          <span
            key={index}
            className="type"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
