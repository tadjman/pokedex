import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Review } from '../../components/Review/Review';
import './DetailPage.module.css';

const MAX_STAT = {
  attack: 130,
  defense: 180,
  specialAttack: 135,
  specialDefense: 120,
  speed: 120,
  hp: 105,
};

const getTypeColor = (type) => {
  const PKMN_TYPES = [
    { name: 'normal', color: '#A8A77A' },
    { name: 'fighting', color: '#C22E28' },
    { name: 'flying', color: '#A98FF3' },
    { name: 'poison', color: '#A33EA1' },
    { name: 'ground', color: '#E2BF65' },
    { name: 'rock', color: '#B6A136' },
    { name: 'bug', color: '#A6B91A' },
    { name: 'ghost', color: '#735797' },
    { name: 'steel', color: '#B7B7CE' },
    { name: 'fire', color: '#EE8130' },
    { name: 'water', color: '#6390F0' },
    { name: 'grass', color: '#7AC74C' },
    { name: 'electric', color: '#F7D02C' },
    { name: 'psychic', color: '#F95587' },
    { name: 'ice', color: '#96D9D6' },
    { name: 'dragon', color: '#6F35FC' },
    { name: 'dark', color: '#705746' },
    { name: 'fairy', color: '#D685AD' },
    { name: 'unknown', color: '#68A090' },
    { name: 'shadow', color: '#705898' },
  ];
  const typeInfo = PKMN_TYPES.find(t => t.name === type);
  return typeInfo ? typeInfo.color : '#777';
};

export const DetailPage = () => {
  const { id } = useParams(); // Utilisation de useParams pour obtenir l'ID depuis l'URL
  const [pokemon, setPokemon] = useState(null);
  const [reviews, setReviews] = useState([
    { text: "This pokemon has been my partner from the beginning. It's incredibly loyal and strong.", author: "Ash Ketchum" },
    { text: "I've always been amazed by the versatility of this pokemon in battles. It's a tough opponent in the water.", author: "Misty" },
    { text: "Its determination and will to win is unmatched. It's always a pleasure to see it in action.", author: "Brock" },
    { text: "Ok this pokemon is my ever favorite, it's actually a dog!", author: "Me" },
  ]);
  const [newReview, setNewReview] = useState('');
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`/api/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data);
        setLikes(data.likes);
      } catch (error) {
        console.error('Error fetching the Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleReviewSubmit = (e) => {
    if (e.key === 'Enter' && newReview) {
      setReviews([...reviews, { text: newReview, author: 'Me' }]);
      setNewReview('');
    }
  };

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container detail-page">
      <div className="row">
        <div className="col-md-6">
          <img src={pokemon.image} alt={pokemon.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{pokemon.name}</h2>
          <div className="types mb-3">
            {pokemon.types.map(type => (
              <span key={type} className="badge badge-pill" style={{ backgroundColor: getTypeColor(type), color: 'white', marginRight: '5px' }}>{type}</span>
            ))}
          </div>
          <ul className="list-unstyled">
            {Object.keys(pokemon.stats).map(stat => (
              <li key={stat} className="mb-2">
                <ProgressBar
                  label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                  value={pokemon.stats[stat]}
                  max={MAX_STAT[stat]}
                />
              </li>
            ))}
          </ul>
          <div className="likes mt-3">
            <i className="fa fa-heart" onClick={handleLikeClick} style={{ color: 'red', cursor: 'pointer' }}></i> {likes}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <h3>Reviews</h3>
          <input
            type="text"
            placeholder="Add a review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            onKeyDown={handleReviewSubmit}
            className="form-control mb-3"
          />
          {reviews.map((review, index) => (
            <Review key={index} author={review.author} content={review.text} />
          ))}
        </div>
      </div>
    </div>
  );
};
