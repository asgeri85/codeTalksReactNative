import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const MessageCard = ({message}) => {
  const date = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <Text style={styles.user}>{message.email}</Text>
        <Text style={styles.time}>{date}</Text>
      </View>
      <Text style={styles.title}>{message.message}</Text>
    </View>
  );
};

export default MessageCard;
