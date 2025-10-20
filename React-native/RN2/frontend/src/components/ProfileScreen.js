// src/components/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { userProfileService } from '../services/userProfileService';
import { useAuth } from '../hooks/useAuth';

const ProfileScreen = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    photo: null,
  });

  useEffect(() => {
    if (user) {
      console.log('ProfileScreen - Usuario recibido:', user);
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        photo: user.photo || null,
      });
    }
  }, [user]);

  // Resto del código de ProfileScreen permanece igual...
  const updatePhoto = async () => {
    setLoading(true);
    const photoUri = await userProfileService.updateProfilePhoto();
    if (photoUri) {
      setProfile({ ...profile, photo: photoUri });
    }
    setLoading(false);
  };

  const updateLocation = async () => {
    setLoading(true);
    const location = await userProfileService.getCurrentLocation();
    if (location) {
      setProfile({ ...profile, address: location.address });
      Alert.alert('Ubicación actualizada', `Dirección: ${location.address}`);
    }
    setLoading(false);
  };

  const scanDocument = async () => {
    setLoading(true);
    const document = await userProfileService.scanDocument();
    if (document) {
      Alert.alert('Documento escaneado', `Archivo: ${document.name}\nTamaño: ${(document.size / 1024).toFixed(2)} KB`);
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text>No hay usuario logueado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={updatePhoto} disabled={loading}>
          <Image
            source={{ 
              uri: profile.photo || 'https://via.placeholder.com/100?text=Sin+foto' 
            }}
            style={styles.avatar}
          />
          <Text style={styles.changePhotoText}>
            {loading ? 'Cargando...' : 'Cambiar foto'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
          placeholder="Ingresa tu nombre completo"
          editable={!loading}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          editable={!loading}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={profile.address}
          onChangeText={(text) => setProfile({ ...profile, address: text })}
          placeholder="Tu dirección completa"
          editable={!loading}
          multiline
        />

        <TouchableOpacity 
          style={[styles.locationButton, loading && styles.disabledButton]} 
          onPress={updateLocation}
          disabled={loading}
        >
          <Text style={styles.locationButtonText}>
            📍 Usar ubicación actual
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.documentButton, loading && styles.disabledButton]} 
          onPress={scanDocument}
          disabled={loading}
        >
          <Text style={styles.documentButtonText}>
            📄 Escanear Documento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.disabledButton]} 
          onPress={saveProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Guardar Perfil</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.logoutButton, loading && styles.disabledButton]} 
          onPress={logout}
          disabled={loading}
        >
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Los styles permanecen igual...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  changePhotoText: {
    marginTop: 12,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  userEmail: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  form: {
    padding: 24,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  locationButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  documentButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  locationButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },
  documentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;