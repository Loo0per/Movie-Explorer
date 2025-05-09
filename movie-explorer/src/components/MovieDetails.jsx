import { useEffect, useState, useContext } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Chip, 
  Grid, 
  Avatar, 
  Card, 
  CardContent, 
  CircularProgress,
  Paper,
  Button
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { getMovieDetails } from '../services/tmdbApi';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, addFavorite, removeFavorite, isInFavorites } = useContext(AuthContext);
  
  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load movie details.');
        setLoading(false);
      });
  }, [movieId]);

  const isFavorite = user && movie ? isInFavorites(movie.id) : false;

  const handleFavoriteToggle = () => {
    if (!user || !movie) return;
    
    if (!isFavorite) {
      addFavorite(movie);
    } else {
      removeFavorite(movie.id);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  if (!movie) return null;

  // Get genres
  const genres = movie.genres || [];
  // Get top 5 cast
  const cast = movie.credits?.cast?.slice(0, 5) || [];
  // Get first YouTube trailer
  const trailer = movie.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Movie Poster */}
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 1,
                overflow: 'hidden',
                height: 'auto',
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box 
                  sx={{ 
                    bgcolor: '#eee', 
                    width: '100%', 
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' 
                  }}
                >
                  <Typography color="textSecondary">No Image Available</Typography>
                </Box>
              )}
            </Box>

            {user && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  variant={isFavorite ? "contained" : "outlined"}
                  color={isFavorite ? "error" : "secondary"}
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={handleFavoriteToggle}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Box>
            )}
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Typography variant="h4" gutterBottom>
              {movie.title} <span style={{ color: 'gray', fontSize: '0.8em' }}>({movie.release_date?.split('-')[0]})</span>
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              {genres.map(genre => (
                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} color="secondary" variant="outlined" />
              ))}
            </Box>
            
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Release Date</Typography>
                <Typography variant="body2">{movie.release_date}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Runtime</Typography>
                <Typography variant="body2">{movie.runtime} minutes</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Rating</Typography>
                <Typography variant="body2">{movie.vote_average?.toFixed(1)}/10</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>Top Cast</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {cast.map(actor => (
          <Grid item key={actor.cast_id} xs={6} sm={4} md={2}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Avatar 
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : undefined} 
                  sx={{ width: 80, height: 80 }} 
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2">{actor.name}</Typography>
                <Typography variant="body2" color="textSecondary">{actor.character}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {trailer && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Trailer</Typography>
          <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube trailer"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MovieDetails;
