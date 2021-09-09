import {useEffect, useState} from 'react';
import {MovieDBResponse, Movie} from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';

interface MoviesState {
  moviesCinema: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    moviesCinema: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const popularPromise = movieDB.get<MovieDBResponse>('/popular');
    const nowPlayPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const topRatePromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');

    const resp = await Promise.all([
      popularPromise,
      nowPlayPromise,
      topRatePromise,
      upcomingPromise,
    ]);

    setMoviesState({
      moviesCinema: resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upcoming: resp[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
