import { createTheme } from "@mui/material/styles"

// Common theme settings shared between light and dark modes
const getCommonTheme = () => ({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "all 0.3s ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 0.3s ease, color 0.3s ease",
        },
      },
    },
  },
})

// Theme palettes
const palettes = {
  light: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff4081",
      dark: "#c51162",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },
  dark: {
    mode: "dark",
    primary: {
      main: "#4C5454",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#100B00",
      light: "#fce4ec",
      dark: "#f06292",
      contrastText: "#ffffff",
    },
    background: {
      default: "#100B00",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  }
}

// Default theme (light mode)
const theme = createTheme({
  palette: palettes.light,
  ...getCommonTheme(),
})

// Theme generator based on mode
export const getTheme = (mode = "light") => {
  const baseTheme = getCommonTheme()
  const palette = mode === "dark" ? palettes.dark : palettes.light
  
  // Add dark mode specific component styles
  if (mode === "dark") {
    baseTheme.components = {
      ...baseTheme.components,
      MuiCard: {
        styleOverrides: {
          root: {
            ...baseTheme.components.MuiCard.styleOverrides.root,
            backgroundColor: "#1e1e1e",
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            ...baseTheme.components.MuiPaper.styleOverrides.root,
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))",
          },
        },
      },
    }
  }

  return createTheme({
    palette,
    ...baseTheme,
  })
}

export default theme
