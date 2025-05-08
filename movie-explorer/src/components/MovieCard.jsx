import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea } from '@mui/material';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to movie details, id:', movie.id);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      sx={{
        height: '250px', // Fixed height for stability
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Box
          sx={{
            height: '120px',
            bgcolor: '#ddd',
            borderRadius: '4px 4px 0 0',
            mb: 1,
          }}
        /> {/* Poster placeholder */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{ fontSize: '1.1rem', mb: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;