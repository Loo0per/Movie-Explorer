import React, { useContext, useState, useEffect } from 'react';
import { TextField, List, ListItem, Paper, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const SearchBar = ({ searchQuery, onSearch }) => {
  const { user, getRecentSearches, addRecentSearch } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [showRecent, setShowRecent] = useState(false);
  const recentSearches = user ? getRecentSearches() : [];

  // Update local input value when parent searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() === '') {
        onSearch(''); // Reset to trending movies if input is empty
      } else if (user && inputValue.trim()) {
        addRecentSearch(inputValue.trim());
        onSearch(inputValue.trim());
      }
      setShowRecent(false);
    }
  };

  const handleSelectRecent = (query) => {
    setInputValue(query);
    onSearch(query);
    setShowRecent(false);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <TextField
        label="Search Movies"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowRecent(true)}
        onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      
      {showRecent && recentSearches.length > 0 && (
        <Paper 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            zIndex: 1000,
            maxHeight: '200px',
            overflow: 'auto'
          }}
        >
          <List>
            {recentSearches.map((query, index) => (
              <ListItem 
                key={index} 
                button
                onClick={() => handleSelectRecent(query)}
                style={{ cursor: 'pointer' }}
              >
                {query}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
