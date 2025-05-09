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
  Badge,
} from "@mui/material"
import { Menu as MenuIcon, Home, Favorite, Login, Logout, Movie, Brightness4, Brightness7 } from "@mui/icons-material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = ({ mode, toggleTheme }) => {

  const { user, logout, getFavorites } = useContext(AuthContext)
  const location = useLocation()


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [scrolled, setScrolled] = useState(false)


  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))


  const favorites = user ? getFavorites() : []

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  return (
    <>
      <AppBar position="fixed" elevation={scrolled ? 4 : 0} >
        <Container maxWidth="md">
          <Toolbar>
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
              }}
            >
              <Movie sx={{ mr: 1 }} />
              Movie Explorer
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Theme Toggle Button */}
                <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    color="inherit"
                    component={RouterLink}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      mx: 0.5,
                      ...(isActive(link.path) && {
                        bgcolor: "rgba(255,255,255,0.15)",
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

                {/* User Menu or Login Button */}
                {user ? (
                  <>
                    <IconButton onClick={handleUserMenuOpen} sx={{ ml: 2 }}>
                      <Avatar
                        alt={user.username}
                        src={user.avatar || "/static/images/avatar/default.jpg"}
                        sx={{ bgcolor: theme.palette.secondary.main }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
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
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: "flex" }}>
                <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
                <IconButton color="inherit" onClick={toggleMobileMenu}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Toolbar placeholder */}
      <Toolbar sx={{ mb: 2 }} />

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu} sx={{ width: 250 }}>
        <Box sx={{ width: 250, p: 2 }}>
          {/* Logo in drawer */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Movie sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Movie Explorer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* User info if logged in */}
          {user && (
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Avatar alt={user.username} src={user.avatar || "/static/images/avatar/default.jpg"} sx={{ mr: 2 }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1">{user.username}</Typography>
            </Box>
          )}

          {/* Navigation links */}
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                button
                component={RouterLink}
                to={link.path}
                onClick={toggleMobileMenu}
                selected={isActive(link.path)}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
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

            {/* Theme toggle in drawer */}
            <ListItem button onClick={toggleTheme}>
              <ListItemIcon>{mode === "light" ? <Brightness4 /> : <Brightness7 />}</ListItemIcon>
              <ListItemText primary={`${mode === "light" ? "Dark" : "Light"} Mode`} />
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {/* Login/Logout */}
            {user ? (
              <ListItem
                button
                onClick={() => {
                  logout()
                  toggleMobileMenu()
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button component={RouterLink} to="/login" onClick={toggleMobileMenu}>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
