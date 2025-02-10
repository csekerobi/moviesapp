import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import "./MovieSection.css";

function MovieSection({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${title.toLowerCase()} movies...`);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies]);

  return (
    <div className="movie-section">
      <h2>{title}</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSection;
