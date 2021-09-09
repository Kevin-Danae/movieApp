import React from 'react';
import {Dimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {Loading} from '../components/Loading';
import {MovieCard} from '../components/MovieCard';
import {useMovies} from '../hooks/useMovies';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {moviesCinema, isLoading, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return <Loading />;
  }

  return (
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
          />
        </View>

        {/* Peliculas populares */}
        <HorizontalSlider title="Popular" movies={popular} />
        <HorizontalSlider title="Top Rated" movies={topRated} />
        <HorizontalSlider title="Upcoming" movies={upcoming} />
      </View>
    </ScrollView>
  );
};
