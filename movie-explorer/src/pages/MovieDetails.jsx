import { useParams } from "react-router-dom"
import { Box, useTheme } from "@mui/material"
import MovieDetails from "../components/MovieDetails"
import { motion } from "framer-motion"

const MovieDetailsPage = () => {
  const { id } = useParams()
  const theme = useTheme()

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        pt: { xs: 1, md: 2 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <MovieDetails movieId={id} />
    </Box>
  )
}

export default MovieDetailsPage