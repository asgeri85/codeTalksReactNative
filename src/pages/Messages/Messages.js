import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import FabButton from '../../component/FabButton';
import styles from './Messages.style';
import MessageCard from '../../component/card/MessageCard';
import ContentInputModal from '../../component/modal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseJsonData from '../../utils/parseJsonData';
import Loading from '../../component/Loading';

const Messages = ({route, navigation}) => {
  const {room} = route.params;
  const referance = database().ref(`codeMessages/${room.name}/${room.id}/`);
  const [visibleModal, setVisibleModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    referance.on('value', snapshot => {
      const messageResponse = parseJsonData(snapshot.val() || {});
      setMessages(messageResponse);
      setLoading(false);
    });
  }, []);

  const handleToggle = () => {
    setVisibleModal(!visibleModal);
  };

  const sendMessage = content => {
    const mail = auth().currentUser.email;

    const messageObj = {
      message: content,
      email: mail.split('@')[0],
      date: new Date().toISOString(),
    };

    referance.push(messageObj);
    handleToggle();
  };

  const renderMessage = ({item}) => <MessageCard message={item} />;

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>{room.name} odası kuruldu!</Text>
      </View>
      <FlatList data={messages} renderItem={renderMessage} />
      <FabButton onPress={handleToggle} />
      <ContentInputModal
        visible={visibleModal}
        onCancel={handleToggle}
        text="Mesajınız"
        onSend={sendMessage}
      />
    </View>
  );
};

export default Messages;
