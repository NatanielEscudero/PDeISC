import React, { useState, useRef, useEffect } from 'react';
import {
  // Componentes Básicos
  View,
  Text,
  Image,
  TextInput,
  
  // Componentes de Interfaz
  TouchableOpacity,
  Pressable,
  Button,
  
  // Componentes de Listas
  FlatList,
  SectionList,
  ScrollView,
  
  // Componentes de Entrada
  Switch,
  
  // Componentes de Indicadores
  ActivityIndicator,
  RefreshControl,
  
  // Componentes de Modal y Navegación
  Modal,
  StatusBar,
  
  // Componentes de Interacción Avanzada
  Animated,
  Alert,
  KeyboardAvoidingView,
  
  // Componentes de Plataforma
  Platform
} from 'react-native';

const EjemploCompletoComponentes = () => {
  // Estados
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Referencias para animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Datos para SectionList
  const sectionData = [
    {
      title: 'Frutas',
      data: ['Manzana', 'Banana', 'Naranja']
    },
    {
      title: 'Verduras',
      data: ['Zanahoria', 'Lechuga', 'Tomate']
    }
  ];

  // Efecto para animaciones iniciales
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Funciones
  const addItem = () => {
    if (text.trim()) {
      setLoading(true);
      
      // Simular carga
      setTimeout(() => {
        const newItem = {
          id: Date.now().toString(),
          text: text,
          completed: false
        };
        
        setItems([newItem, ...items]);
        setText('');
        setLoading(false);
        
        // Animación al agregar
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          })
        ]).start();
        
      }, 1000);
    } else {
      Alert.alert(
        'Campo Vacío',
        'Por favor ingresa algún texto',
        [
          { text: 'OK', style: 'default' },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    
    // Simular refresh
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Actualizado', 'Los datos se han actualizado');
    }, 1500);
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const showPlatformAlert = () => {
    Alert.alert(
      'Información de Plataforma',
      `Estás en: ${Platform.OS === 'ios' ? 'iOS' : 'Android'}`,
      [{ text: 'Entendido' }]
    );
  };

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar 
        backgroundColor="#007AFF" 
        barStyle="light-content" 
      />
      
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#f5f5f5' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      >
        {/* Header Animado */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            backgroundColor: '#007AFF',
            padding: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
        >
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: 'white',
            textAlign: 'center'
          }}>
            React Native
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: 'white', 
            textAlign: 'center',
            marginTop: 5
          }}>
            Todos los Componentes React Native
          </Text>
        </Animated.View>

        <View style={{ padding: 20 }}>

          {/* Sección: Entrada de Texto */}
          <Text style={styles.sectionTitle}> Entrada de Texto</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe algo aquí..."
            value={text}
            onChangeText={setText}
            multiline
            maxLength={100}
          />

          {/* Sección: Botones Diferentes */}
          <Text style={styles.sectionTitle}> Botones y Pressables</Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={addItem}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Agregando...' : 'TouchableOpacity (agrega lo ingresado en el area de texto a la flatlist)'}
              </Text>
            </TouchableOpacity>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.buttonPressed
              ]}
              onPress={animatePress}
              onLongPress={showPlatformAlert}
            >
              {({ pressed }) => (
                <Text style={styles.buttonText}>
                  {pressed ? 'Presionado!' : 'Pressable (ejecuta la animacion del header)'}
                </Text>
              )}
            </Pressable>
          </View>

          <Button
            title="Button Nativo (abre un modal)"
            onPress={() => setModalVisible(true)}
            color="#FF3B30"
          />

          {/* Sección: Switch */}
          <Text style={styles.sectionTitle}> Switch y Estado</Text>
          <View style={styles.switchContainer}>
            <Text>Notificaciones: {switchValue ? 'ON' : 'OFF'}</Text>
            <Switch
              value={switchValue}
              onValueChange={setSwitchValue}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={switchValue ? '#007AFF' : '#f4f3f4'}
            />
          </View>

          {/* Sección: FlatList */}
          <Text style={styles.sectionTitle}> FlatList</Text>
          {loading && <ActivityIndicator size="large" color="#007AFF" />}
          
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                onLongPress={() => handleLongPress(item)}
                style={({ pressed }) => [
                  styles.listItem,
                  pressed && styles.itemPressed
                ]}
              >
                <Text>{item.text}</Text>
                <Text style={styles.timestamp}>
                  {new Date(parseInt(item.id)).toLocaleTimeString()}
                </Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No hay elementos. ¡Agrega algunos!
              </Text>
            }
          />

          {/* Sección: SectionList */}
          <Text style={styles.sectionTitle}> SectionList</Text>
          <SectionList
            sections={sectionData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.sectionListItem}>
                <Text>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
          />

          {/* Sección: Image */}
          <Text style={styles.sectionTitle}> Image</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              resizeMode="contain"
            />
            <Text style={styles.imageText}>Logo de React Native</Text>
          </View>

        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedItem ? 'Elemento Seleccionado' : 'Modal de Ejemplo'}
            </Text>
            
            {selectedItem && (
              <Text style={styles.modalText}>
                {selectedItem.text}
              </Text>
            )}
            
            <Text style={styles.modalDescription}>
              Este es un modal nativo de React Native con animación de slide.
            </Text>

            <View style={styles.modalButtons}>
              <Button
                title="Cerrar"
                onPress={() => {
                  setModalVisible(false);
                  setSelectedItem(null);
                }}
                color="#FF3B30"
              />
              
              <Button
                title="Aceptar"
                onPress={() => {
                  Alert.alert('Éxito', 'Acción completada');
                  setModalVisible(false);
                  setSelectedItem(null);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

// Estilos
const styles = {
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5
  },
  primaryButton: {
    backgroundColor: '#007AFF'
  },
  secondaryButton: {
    backgroundColor: '#34C759'
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemPressed: {
    backgroundColor: '#f0f0f0'
  },
  timestamp: {
    fontSize: 12,
    color: '#666'
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 6
  },
  sectionHeaderText: {
    color: 'white',
    fontWeight: 'bold'
  },
  sectionListItem: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 2,
    borderRadius: 4
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  imageText: {
    color: '#666',
    fontStyle: 'italic'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 6,
    width: '100%'
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10
  }
};

export default EjemploCompletoComponentes;