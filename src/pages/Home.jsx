import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieSection from "../components/MovieSection";
import {
  searchMovies,
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getTrendingTVShows,
  getTopRatedTVShows,
} from "../services/api";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setSearchActive(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search for movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {searchActive ? (
        <>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="movies-grid">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))
              ) : (
                <p className="no-results">No movies found</p>
              )}
            </div>
          )}
          <button
            className="back-button"
            onClick={() => setSearchActive(false)}
          >
            Back to Home
          </button>
        </>
      ) : (
        <>
          <MovieSection title="Popular Movies" fetchMovies={getPopularMovies} />
          <MovieSection
            title="Trending Movies"
            fetchMovies={getTrendingMovies}
          />
          <MovieSection
            title="Top Rated Movies"
            fetchMovies={getTopRatedMovies}
          />
          <MovieSection
            title="Popular TV Series"
            fetchMovies={getPopularTVShows}
          />
          <MovieSection
            title="Trending TV Series"
            fetchMovies={getTrendingTVShows}
          />
          <MovieSection
            title="Top Rated TV Series"
            fetchMovies={getTopRatedTVShows}
          />
        </>
      )}
    </div>
  );
}

export default Home;
