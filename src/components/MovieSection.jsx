import MovieCard from "./MovieCard";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./MovieSection.css";

function MovieSection({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

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

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === "left"
          ? -carouselRef.current.offsetWidth
          : carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="movie-section">
      <h2>{title}</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="carousel-container">
          <button
            className="carousel-arrow left"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft size={24} />
          </button>
          <div className="carousel" ref={carouselRef}>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          <button
            className="carousel-arrow right"
            onClick={() => scroll("right")}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieSection;
