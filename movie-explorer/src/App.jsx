import { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, CssBaseline, Box } from "@mui/material"
import AppRoutes from "./routes/AppRoute"
import { AuthProvider } from "./context/AuthContext"
import { getTheme } from "./styles/theme"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import "./App.css"

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("theme-mode") || "light")
  const [mounted, setMounted] = useState(false)
  const theme = getTheme(mode)

  // Toggle theme function
  const toggleTheme = () => {
    setMode(prevMode => prevMode === "light" ? "dark" : "light")
  }

  // Save theme preference and set mounted state
  useEffect(() => {
    localStorage.setItem("theme-mode", mode)
    setMounted(true)
  }, [mode])

  // Avoid theme flicker on initial load
  if (!mounted) return null

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
          >
            <BrowserRouter>
              <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar mode={mode} toggleTheme={toggleTheme} />
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  sx={{ flexGrow: 1, overflowX: "hidden" }}
                >
                  <AppRoutes />
                </Box>
                <Footer />
              </Box>
            </BrowserRouter>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
