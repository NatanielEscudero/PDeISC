import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type WelcomePageRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

type Props = {
  route: WelcomePageRouteProp;
};

const WelcomePage: React.FC<Props> = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido, {username}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 24, fontWeight: 'bold' },
});

export default WelcomePage;