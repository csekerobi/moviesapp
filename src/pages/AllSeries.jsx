import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getAllSeries, searchSeries } from "../services/api";
import "./AllSeries.css";

function AllSeries() {
  // State to store search query input
  const [searchQuery, setSearchQuery] = useState("");

  // State to store fetched series
  const [series, setSeries] = useState([]);

  // State to handle errors
  const [error, setError] = useState(null);

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // State to track the current page for pagination
  const [page, setPage] = useState(1);

  // State to determine if more series can be loaded
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // If there's no search query, load all series
    if (!searchQuery.trim()) {
      loadSeries(page);
    }
  }, [page, searchQuery]); // Load series based on page or search query change

  const loadSeries = async (pageNumber) => {
    setLoading(true);
    try {
      const newSeries = await getAllSeries(pageNumber);

      // Append new series to the existing list
      setSeries((prevSeries) => [...prevSeries, ...newSeries]);

      // If no new series are returned, stop further loading
      if (newSeries.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load series...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Prevent empty or repeated searches when already loading
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setPage(1); // Reset page number when searching
    setSeries([]); // Clear previous series before fetching new ones
    setHasMore(false); // Disable pagination for search

    try {
      const searchResults = await searchSeries(searchQuery);

      // Set series to search results and disable pagination
      setSeries(searchResults);
      setError(null);

      // If no results, load all series
      if (searchResults.length === 0) {
        loadSeries(1); // Load all series since no results were found
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search for series...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    // Load the next page if not already loading and more series exist
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  return (
    <div className="all-series">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a series..."
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
        {series.length > 0 ? (
          series.map((serie) => <MovieCard movie={serie} key={serie.id} />)
        ) : (
          <p className="no-results">No series found</p>
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

export default AllSeries;
