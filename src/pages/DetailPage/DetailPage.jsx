import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Review } from '../../components/Review/Review';
import { MAX_STAT, PKMN_TYPES } from '../../constants/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DetailPage.module.css';

// Get color by Pokemon type
const getTypeColor = (type) => {
  const typeInfo = PKMN_TYPES.find(t => t.name.toLowerCase() === type.toLowerCase());
  return typeInfo ? typeInfo.color : '#777'; // Return correct color or grey if error
};

export const DetailPage = () => {
  const { id } = useParams(); // Get pokemon id from fake server
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Get pokemon detail by id
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        if (!response.ok) {
          throw new Error('DB injoignable ou pokémon inexistant');
        }
        const data = await response.json();
        setPokemon(data);
        setLikes(data.like);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Get pokemon review by id
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reviews/?pokemonId=${id}`);
        if (!response.ok) {
          throw new Error('DB injoignable ou pokémon inexistant');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
    fetchReviews();
  }, [id]); // *****

  // add new review
  const handleAddReview = () => {
    if (newReview) {
      const review = {
        author: 'Me', 
        content: newReview,
        pokemonId: id
      };
      setReviews([...reviews, review]); // Add new review to review list
      setNewReview(''); // Fill review field with '...'
    }
  };

  // Add review if ENTER is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddReview();
    }
  };

  // Change like number by click 
  const handleLike = async () => {
    const updatedLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);
    setIsLiked(!isLiked);

    try {
      const response = await fetch(`http://localhost:3001/pokemons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: updatedLikes }),
      });

      if (!response.ok) {
        throw new Error('Impossible de charger les likes');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      setLikes(isLiked ? likes + 1 : likes - 1); 
      setIsLiked(isLiked);
    }
  };

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>; 

  return (
    <div className="container detail-page" style={{ backgroundImage: '(../../assets/pokeball_bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} className="img-fluid" />
          <h2 className="my-3">{pokemon.name}</h2>
          <div className="types mb-3">
            {pokemon.types.map((type) => (
              <span key={type} className="badge badge-pill mr-2" style={{ backgroundColor: getTypeColor(type) }}>
                {type}
              </span>
            ))}
          </div>
          <div className="likes mt-3">
            <span role="img" aria-label="heart" onClick={handleLike} className="like-icon" style={{ cursor: 'pointer' }}>
              {isLiked ? '❤️' : '🤍'} {/*Show like red or white */}
            </span> {likes}
          </div>
        </div>
        <div className="col-md-6">
          <div className="stats">
            <ProgressBar label="HP" value={pokemon.base.HP} max={MAX_STAT.hp} />
            <ProgressBar label="Attack" value={pokemon.base.Attack} max={MAX_STAT.attack} />
            <ProgressBar label="Defense" value={pokemon.base.Defense} max={MAX_STAT.defense} />
            <ProgressBar label="Special Attack" value={pokemon.base['Special attack']} max={MAX_STAT.specialAttack} />
            <ProgressBar label="Special Defense" value={pokemon.base['Special defense']} max={MAX_STAT.specialDefense} />
            <ProgressBar label="Speed" value={pokemon.base.Speed} max={MAX_STAT.speed} />
          </div>
        </div>
      </div>
      <div className="reviews mt-5">
        <h3>Reviews</h3>
        <textarea
          placeholder="Add a review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control mb-3"
          maxLength="100"
        ></textarea>
        {reviews.map((review, index) => (
          <Review key={index} content={review.content} author={review.author} />
        ))}
      </div>
    </div>
  );
};
