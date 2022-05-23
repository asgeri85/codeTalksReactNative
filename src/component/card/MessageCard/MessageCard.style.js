import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
  },
  body_container: {
    flexDirection: 'row',
  },
  user: {
    fontWeight: 'bold',
    flex: 1,
  },
  time: {
    fontStyle: 'italic',
    marginRight: 3,
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
