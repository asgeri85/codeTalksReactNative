import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <LottieView source={require('../../assets/splash.json')} autoPlay loop />
  );
};

export default Loading;
