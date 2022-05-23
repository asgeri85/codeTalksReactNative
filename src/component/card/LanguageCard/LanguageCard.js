import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './Language.style';

const LanguageCard = ({room, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{room.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LanguageCard;
