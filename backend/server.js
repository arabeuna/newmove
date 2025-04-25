// Adicione configurações para o Render
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://newmove-f022.onrender.com';

// Configuração CORS
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  credentials: true
}));

// Configuração Socket.io
const io = socketIo(server, {
  cors: {
    origin: [FRONTEND_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
}); 