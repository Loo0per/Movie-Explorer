import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import Home from "../pages/Home"
import MovieDetails from "../pages/MovieDetails"
import Favorites from "../pages/Favorites"
import Login from "../pages/Login"
import { AuthContext } from "../context/AuthContext"

const AppRoutes = () => {
  const { user } = useContext(AuthContext)

  const protectRoute = (element) => {
    return user ? element : <Navigate to="/login" replace />
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={protectRoute(<Favorites />)} />
    </Routes>
  )
}

export default AppRoutes