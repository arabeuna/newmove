require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driver');
const passengerRoutes = require('./routes/passenger');
const requestLogger = require('./middleware/requestLogger');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://movetop10.onrender.com', 'http://localhost:3000']  // Permitir ambos em produção
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions
});

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Socket.IO events
require('./socket')(io);

// Adicionar antes das outras rotas
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/passenger', passengerRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  // Servir arquivos estáticos do build do React
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  // Handle React routing
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    }
  });
}

// Função de inicialização
async function startServer() {
  try {
    // Conectar ao MongoDB
    await connectDB();
    
    // Iniciar servidor
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Erro fatal ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Iniciar servidor
startServer();

module.exports = app; 