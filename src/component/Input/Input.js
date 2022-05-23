import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './Input.style';

const Input = ({title, onChange, value, type, secure}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={title}
        placeholderTextColor="white"
        onChangeText={onChange}
        value={value}
        style={styles.title}
        keyboardType={type}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default Input;
