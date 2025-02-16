import { createContext, useState, useContext, useEffect } from "react";

// Create the context for movie-related data and actions
const MovieContext = createContext();

// Custom hook to access the MovieContext easily
export const useMovieContext = () => useContext(MovieContext);

// MovieProvider component that provides the context to the app's children
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // State to store the list of favorite movies

  //Load favorite movies from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    // If favorites exist in localStorage, update the state with those values
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  //Update localStorage whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to add a movie to the favorites list
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Function to remove a movie from the favorites
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Function to check if a movie is in the favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // Provide the context value
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    // Use the MovieContext.Provider to pass down the context value to child components
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
