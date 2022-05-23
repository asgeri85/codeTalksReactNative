import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/auth/Login';
import Register from './src/pages/auth/Register';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import Home from './src/pages/Home';
import Messages from './src/pages/Messages';
import Loading from './src/component/Loading';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
      setLoading(false);
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions>
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {!userSession ? (
        <AuthStack />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{
              headerRight: () => (
                <Icon
                  name="logout"
                  size={20}
                  onPress={() => auth().signOut()}
                />
              ),
              title: 'Odalar',
              headerTintColor: 'orange',
            }}
          />
          <Stack.Screen
            name="MessagesScreen"
            component={Messages}
            options={({route}) => ({
              title: route.params.room.name,
              headerTitleAlign: 'center',
              headerTintColor: 'orange',
            })}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
