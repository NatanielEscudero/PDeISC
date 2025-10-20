import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

export const userProfileService = {
  // Actualizar foto de perfil
  async updateProfilePhoto() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Necesitamos acceso a tu galería para cambiar la foto de perfil');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error updating profile photo:', error);
      Alert.alert('Error', 'No se pudo actualizar la foto de perfil');
      return null;
    }
  },

  // Obtener ubicación
  async getCurrentLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Necesitamos acceso a tu ubicación para obtener tu dirección');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      // Reverse geocoding para obtener la dirección
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address[0] ? `${address[0].street}, ${address[0].city}` : 'Dirección no disponible',
      };
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación');
      return null;
    }
  },

  // Escanear documento
  async scanDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        return {
          name: result.name,
          uri: result.uri,
          size: result.size,
          mimeType: result.mimeType,
        };
      }
      return null;
    } catch (error) {
      console.error('Error scanning document:', error);
      Alert.alert('Error', 'No se pudo seleccionar el documento');
      return null;
    }
  },
};