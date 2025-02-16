import "./App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import SingleMoviePage from "./pages/SingleMoviePage";
import AllMovies from "./pages/AllMovies";
import AllSeries from "./pages/AllSeries";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<SingleMoviePage />} />
          <Route path="/tv/:tvId" element={<SingleMoviePage />} />
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="/all-series" element={<AllSeries />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
