import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {MovieCard} from '../components/MovieCard';
import {useMovies} from '../hooks/useMovies';

export const HomeScreen = () => {
  const {moviesCinema, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{marginTop: top + 20}}>
      <MovieCard movie={moviesCinema[6]} />
    </View>
  );
};
