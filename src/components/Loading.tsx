import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color="red" size={100} />
    </View>
  );
};
