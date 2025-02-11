import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getTVDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "./SingleMoviePage.css";

function SingleMoviePage() {
  const { movieId, tvId } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(Number(movieId) || Number(tvId));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let data;
        if (movieId) {
          data = await getMovieDetails(movieId);
        } else if (tvId) {
          data = await getTVDetails(tvId);
        } else {
          setError("Invalid media ID.");
          return;
        }
        setMedia(data);
      } catch (err) {
        setError("Failed to fetch media details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, tvId]);

  function onFavoriteClick() {
    if (!media) return;

    if (favorite) {
      removeFromFavorites(media.id);
    } else {
      addToFavorites(media);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const isMovie = media?.media_type === "movie" || media?.title !== undefined;
  const isTV = media?.media_type === "tv" || media?.name !== undefined;

  const mediaType = isMovie ? "Movie" : isTV ? "TV Series" : "Unknown";

  // Get the genres and format them as a comma-separated string
  const genres =
    media?.genres?.length > 0
      ? media.genres.map((genre) => genre.name).join(", ")
      : "No genres available";

  return (
    <div className="single-movie-page">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
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
            <p>
              <strong>Rating:</strong> {media.vote_average}/10
            </p>
            <p>
              <strong>Release Date: </strong>
              {media.release_date || media.first_air_date}
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
