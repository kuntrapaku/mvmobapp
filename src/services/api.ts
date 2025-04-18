import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:8080/api', // emulator to host machine
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👇 Create a login API call using the instance
export const loginApi = async (credentials: { email: string; password: string }) => {
  return API.post('/auth/login', credentials); // Adjust endpoint if needed
};

export default API;
