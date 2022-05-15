import React, { useState, useEffect } from 'react';
import './App.css';
import MovieListHeading from "./components/MovieListHeading";
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import AddToFavourites from "./components/AddToFavourites";
import Filter from "./components/Filter";
import Github from "./Github.svg";
// import AddToFavourites from "./components/AddToFavourites";

const API_URL = "https://www.omdbapi.com/?apikey=4159debf&";

const STORAGE_LABEL = "favourite-movie";
function App() {

  // useState
  // state includes 
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favouriteMovies, setFavouriteMovie] = useState([]);
  const [filters, setFilters] = useState("all");

  // function
  const getMovieRequest = async(title) => {

    const response = await fetch(`${API_URL}s=${title}`);
    const responseJson = await response.json();

    if(responseJson.Search) {
      const newMovies = responseJson.Search.filter((movie) => movie.Poster !== "N/A");
      setMovies(newMovies);
      setFilters("all");
    }
  }

  // useEffect
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  // initialize favourite movie when user does not any type for search movie
  useEffect(() => {
    getMovieRequest("Iron man");
    getFromLocalStorage();
  }, []);


  // save favourite movies into localStorage
  const saveToLocalStorage = (movies) => { 
    localStorage.setItem(STORAGE_LABEL, JSON.stringify(movies)); 
  };

  //update favourite movies
  const addFavouriteMovie = (movie) => {
    const newMovies = [...favouriteMovies, movie];
    setFavouriteMovie(newMovies);
    saveToLocalStorage(newMovies);
  };

  //remove favourite movies
  const removeFavouriteMovie = (movie) => {
    // if id were matched, remove movie
    const newMovies = favouriteMovies.filter(favourite => favourite.imdbID !== movie.imdbID);
    // setFavouriteMovie(favouriteMovies.filter(favourite => favourite.imdbID !== movie.imdbID))
    setFavouriteMovie(newMovies);
    saveToLocalStorage(newMovies);
  };


  // get movies from localStorage
  const getFromLocalStorage = () => { 
    const movieFavourite = JSON.parse(localStorage.getItem(STORAGE_LABEL)); 
    if(movieFavourite) {
      setFavouriteMovie(movieFavourite); 
    }
  }

  

  return (
    <div className="container">
      <MovieListHeading header={"Movies"} />
      <SearchBox 
        value={searchValue} 
        setSearchValue={setSearchValue}/>
      <Filter filters={filters} setFilters={setFilters}/>
      {
        filters === "all" ? 
        (
          <MovieList 
            movies={movies} 
            favouriteComponent={AddToFavourites}
            hanldeClickFavourite={addFavouriteMovie}
            title={"Add to Favourites"}
        />) : favouriteMovies?.length > 0 ?(
              <MovieList 
                movies={favouriteMovies} 
                favouriteComponent={AddToFavourites}
                hanldeClickFavourite={removeFavouriteMovie} 
                title={"Remove from Favourites"}/>) : <p>empty</p>
      }
      
      <footer className="footer">
        <p>nguyenpatz</p>
        <a href="https://github.com/nguyenpatz">
          <img src={Github} alt="" />
        </a>
      </footer>
    </div>
  );
}

export default App;