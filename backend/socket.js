const { Server } = require('socket.io');

const createSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 משתמש התחבר: ${socket.id}`);
  });

  // פונקציה לשליחת עדכונים על תחרויות
  const notifyClients = (action, competitionData) => {
    console.log("notifyClients");
    
    io.emit('competitionUpdate', { action, competitionData });
  };

  return { io, notifyClients }; // החזר את notifyClients
};

module.exports = createSocket;
