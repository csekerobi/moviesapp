import "./MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id); // Check if the movie is in the favorites list

  // Determine if the item is a movie or TV series based on available data
  const isMovie = movie.media_type
    ? movie.media_type === "movie"
    : movie.title !== undefined;
  const isTV = movie.media_type
    ? movie.media_type === "tv"
    : movie.name !== undefined;

  // Format the release date or first air date based on the media type
  const releaseDate = isMovie
    ? movie.release_date?.split("-").slice(0, 2).join("-")
    : isTV
    ? movie.first_air_date?.split("-").slice(0, 2).join("-")
    : null;

  // Toggle the favorite status when the heart button is clicked
  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id); // Remove from favorites
    else addToFavorites(movie); // Add to favorites
  }

  return (
    <div className="movie-card">
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movie.id}`} // Link to the individual movie or TV series page
        className="movie-title-link"
      >
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
              className={`favorite-btn ${favorite ? "active" : ""}`} // Toggle button style for active favorites
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{isMovie ? movie.title : isTV ? movie.name : "Unknown"}</h3>
          {releaseDate && <p>{releaseDate}</p>} // Display the release date
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
