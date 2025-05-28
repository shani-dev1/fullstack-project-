const { Server } = require('socket.io');
const Message = require('./models/Message');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const typingUsersPerRoom = {};
  const socketIdToEmail = {};

  io.on('connection', (socket) => {
    console.log(`🔌 משתמש התחבר: ${socket.id}`);

    socket.on('joinRoom', async ({ category }) => {
      if (!category) {
        socket.emit('error', 'יש לספק קטגוריה לחיבור לחדר');
        return;
      }

      console.log(`✅ Socket ${socket.id} נכנס לחדר ${category}`);
      socket.join(category);

      if (!typingUsersPerRoom[category]) {
        typingUsersPerRoom[category] = new Set();
      }

      const messages = await Message.find({ room: category })
        .sort({ time: -1 })
        .limit(100)
        .lean();

      socket.emit('chatHistory', messages.reverse());
    });

    socket.on('sendMessage', async ({ category, message, email, userName }) => {
      const msg = new Message({
        room: category,
        email,
        name: userName,
        text: message,
      });

      try {
        await msg.save();
        console.log(`[📨] שמירת הודעה בחדר ${category}: ${message}`);

        io.to(category).emit('receiveMessage', msg);
      } catch (err) {
        console.error('Error saving message:', err);
        socket.emit('error', 'שגיאה בשמירת ההודעה');
      }
    });

    socket.on('startTyping', ({ category, email }) => {
      if (!category || !email) return;

      if (!typingUsersPerRoom[category]) {
        typingUsersPerRoom[category] = new Set();
      }

      typingUsersPerRoom[category].add(email);
      socketIdToEmail[socket.id] = email;

      io.to(category).emit('userTyping', Array.from(typingUsersPerRoom[category]));
    });

    socket.on('stopTyping', ({ category, email }) => {
      if (!category || !email) return;

      if (!typingUsersPerRoom[category]) return;

      typingUsersPerRoom[category].delete(email);
      io.to(category).emit('userTyping', Array.from(typingUsersPerRoom[category]));
    });

    socket.on('disconnecting', () => {
      const rooms = socket.rooms;

      const email = socketIdToEmail[socket.id];
      if (!email) return;

      rooms.forEach((room) => {
        if (room === socket.id) return;

        if (typingUsersPerRoom[room]) {
          typingUsersPerRoom[room].delete(email);
          io.to(room).emit('userTyping', Array.from(typingUsersPerRoom[room]));
        }
      });

      delete socketIdToEmail[socket.id];
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} התנתק`);
    });
  });
};

module.exports = setupSocket;
