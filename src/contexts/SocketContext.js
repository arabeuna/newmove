import io from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === 'production' 
  ? 'https://https://aramove.onrender.com' 
  : 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  transports: ['websocket', 'polling']
});

// Adicione logs para debug
socket.on('connect_error', (error) => {
  console.log('Erro de conexão:', error);
});

socket.on('reconnect', (attemptNumber) => {
  console.log('Reconectado na tentativa:', attemptNumber);
}); 