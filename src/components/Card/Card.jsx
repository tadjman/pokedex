import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PKMN_TYPES } from '../../constants/constants';
import './Card.module.css';

export const Card = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pokemon details by id
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
  }, [id]); // Array loading with pokemon id

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>Error: {error.message}</div>; // Show error message

  // Function to get color with pokemon type
  const getTypeColor = (type) => {
    const typeData = PKMN_TYPES.find(t => t.name.toLowerCase() === type.toLowerCase());
    return typeData ? typeData.color : '#000'; // Retourne la couleur ou noir par défaut
  };

  // Function to navigate to pokemon detail page by id
  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="card pokemon-card mb-4" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} className="card-img-top pokemon-image mx-auto" />
      <div className="card-body text-center">
        <h5 className="card-id">#{id}</h5>
        <h5 className="card-title">{pokemon.name}</h5>
        <div className="types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="badge badge-pill"
              style={{ backgroundColor: getTypeColor(type), color: 'white', marginRight: '5px' }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
