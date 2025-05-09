import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Button, CardMedia, CardContent } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const MovieCard = ({ movie, onRemoveFavorite }) => {
  const navigate = useNavigate();
  const { user, addFavorite, removeFavorite, isInFavorites } = useContext(AuthContext);
  const isFavorite = user ? isInFavorites(movie.id) : false;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (!user) return;
    
    if (!isFavorite) {
      addFavorite(movie);
    } else {
      if (typeof onRemoveFavorite === 'function') {
        onRemoveFavorite(movie.id);
      }
      removeFavorite(movie.id);
    }
  };

  return (
    <Card sx={{ 
      width: 200, 
      height: 350, 
      margin: '0 auto',
      boxShadow: 2,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 4
      }
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
              <Button
                variant={isFavorite ? "contained" : "outlined"}
                color={isFavorite ? "error" : "secondary"}
                size="small"
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={handleFavoriteToggle}
                fullWidth
              >
                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
              </Button>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
