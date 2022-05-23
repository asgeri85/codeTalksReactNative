import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import LanguageCard from '../../component/card/LanguageCard';
import database from '@react-native-firebase/database';
import FabButton from '../../component/FabButton';
import styles from './Home.style';
import ContentInputModal from '../../component/modal';
import parseJsonData from '../../utils/parseJsonData';
import Loading from '../../component/Loading';

const reference = database().ref('/rooms');

const Home = ({navigation}) => {
  const [rooms, setRooms] = useState([]);
  const [visibleModal, setVisibleModel] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reference.on('value', snapshot => {
      const roomResponse = parseJsonData(snapshot.val() || {});
      setRooms(roomResponse);
      setLoading(false);
    });
  }, []);

  const handleToggle = () => {
    setVisibleModel(!visibleModal);
  };

  const handleSetContent = content => {
    createRoom(content);
    handleToggle();
  };

  const createRoom = content => {
    const roomObj = {
      name: content,
    };

    reference.push(roomObj);
  };

  const navigateMessages = item => {
    navigation.navigate('MessagesScreen', {room: item});
  };

  const renderRoom = ({item}) => (
    <LanguageCard room={item} onPress={() => navigateMessages(item)} />
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList data={rooms} renderItem={renderRoom} numColumns={2} />
      <FabButton onPress={handleToggle} />
      <ContentInputModal
        visible={visibleModal}
        onCancel={handleToggle}
        onSend={handleSetContent}
        text="Oda adı giriniz"
      />
    </View>
  );
};

export default Home;
