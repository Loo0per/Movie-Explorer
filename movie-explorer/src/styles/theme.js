import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Default to light mode (we’ll add dark mode later)
    primary: {
      main: '#1976d2', // Blue for buttons and accents
    },
    secondary: {
      main: '#dc004e', // Red for secondary actions
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;