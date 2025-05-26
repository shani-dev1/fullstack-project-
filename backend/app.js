const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const competitionRoutes = require('./routes/competitionRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONECTION_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/competitions', competitionRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
