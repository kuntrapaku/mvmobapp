// src/services/socket.ts
import { io } from 'socket.io-client';

// Correct backend URL for Android Emulator
const socket = io('http://10.0.2.2:8080', {
  transports: ['websocket'], // force websocket (good for React Native)
  jsonp: false,
});

export default socket;
