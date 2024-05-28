import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Review } from '../../components/Review/Review';
import { PKMN_TYPES } from '../../constants/constants';
import { MAX_STAT } from '../../constants/constants';

import './DetailPage.module.css';

export const DetailPage = () => {
  const { id } = useParams(); // Récupérer l'ID du Pokémon à partir de l'URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data);
        setLikes(data.likes);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reviews/?pokemonId=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
    fetchReviews();
  }, [id]);

  const handleAddReview = () => {
    if (newReview) {
      const review = {
        author: 'Me',
        content: newReview,
        pokemonId: id
      };
      setReviews([...reviews, review]);
      setNewReview('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddReview();
    }
  };

  const handleLike = async () => {
    try {
      // Mettez à jour le nombre de likes localement
      const updatedLikes = isLiked ? likes - 1 : likes + 1;
      setLikes(updatedLikes);
      setIsLiked(!isLiked);

      // Mettez à jour le nombre de likes sur le serveur
      const response = await fetch(`http://localhost:3001/pokemons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: updatedLikes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update likes on the server');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      // Revert local state in case of an error
      setLikes(isLiked ? likes + 1 : likes - 1);
      setIsLiked(isLiked);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!pokemon) return null; // Assurez-vous que les données du Pokémon sont chargées

  // Fonction pour obtenir la couleur de fond en fonction du type
  const getTypeColor = (type) => {
    const typeData = PKMN_TYPES.find(t => t.name.toLowerCase() === type.toLowerCase());
    return typeData ? typeData.color : '#000';
  };

  return (
    <div className="detail-page">
      <div className="pokemon-info">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} className="pokemon-image" />
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <div className="types">
          {pokemon.types.map((type) => (
            <span key={type} className="type-badge" style={{ backgroundColor: getTypeColor(type) }}>
              {type}
            </span>
          ))}
        </div>
        {pokemon.stats && (
          <div className="stats">
            <ProgressBar label="HP" value={pokemon.stats.hp} max={MAX_STAT.hp} />
            <ProgressBar label="Attack" value={pokemon.stats.attack} max={MAX_STAT.attack} />
            <ProgressBar label="Defense" value={pokemon.stats.defense} max={MAX_STAT.defense} />
            <ProgressBar label="Special Attack" value={pokemon.stats.specialAttack} max={MAX_STAT.specialAttack} />
            <ProgressBar label="Special Defense" value={pokemon.stats.specialDefense} max={MAX_STAT.specialDefense} />
            <ProgressBar label="Speed" value={pokemon.stats.speed} max={MAX_STAT.speed} />
          </div>
        )}
        <div className="likes">
          <span role="img" aria-label="heart" onClick={handleLike} className="like-icon">
            {isLiked ? '❤️' : '🤍'}
          </span> {likes}
        </div>
      </div>
      <div className="reviews">
        <h3>Reviews</h3>
        <textarea
          placeholder="Add a review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          onKeyPress={handleKeyPress}
          className="review-input"
          maxLength="100"
        ></textarea>
        {reviews.map((review, index) => (
          <Review key={index} content={review.content} author={review.author} />
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
