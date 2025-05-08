
import { useState, useEffect, useCallback, useRef, useContext } from "react"
import { getTrendingMovies, searchMovies } from "../services/tmdbApi"
import { AuthContext } from "../context/AuthContext"
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Alert,
  Button,
  Fade,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material"
import { useInView } from "react-intersection-observer"
import SearchBar from "../components/SearchBar"
import MovieList from "../components/MovieList"
import { motion } from "framer-motion"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const hasFetchedInitial = useRef(false)
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false })
  const { addRecentSearch, user } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Debug render
  console.log("Render Home, page:", page, "loading:", loading, "searchQuery:", searchQuery)

  // Fetch movies (trending or search)
  const fetchMovies = useCallback(
    async (reset = false) => {
      if (loading || (page > totalPages && !reset)) {
        console.log("Fetch skipped: loading or page > totalPages")
        return
      }
      console.log("Fetching movies, page:", reset ? 1 : page, "reset:", reset)
      setLoading(true)
      setError(null)
      try {
        const currentPage = reset ? 1 : page
        const data = searchQuery ? await searchMovies(searchQuery, currentPage) : await getTrendingMovies(currentPage)
        await new Promise((resolve) => setTimeout(resolve, 300))
        setMovies((prev) => (reset ? data.results : [...prev, ...data.results]))
        setTotalPages(data.total_pages)
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Failed to fetch movies. Please try again later.")
      } finally {
        setLoading(false)
      }
    },
    [searchQuery, page, totalPages, loading],
  )

  // Initial fetch when searchQuery changes
  useEffect(() => {
    if (!hasFetchedInitial.current || searchQuery !== "") {
      console.log("Initial fetch triggered, searchQuery:", searchQuery)
      hasFetchedInitial.current = true
      fetchMovies(true)
    }
  }, [searchQuery, fetchMovies])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setMovies([])
    setPage(1)
    if (query === "") {
      fetchMovies(true)
    }
  }

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      console.log("Load More clicked, setting page to:", page + 1)
      setPage((prev) => {
        const newPage = prev + 1
        fetchMovies()
        return newPage
      })
    } else {
      console.log("Load More skipped: page >= totalPages or loading")
    }
  }

  return (
    <Fade in={true} timeout={800}>
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            background: theme.palette.background.paper,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component={motion.h1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            {searchQuery ? "Search Results" : "Trending Movies"}
          </Typography>
          <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
        </Paper>

        {error && (
          <Alert
            severity="error"
            sx={{
              my: 2,
              borderRadius: 2,
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            {error}
          </Alert>
        )}

        <MovieList movies={movies} />

        {loading && (
          <Box
            sx={{
              textAlign: "center",
              my: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size={isMobile ? 30 : 40}
              thickness={4}
              sx={{
                color: theme.palette.primary.main,
                animation: "fadeIn 0.3s ease-in-out",
              }}
            />
          </Box>
        )}

        {!loading && movies.length === 0 && !error && (
          <Paper
            elevation={2}
            sx={{
              textAlign: "center",
              my: 4,
              p: 3,
              borderRadius: 2,
              background: theme.palette.background.paper,
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No movies found.
            </Typography>
          </Paper>
        )}

        {!loading && movies.length > 0 && page < totalPages && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            sx={{
              textAlign: "center",
              my: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              disabled={loading}
              sx={{
                minWidth: "120px",
                py: 1.2,
                px: 3,
                borderRadius: 8,
                fontWeight: 600,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </Fade>
  )
}

export default Home
