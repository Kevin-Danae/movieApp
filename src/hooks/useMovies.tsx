import {useEffect, useState} from 'react';
import {MovieDBPlayNow, Movie} from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesCinema, setMoviesCinema] = useState<Movie[]>([]);

  const getMovies = async () => {
    const resp = await movieDB.get<MovieDBPlayNow>('/now_playing');
    setMoviesCinema(resp.data.results);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    moviesCinema,
    isLoading
  };
};
