import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import WelcomePage from '../components/WelcomePage';

export type RootStackParamList = {
  Login: undefined;
  Welcome: { username: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Welcome" component={WelcomePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;