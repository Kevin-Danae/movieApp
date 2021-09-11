import {useRef} from 'react';
import {Animated} from 'react-native';

export const useFade = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fade = (num: number, callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: num,
      duration: 300,
      useNativeDriver: true,
    }).start( () => callback ? callback() : null);
  };

  return {
      opacity,
      fade
  }
};
