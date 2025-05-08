import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Button, CardMedia, CardContent } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const MovieCard = ({ movie, onRemoveFavorite }) => {
  const navigate = useNavigate();
  const { user, getFavorites, setFavorites } = useContext(AuthContext);
  const favorites = user ? getFavorites() : [];
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      setFavorites([...favorites, movie]);
    }
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    setFavorites(favorites.filter(fav => fav.id !== movie.id));
  };

  return (
    <Card sx={{ 
      width: 200, 
      height: 350, 
      margin: '0 auto',
      boxShadow: 2
    }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''}
          alt={movie.title}
          sx={{ 
            backgroundColor: movie.poster_path ? 'transparent' : '#ddd', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
        {!movie.poster_path && (
          <Box sx={{ 
            position: 'absolute', 
            top: '90px', 
            width: '100%', 
            textAlign: 'center' 
          }}>
            <Typography>No Image</Typography>
          </Box>
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
          </Typography>
          {user && (
            <Box sx={{ mt: 1 }}>
              {!isFavorite ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleAddFavorite}
                >
                  Add to Favorites
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled
                >
                  In Favorites
                </Button>
              )}
              {isFavorite && typeof onRemoveFavorite === 'function' && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={handleRemoveFavorite}
                >
                  Remove
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
