import React, { useContext, useEffect } from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {Loading} from '../components/Loading';
import {MovieCard} from '../components/MovieCard';
import {useMovies} from '../hooks/useMovies';
import {GradientBackground} from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {moviesCinema, isLoading, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();

  const { setMainColors } = useContext( GradientContext )

  const getPosterColors = async (index: number) => {
    const movie = moviesCinema[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const [ primary = 'green', secondary = 'orange' ] = await getImageColors(uri);
    setMainColors({ primary, secondary})
  };

  useEffect(() => {
    if( moviesCinema.length > 0 ) {
      getPosterColors(0);
    }
  }, [ moviesCinema ])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carousel principal */}
          <View style={{height: 440}}>
            <Carousel
              data={moviesCinema}
              renderItem={({item}: any) => <MovieCard movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Peliculas populares */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
