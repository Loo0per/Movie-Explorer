import React from 'react';
import { Grid, Box } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onRemoveFavorite }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Grid
        container
        spacing={3}
        sx={{
          minHeight: "400px",
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={movie.id}
            sx={{ mb: 3 }}
          >
            <MovieCard movie={movie} onRemoveFavorite={onRemoveFavorite} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
