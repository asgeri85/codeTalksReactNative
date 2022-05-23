import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import styles from './CustomButton.style';

const CustomButton = ({text, onPress, theme = 'primary', loading}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles[theme].title}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
