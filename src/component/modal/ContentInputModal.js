import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import styles from './ContentInputModal.style';
import CustomButton from '../Button';

const ContentInputModal = ({visible, onCancel, onSend, text}) => {
  const [message, setMessage] = useState(null);

  const handleMessage = () => {
    if (!message) {
      return;
    }

    onSend(message);
    setMessage('');
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      swipeDirection="down">
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder={text}
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <CustomButton text="Gönder" onPress={handleMessage} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;
