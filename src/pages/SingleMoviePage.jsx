import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getTVDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "./SingleMoviePage.css";

function SingleMoviePage() {
  const { movieId, tvId } = useParams(); // Get movie or TV show ID from the URL
  const [media, setMedia] = useState(null); // Store movie or TV show details
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store error messages

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(Number(movieId) || Number(tvId)); // Check if the media is a favorite

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let data;
        if (movieId) {
          data = await getMovieDetails(movieId); // Fetch movie details
        } else if (tvId) {
          data = await getTVDetails(tvId); // Fetch TV show details
        } else {
          setError("Invalid media ID.");
          return;
        }
        setMedia(data); // Store fetched details
      } catch (err) {
        setError("Failed to fetch media details."); // Set error on failure
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchDetails();
  }, [movieId, tvId]); // Re-run when movieId or tvId changes

  function onFavoriteClick() {
    if (!media) return;

    if (favorite) {
      removeFromFavorites(media.id); // Remove from favorites if already added
    } else {
      addToFavorites(media); // Add to favorites if not already added
    }
  }

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message if fetch fails

  const isMovie = media?.media_type === "movie" || media?.title !== undefined;
  const isTV = media?.media_type === "tv" || media?.name !== undefined;

  const mediaType = isMovie ? "Movie" : isTV ? "TV Series" : "Unknown"; // Determine media type

  // Format and display genres
  const genres =
    media?.genres?.length > 0
      ? media.genres.map((genre) => genre.name).join(", ")
      : "No genres available";

  return (
    <div className="single-movie-page">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} // Fetch movie poster
          alt={media.title || media.name}
        />
        <div className="movie-info">
          <h2>{media.title || media.name}</h2>
          <span className="media-type-badge">{mediaType}</span>
          <p className="genres">{genres}</p>
          <p className="overview">{media.overview}</p>
          <div className="movie-stats">
            {isMovie && (
              <p>
                <strong>Runtime:</strong> {media.runtime} minutes
              </p>
            )}
            {isTV && (
              <p>
                <strong>Seasons:</strong> {media.number_of_seasons}
              </p>
            )}
            <p>
              <strong>Rating: </strong>
              {media.vote_average ? media.vote_average.toFixed(1) : "N/A"}/10
            </p>

            <p>
              <strong>Release Date: </strong>
              {media.release_date || media.first_air_date}
            </p>
          </div>
          <div className="movie-buttons">
            <button
              className={`btn add-to-favorites ${favorite ? "active" : ""}`} // Favorite button
              onClick={onFavoriteClick}
            >
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
