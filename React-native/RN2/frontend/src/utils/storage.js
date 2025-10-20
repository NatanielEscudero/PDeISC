import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async saveUser(userData) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  async getUser() {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async clearUser() {
    try {
      await AsyncStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Error clearing user:', error);
      return false;
    }
  },
};