import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {MovieFull} from '../interfaces/movieInterface';
import {CreditsResponse, Cast} from '../interfaces/creditsInterface';

interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull;
}

export const useMovieDetail = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailPromise = movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

    const [ movieResp, castResp ] = await Promise.all([movieDetailPromise, castPromise]);
    setState({
      isLoading: false,
      movieFull: movieResp.data,
      cast: castResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
