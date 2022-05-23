import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Register.style';
import Input from '../../../component/Input';
import {Formik} from 'formik';
import CustomButton from '../../../component/Button';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const initialState = {
    email: '',
    password: '',
    repassword: '',
  };

  const authSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email gerekli formatta değil')
      .required('Email alanı zorunludur'),
    password: Yup.string()
      .min(6, ({min}) => `Şifre en az ${min} karakter olmalı`)
      .required('Şifre alanı zorunludur'),
    repassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Şİfreler aynı değil')
      .required('Şifre alanı zorunludur'),
  });

  const onRegister = formvalue => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(formvalue.email, formvalue.password)
      .then(() => {
        showMessage({
          message: 'Kayıt işlemi başarılı',
          type: 'success',
        });
        setLoading(false);
      })
      .catch(error => {
        showMessage({
          message: error.code,
          type: 'danger',
        });
        setLoading(false);
      });
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.title}>CodeTalks</Text>
      </View>
      <View style={styles.input_container}>
        <Formik
          initialValues={initialState}
          onSubmit={onRegister}
          validationSchema={authSchema}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <>
              <Input
                title="E-posta giriniz"
                value={values.email}
                onChange={handleChange('email')}
                type="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.error_text}>{errors.email}</Text>
              )}
              <Input
                title="Şifre giriniz"
                value={values.password}
                onChange={handleChange('password')}
                secure
              />
              {errors.password && touched.password && (
                <Text style={styles.error_text}>{errors.password}</Text>
              )}
              <Input
                title="Şifre tekrar giriniz"
                value={values.repassword}
                onChange={handleChange('repassword')}
                secure
              />
              {errors.repassword && touched.repassword && (
                <Text style={styles.error_text}>{errors.repassword}</Text>
              )}
              <CustomButton
                text="Kayıt ol"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
        <CustomButton theme="secondary" text="Geri" onPress={onBackPress} />
      </View>
    </View>
  );
};

export default Register;
