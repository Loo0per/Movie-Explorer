import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchQuery, onSearch }) => {
  const handleSearch = (e) => {
    console.log('Search query changed:', e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search Movies"
      value={searchQuery}
      onChange={handleSearch}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default SearchBar;