import MovieCard from "./MovieCard";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./MovieSection.css";

function MovieSection({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]); // Store the fetched movies
  const [error, setError] = useState(null); // Store error messages if fetching fails
  const [loading, setLoading] = useState(true); // Track the loading state
  const carouselRef = useRef(null); // Reference to the carousel container for scrolling

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(); // Fetch movies using the provided function
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${title.toLowerCase()} movies...`); // Set error message on failure
      } finally {
        setLoading(false); // Stop loading indicator once fetching is done
      }
    };

    loadMovies();
  }, [fetchMovies]); // Re-run when `fetchMovies` function changes

  // Scrolls the carousel left or right
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === "left"
          ? -carouselRef.current.offsetWidth // Scroll left by the container's width
          : carouselRef.current.offsetWidth; // Scroll right by the container's width
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  return (
    <div className="movie-section">
      <h2>{title}</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div> // Show loading indicator while fetching
      ) : (
        <div className="carousel-container">
          <button
            className="carousel-arrow left"
            onClick={() => scroll("left")} // Scroll left when clicked
          >
            <FaArrowLeft size={24} />
          </button>
          <div className="carousel" ref={carouselRef}>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} /> // Render movie cards
            ))}
          </div>
          <button
            className="carousel-arrow right"
            onClick={() => scroll("right")} // Scroll right when clicked
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieSection;
