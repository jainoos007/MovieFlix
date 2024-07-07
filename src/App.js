import {useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';
//4007fa6f

const API_URL = 'http://www.omdbapi.com?apikey=4007fa6f';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('marvel');
  }, []);

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      handleClick();
    }
  }

  const handleClick = () => {
    searchMovies(searchTerm);
  }

  return(
    <div className='app'>
      <h1>MovieFlix</h1>
      <div className='search'>
        <input 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} 
        placeholder='Search for movies'
         />
        <img src={SearchIcon}
        alt="search"
        onClick={handleClick} 
        />
      </div>

      {movies?.length > 0
        ? (
          <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
          </div>
        ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
        )}
     </div>
  );
}
export default App