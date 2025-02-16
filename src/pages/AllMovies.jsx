import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getAllMovies, searchMovies } from "../services/api";
import "./AllMovies.css";

function AllMovies() {
  // State to store search query input
  const [searchQuery, setSearchQuery] = useState("");

  // State to store fetched movies
  const [movies, setMovies] = useState([]);

  // State to handle errors
  const [error, setError] = useState(null);

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // State to track the current page for pagination
  const [page, setPage] = useState(1);

  // State to determine if more movies can be loaded
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!searchQuery.trim()) {
      loadMovies(page); // Load all movies when no search query
    }
  }, [page, searchQuery]); // Load more movies or search results based on page and query change

  const loadMovies = async (pageNumber) => {
    setLoading(true);
    try {
      const newMovies = await getAllMovies(pageNumber);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);

      // If no new movies are returned, stop further loading
      if (newMovies.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Prevent empty or repeated searches when already loading
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setPage(1); // Reset to page 1 when searching
    setMovies([]); // Clear previous movies before fetching new ones
    setHasMore(false); // Disable pagination for search

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // Only set the search results
      setError(null); // Reset error state

      // If no results, fallback to loading all movies
      if (searchResults.length === 0) {
        loadMovies(1); // Load all movies since no results were found
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search for movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    // Load the next page if not already loading and more movies exist
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  return (
    <div className="all-movies">
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

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading">Loading...</div>}

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <p className="no-results">No movies found</p>
        )}
      </div>

      {hasMore && !loading && !searchQuery.trim() && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
}

export default AllMovies;
