import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:8080/api', // emulator to host machine
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ FIXED: sending "username" as backend expects
export const loginApi = async (credentials: { username: string; password: string }) => {
  return API.post('/auth/login', credentials);
};

export default API;
