// src/hooks/useAuth.js
import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuthContext } from '../context/AuthContext';
import { authConfig } from '../config/auth';

WebBrowser.maybeCompleteAuthSession();

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuthContext();

  // Configuración para diferentes plataformas
  const googleConfig = {
    scopes: ['profile', 'email'],
  };

  // Agregar clientId según la plataforma
  if (Platform.OS === 'web') {
    googleConfig.webClientId = authConfig.google.webClientId;
  } else if (Platform.OS === 'android') {
    googleConfig.androidClientId = authConfig.google.androidClientId;
  } else if (Platform.OS === 'ios') {
    googleConfig.iosClientId = authConfig.google.iosClientId;
  }

  // Para desarrollo, usar expoClientId como fallback
  if (!googleConfig.webClientId && !googleConfig.androidClientId && !googleConfig.iosClientId) {
    googleConfig.expoClientId = authConfig.google.clientId;
  }

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest(googleConfig);

  // Manejar respuesta de Google
  React.useEffect(() => {
    if (googleResponse?.type === 'success') {
      console.log('Google response success:', googleResponse);
      handleGoogleAuth(googleResponse);
    } else if (googleResponse?.type === 'error') {
      console.error('Google Auth Error:', googleResponse);
      Alert.alert('Error', `Error de autenticación: ${googleResponse.error}`);
    }
  }, [googleResponse]);

  const handleGoogleAuth = async (response) => {
    try {
      setLoading(true);
      console.log('Procesando autenticación Google...');
      
      if (!response.authentication?.accessToken) {
        throw new Error('No se recibió token de acceso');
      }

      const userInfo = await fetchUserInfo(response.authentication.accessToken);
      console.log('User info obtenido:', userInfo);
      
      const userData = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        photo: userInfo.picture,
        provider: 'google',
        accessToken: response.authentication.accessToken,
        timestamp: new Date().toISOString(),
      };
      
      console.log('Llamando login con:', userData);
      await login(userData); // Usar el context para login
      
      Alert.alert('Éxito', `Bienvenido ${userInfo.name}`);
    } catch (error) {
      console.error('Google auth error:', error);
      Alert.alert('Error', 'Falló la autenticación con Google: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async (token) => {
    console.log('Fetching user info con token:', token);
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout(); // Usar el context para logout
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    googlePromptAsync: () => googlePromptAsync(),
    logout: handleLogout,
  };
};