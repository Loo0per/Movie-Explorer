import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  Grid,
} from "@mui/material"
import { Favorite, Login, Delete } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { motion } from "framer-motion"
import MovieCard from "../components/MovieCard"

const Favorites = () => {
  const { user, getFavorites, removeFavorite } = useContext(AuthContext)
  const favorites = user ? getFavorites() : []
  const theme = useTheme()
  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Paper
            elevation={3}
            component={motion.div}
            variants={itemVariants}
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              backgroundImage: theme.palette.mode === "dark"
                ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))"
                : "none",
            }}
          >
            <Typography
              variant="h5"
              component={motion.h2}
              variants={itemVariants}
              sx={{
                mb: 3,
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              You have no favorite movies yet
            </Typography>
            <motion.div variants={itemVariants}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.2,
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
                Explore Movies
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    )
  }

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          backgroundImage: theme.palette.mode === "dark"
            ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))"
            : "none",
        }}
      >
        <Typography
          variant="h4"
          component={motion.h1}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          <Favorite color="error" sx={{ fontSize: { xs: 24, md: 32 } }} />
          Your Favorite Movies
        </Typography>
        <Typography
          variant="subtitle1"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          sx={{
            textAlign: "center",
            mb: 3,
            color: theme.palette.text.secondary,
          }}
        >
          You have {favorites.length} movie{favorites.length !== 1 ? "s" : ""} in your collection
        </Typography>
      </Paper>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Grid container spacing={3} justifyContent="center">
          {favorites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard 
                movie={movie} 
                onRemoveFavorite={handleRemoveFavorite} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Favorites
