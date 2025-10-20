// src/config/auth.js
export const authConfig = {
  google: {

    webClientId: '584687367545-c6of1or31j2kl8j05l0uq7ajunk2u9ln.apps.googleusercontent.com',
    
    // Para desarrollo general
    clientId: 'TU_EXPO_CLIENT_ID.apps.googleusercontent.com',
    
    // Para apps nativas (opcional por ahora)
    androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com',
    
    scopes: ['profile', 'email'],
  }
};
