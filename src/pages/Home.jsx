import MovieSection from "../components/MovieSection";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getTrendingTVShows,
  getTopRatedTVShows,
} from "../services/api";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <>
        <MovieSection title="Popular Movies" fetchMovies={getPopularMovies} />
        <MovieSection title="Trending Movies" fetchMovies={getTrendingMovies} />
        <MovieSection
          title="Top Rated Movies"
          fetchMovies={getTopRatedMovies}
        />
        <MovieSection
          title="Popular TV Series"
          fetchMovies={getPopularTVShows}
        />
        <MovieSection
          title="Trending TV Series"
          fetchMovies={getTrendingTVShows}
        />
        <MovieSection
          title="Top Rated TV Series"
          fetchMovies={getTopRatedTVShows}
        />
      </>
    </div>
  );
}

export default Home;
