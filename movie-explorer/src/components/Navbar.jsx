import { useContext, useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
} from "@mui/material"
import { Menu as MenuIcon, Home, Favorite, Login, Logout, Movie, Brightness4, Brightness7 } from "@mui/icons-material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { motion } from "framer-motion"

const Navbar = ({ mode, toggleTheme }) => {
  const { user, logout, getFavorites } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()
  const favorites = user ? getFavorites() : []

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleLogout = () => {
    handleUserMenuClose()
    logout()
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navLinks = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Favorites", path: "/favorites", icon: <Favorite /> },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const navbarVariants = {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="md">
          <Toolbar sx={{ py: { xs: 0.5, md: scrolled ? 0.3 : 0.5 }, px: 1 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                fontSize: scrolled ? "1.1rem" : "1.25rem",
                transition: "all 0.3s ease",
              }}
            >
              <Movie sx={{ mr: 1, fontSize: scrolled ? 24 : 28, transition: "all 0.3s ease" }} />
              Movie Explorer
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Theme Toggle Button */}
                <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`} arrow>
                  <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    sx={{
                      mr: 1.5,
                      bgcolor: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                  </IconButton>
                </Tooltip>
                
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    color="inherit"
                    component={RouterLink}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      mx: 0.5,
                      py: scrolled ? 0.8 : 1,
                      px: scrolled ? 1.5 : 2,
                      borderRadius: 2,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      ...(isActive(link.path) && {
                        bgcolor: "rgba(255,255,255,0.15)",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 6,
                          left: "30%",
                          width: "40%",
                          height: 2,
                          bgcolor: "white",
                          borderRadius: 4,
                        },
                      }),
                    }}
                  >
                    {link.name === "Favorites" && user && favorites.length > 0 ? (
                      <Badge badgeContent={favorites.length} color="error">
                        {link.name}
                      </Badge>
                    ) : (
                      link.name
                    )}
                  </Button>
                ))}

                {user ? (
                  <>
                    <Box sx={{ ml: 2 }}>
                      <Tooltip title="Account settings">
                        <IconButton onClick={handleUserMenuOpen} sx={{ p: 0, border: "2px solid white" }}>
                          <Avatar
                            alt={user.username}
                            src={user.avatar || "/static/images/avatar/default.jpg"}
                            sx={{ 
                              bgcolor: theme.palette.secondary.main, 
                              color: "white", 
                              width: scrolled ? 36 : 40, 
                              height: scrolled ? 36 : 40,
                              transition: "all 0.3s ease"
                            }}
                          >
                            {user.username.charAt(0).toUpperCase()}
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={userMenuAnchor}
                      open={Boolean(userMenuAnchor)}
                      onClose={handleUserMenuClose}
                      PaperProps={{
                        elevation: 2,
                        sx: {
                          mt: 1.5,
                          borderRadius: 2,
                          minWidth: 180,
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {user.username}
                        </Typography>
                      </Box>

                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    startIcon={<Login />}
                    sx={{
                      ml: 1,
                      borderColor: "rgba(255,255,255,0.5)",
                      borderRadius: 2,
                      px: scrolled ? 1.5 : 2,
                      py: scrolled ? 0.8 : 1,
                      transition: "all 0.3s ease",
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}

            {/* Mobile Menu Button with Theme Toggle */}
            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`} arrow>
                  <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    sx={{
                      mr: 1,
                      bgcolor: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                  </IconButton>
                </Tooltip>
                
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleMobileMenu}
                  sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Toolbar placeholder to prevent content from hiding under the app bar */}
      <Toolbar sx={{ mb: 2 }} />

      {/* Mobile Drawer - Simplified */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: 280,
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Movie sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Movie Explorer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {user && (
            <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
              <Avatar
                alt={user.username}
                src={user.avatar || "/static/images/avatar/default.jpg"}
                sx={{ bgcolor: theme.palette.primary.main, color: "white", width: 40, height: 40, mr: 2 }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user.username}
              </Typography>
            </Box>
          )}

          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                button
                component={RouterLink}
                to={link.path}
                onClick={toggleMobileMenu}
                selected={isActive(link.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  ...(isActive(link.path) && {
                    bgcolor: "rgba(0,0,0,0.05)",
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>{link.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    link.name === "Favorites" && user && favorites.length > 0 ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {link.name}
                        <Badge badgeContent={favorites.length} color="error" sx={{ ml: 1 }} />
                      </Box>
                    ) : (
                      link.name
                    )
                  }
                />
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            {/* Theme Toggle in Mobile Menu */}
            <ListItem 
              button 
              onClick={toggleTheme}
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </ListItemIcon>
              <ListItemText primary={`${mode === "light" ? "Dark" : "Light"} Mode`} />
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {user ? (
              <ListItem
                button
                onClick={() => {
                  logout()
                  toggleMobileMenu()
                }}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.error.main }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button component={RouterLink} to="/login" onClick={toggleMobileMenu} sx={{ borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>
                  <Login />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </motion.div>
  )
}

export default Navbar
