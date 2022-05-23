import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Input from '../../../component/Input';
import styles from './Login.style';
import CustomButton from '../../../component/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email gerekli formatta değil')
      .required('Email alanı zorunludur'),
    password: Yup.string().required('Şifre alanı zorunludur'),
  });

  const onLoginClick = (formValue, {resetForm}) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then(() => {
        showMessage({
          message: 'Giriş Başarılı',
          type: 'success',
        });
        setLoading(false);
        resetForm({formValue: ''});
      })
      .catch(error => {
        showMessage({
          message: error.code,
          type: 'danger',
        });
        setLoading(false);
      });
  };

  const onRegisterClick = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.title}>CodeTalks</Text>
      </View>
      <View style={styles.input_container}>
        <Formik
          initialValues={initialValues}
          onSubmit={onLoginClick}
          validationSchema={validationSchema}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <>
              <Input
                title="E posta giriniz..."
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
              <CustomButton
                text="Giriş Yap"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
        <CustomButton
          text="Kayıt Ol"
          theme="secondary"
          onPress={onRegisterClick}
        />
      </View>
    </View>
  );
};

export default Login;
