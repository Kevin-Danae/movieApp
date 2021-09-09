import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Movie} from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
  marginHorizontal?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

export const MovieCard = ({movie, height = 420, width = 300, marginHorizontal = 2}: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', movie)}
      style={{
        width,
        height,
        marginHorizontal,
        paddingBottom: 20,
        paddingHorizontal: 7
      }}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },
});
