import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Mock users
const MOCK_USERS = [
  {
    username: 'alice',
    password: 'alice123',
  },
  {
    username: 'bob',
    password: 'bob123',
  },
];


const getUserKey = (username, key) => `user_${username}_${key}`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavoritesState] = useState([]);

  // Update favorites state when user changes
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(getUserKey(user.username, 'favorites'));
      setFavoritesState(savedFavorites ? JSON.parse(savedFavorites) : []);
    } else {
      setFavoritesState([]);
    }
  }, [user]);


  const login = (username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const mockUser = { username };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getFavorites = () => {
    return favorites;
  };
  
  const setFavorites = (newFavorites) => {
    if (!user) return;
    localStorage.setItem(getUserKey(user.username, 'favorites'), JSON.stringify(newFavorites));
    setFavoritesState(newFavorites);
  };


  const addFavorite = (movie) => {
    if (!user || !movie) return favorites;
    if (!favorites.some(fav => fav.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      return updatedFavorites;
    }
    return favorites;
  };

  // Remove a favorite
  const removeFavorite = (movieId) => {
    if (!user || !movieId) return favorites;
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    return updatedFavorites;
  };

  // Check if a movie is in favorites
  const isInFavorites = (movieId) => {
    if (!user || !movieId) return false;
    return favorites.some(movie => movie.id === movieId);
  };

  // Recent searches management (list)
  const getRecentSearches = () => {
    if (!user) return [];
    const list = localStorage.getItem(getUserKey(user.username, 'recentSearches'));
    return list ? JSON.parse(list) : [];
  };
  
  const addRecentSearch = (query) => {
    if (!user || !query) return;
    let list = getRecentSearches();
    list = [query, ...list.filter(q => q !== query)].slice(0, 5);
    localStorage.setItem(getUserKey(user.username, 'recentSearches'), JSON.stringify(list));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      getFavorites,
      setFavorites,
      addFavorite,
      removeFavorite,
      isInFavorites,
      getRecentSearches,
      addRecentSearch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};