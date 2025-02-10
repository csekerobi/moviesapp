import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "./SingleMoviePage.css";

function SingleMoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(Number(movieId)); // Ensure movieId is a number

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  function onFavoriteClick() {
    if (!movie) return; // Prevent errors if movie isn't loaded yet

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single-movie-page">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p className="overview">{movie.overview}</p>
          <div className="movie-stats">
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
          <div className="movie-buttons">
            <button
              className={`btn add-to-favorites ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button className="btn add-to-watchlist">Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
