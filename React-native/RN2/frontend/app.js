// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuthContext } from './src/context/AuthContext';
import LoginScreen from './src/components/LoginScreen';
import ProfileScreen from './src/components/ProfileScreen';

const Stack = createNativeStackNavigator();

// Componente que usa el contexto de autenticación
function AppNavigator() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Mi Perfil',
              headerBackVisible: false
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Componente principal que envuelve con AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}