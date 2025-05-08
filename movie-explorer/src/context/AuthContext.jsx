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

// Helper to get user-specific key
const getUserKey = (username, key) => `user_${username}_${key}`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock login function
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

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Favorites management
  const getFavorites = () => {
    if (!user) return [];
    const fav = localStorage.getItem(getUserKey(user.username, 'favorites'));
    return fav ? JSON.parse(fav) : [];
  };
  const setFavorites = (favorites) => {
    if (!user) return;
    localStorage.setItem(getUserKey(user.username, 'favorites'), JSON.stringify(favorites));
  };

  // Last search management
  const getLastSearch = () => {
    if (!user) return '';
    return localStorage.getItem(getUserKey(user.username, 'lastSearch')) || '';
  };
  const setLastSearch = (query) => {
    if (!user) return;
    localStorage.setItem(getUserKey(user.username, 'lastSearch'), query);
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
    // Remove duplicates and keep most recent first
    list = [query, ...list.filter(q => q !== query)].slice(0, 5);
    localStorage.setItem(getUserKey(user.username, 'recentSearches'), JSON.stringify(list));
  };

  // Check for saved user on mount
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
      getLastSearch,
      setLastSearch,
      getRecentSearches,
      addRecentSearch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};