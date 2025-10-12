import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Error al conectar con el servidor');
  }
};