import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  container: {
    margin: 8,
    padding: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default {
  primary: StyleSheet.create({
    ...baseStyle,
    container: {
      ...baseStyle.container,
      backgroundColor: 'orange',
    },
    title: {
      ...baseStyle.title,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...baseStyle,
    container: {
      ...baseStyle.container,
      backgroundColor: 'white',
    },
    title: {
      ...baseStyle.title,
      color: 'orange',
    },
  }),
};
