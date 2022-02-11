import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';


function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error_, setError] = useState(null);

  // doing the below task using async await
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something Went Wrong!')
      }
      const data = await response.json();


      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } 
    catch (error)
    {
      setError(error.message)
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/').then(response => {
  //     return response.json();
  //   }).then(data => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     });
  //     setMovies(transformedMovies);
  //   });
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !Error_ && <p>Found no movies</p>}
        {isLoading && <p>Loading..</p>}
        {!isLoading && Error && <p>{Error_}</p>}
      </section>
    </React.Fragment>
  )
};

export default App;
