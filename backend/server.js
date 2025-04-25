const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv').config();

// Criar a aplicação Express
const app = express();
const server = require('http').createServer(app);

// Configuração do CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true
}));

// Middleware para JSON
app.use(express.json());

// Configuração do Socket.io
const io = socketIo(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend está funcionando!' });
});

// Suas outras rotas e configurações aqui
// ...

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento de erros
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
}); 