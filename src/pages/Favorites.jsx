import "./Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  // Access the list of favorite movies from the context
  const { favorites } = useMovieContext();

  // Check if there are any favorite movies
  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  // If there are no favorite movies, display a message indicating the list is empty
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Your favorite movies will appear here</p>
    </div>
  );
}
export default Favorites;
