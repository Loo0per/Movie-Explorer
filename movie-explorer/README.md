# Movie Explorer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge)](https://moviesexplorerr.netlify.app/)

A modern React application for exploring movies, searching, and managing your favorites. Built with Material UI, React Router, and The Movie Database (TMDb) API.

## 🚀 Project Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/Movie-Explorer.git
   cd Movie-Explorer/movie-explorer
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure API Key:**
   - Create a `.env` file in the `movie-explorer` directory.
   - Add your TMDb API key:
     ```env
     VITE_TMDB_API_KEY=your_tmdb_api_key_here
     ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## 🌐 API Usage

- This app uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) for fetching movie data, details, and images.
- You must obtain a free API key from TMDb and set it in your `.env` file as shown above.
- All API requests are handled in `src/services/tmdbApi.js`.

## ✨ Features Implemented

- **Movie Search:** Search for movies by title with real-time suggestions.
- **Movie Details:** View detailed information, cast, genres, and trailers for each movie.
- **Favorites:**
  - Add or remove movies from your personal favorites list (requires login).
  - Favorites are stored per user in localStorage.
  - Favorites count is shown in the navbar.
- **Authentication:**
  - Simple mock login system (username/password).
  - User state and favorites are persisted in localStorage.
- **Responsive UI:**
  - Fully responsive layout using Material UI Grid and Container.
  - Movie details and poster are side-by-side on desktop, stacked on mobile.
- **Theme Toggle:**
  - Switch between light and dark mode.
  - Theme preference is saved and persists across sessions.
- **Modern Navigation:**
  - Fixed navbar with scroll effect and mobile drawer menu.
  - Animated page transitions with Framer Motion.
- **Recent Searches:**
  - Recent search queries are saved per user and shown as suggestions.

## 📁 Project Structure

- `src/components/` – Reusable UI components (Navbar, MovieCard, MovieDetails, etc.)
- `src/pages/` – Page-level components (Home, Favorites, Login, MovieDetails)
- `src/context/` – Auth context for user and favorites state
- `src/services/` – API logic for TMDb
- `src/styles/` – Custom Material UI theme
- `src/routes/` – App routes

