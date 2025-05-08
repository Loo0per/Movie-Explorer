import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getTrendingMovies, searchMovies } from '../services/tmdbApi';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Alert,
  Button,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetchedInitial = useRef(false);
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  // Debug render
  console.log('Render Home, page:', page, 'loading:', loading, 'searchQuery:', searchQuery);

  // Fetch movies (trending or search)
  const fetchMovies = useCallback(
    async (reset = false) => {
      if (loading || (page > totalPages && !reset)) {
        console.log('Fetch skipped: loading or page > totalPages');
        return;
      }
      console.log('Fetching movies, page:', reset ? 1 : page, 'reset:', reset);
      setLoading(true);
      setError(null);
      try {
        const currentPage = reset ? 1 : page;
        const data = searchQuery
          ? await searchMovies(searchQuery, currentPage)
          : await getTrendingMovies(currentPage);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, page, totalPages, loading]
  );

  // Initial fetch when searchQuery changes
  useEffect(() => {
    if (!hasFetchedInitial.current || searchQuery !== '') {
      console.log('Initial fetch triggered, searchQuery:', searchQuery);
      hasFetchedInitial.current = true;
      fetchMovies(true);
    }
  }, [searchQuery, fetchMovies]);

  // Infinite scrolling for search results
  useEffect(() => {
    if (searchQuery && inView && page < totalPages && !loading) {
      console.log('Infinite scroll triggered, incrementing page to:', page + 1);
      setPage((prev) => prev + 1);
    }
  }, [inView, searchQuery, page, totalPages, loading]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMovies([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      console.log('Load More clicked, setting page to:', page + 1);
      setPage((prev) => {
        const newPage = prev + 1;
        fetchMovies();
        return newPage;
      });
    } else {
      console.log('Load More skipped: page >= totalPages or loading');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {searchQuery ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3} sx={{ minHeight: '400px' }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && movies.length === 0 && !error && (
        <Typography sx={{ textAlign: 'center', my: 4 }}>
          No movies found.
        </Typography>
      )}
      {!searchQuery && !loading && page < totalPages && movies.length > 0 && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{ minWidth: '120px' }}
          >
            Load More
          </Button>
        </Box>
      )}
      {searchQuery && page < totalPages && <Box ref={ref} sx={{ height: '20px' }} />}
    </Container>
  );
};

export default Home;