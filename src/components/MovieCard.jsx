import "./MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const isMovie = movie.media_type
    ? movie.media_type === "movie"
    : movie.title !== undefined;
  const isTV = movie.media_type
    ? movie.media_type === "tv"
    : movie.name !== undefined;

  // Format release date or first air date
  const releaseDate = isMovie
    ? movie.release_date?.split("-").slice(0, 2).join("-")
    : isTV
    ? movie.first_air_date?.split("-").slice(0, 2).join("-")
    : null;

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <Link
      to={`/${isMovie ? "movie" : "tv"}/${movie.id}`}
      className="movie-title-link"
    >
      <div className="movie-card">
        <span className="movie-badge">
          {isMovie ? "Movie" : isTV ? "TV Series" : "Unknown"}
        </span>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={isMovie ? movie.title : movie.name}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{isMovie ? movie.title : isTV ? movie.name : "Unknown"}</h3>
          {releaseDate && <p>{releaseDate}</p>}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
