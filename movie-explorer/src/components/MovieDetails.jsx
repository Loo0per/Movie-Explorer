import React from 'react';
import { Typography, Container } from '@mui/material';

const MovieDetails = ({ movieId }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Movie Details - ID: {movieId}</Typography>
      <Typography variant="body1">To be implemented with movie overview, genres, cast, and trailer.</Typography>
    </Container>
  );
};

export default MovieDetails;