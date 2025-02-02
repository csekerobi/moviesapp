# MovieApp

MovieApp is a React-based application that allows users to explore popular movies, search for movies, and manage a list of favorites. It utilizes The Movie Database (TMDb) API to fetch movie data.

## Features

- **Search for Movies**: Users can search for movies by title.
- **View Popular Movies**: Displays a list of trending movies.
- **Favorites**: Allows users to add or remove movies to/from their favorites list.
- **Navigation**: A navigation bar that lets users toggle between the Home and Favorites pages.

## Technologies

- **React**: Front-end framework for building the app.
- **TMDb API**: Fetches movie data (popular and search results).
- **Context API**: Used for managing the global state of favorite movies.
- **LocalStorage**: Persists the user's favorite movies between sessions.
- **React Router**: Handles routing for different views (Home, Favorites).

## Components

- **NavBar**: A navigation bar that links to the Home and Favorites pages.
- **Home**: Displays the search bar and a list of popular movies. It fetches popular movies on load and handles search functionality.
- **MovieCard**: Displays movie details, including the poster and title, with an option to add/remove movies from favorites.
- **Favorites**: Displays the list of favorite movies saved by the user.

## Context

The `MovieContext` provides global state management, including:

- `favorites`: An array of favorite movies.
- `addToFavorites`: Function to add a movie to the favorites.
- `removeFromFavorites`: Function to remove a movie from the favorites.
- `isFavorite`: Function to check if a movie is in the favorites list.

## API

The app interacts with The Movie Database (TMDb) API to fetch popular movies and search for specific movies.

### Endpoints:

- **Popular Movies**: `/movie/popular`
- **Search Movies**: `/search/movie`

## Future Improvements

- **Add Movie Genre**: Adding functionality to display and filter movies by genre.
- **Filtering Method**: Implementing filtering options to allow users to refine movie searches by various criteria (e.g., release year, rating).
- **Movie Rating**: Displaying movie ratings and allowing users to sort or filter movies based on their ratings.
