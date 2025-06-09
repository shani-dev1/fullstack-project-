const { Server } = require('socket.io');
const Message = require('./models/message');

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

    socket.on('joinRoom', async ({ category }) => {

      if (!category) {
        socket.emit('error', 'יש לספק קטגוריה לחיבור לחדר');
        return;
      }
      console.log(`User joined room: ${category}`);

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
      console.log(`Message sent in room ${category}: ${message}`);

      const msg = new Message({
        room: category,
        email,
        name: userName,
        text: message,
      });
      try {
        let messageCount = await Message.countDocuments({ room: category });
        while (messageCount >= 100) {
          const oldestMessage = await Message.findOne({ room: category }).sort({ time: 1 });
          if (!oldestMessage) break;
          await Message.findByIdAndDelete(oldestMessage._id);
          messageCount--;
        }
        await msg.save();
        io.to(category).emit('receiveMessage', msg);
      } catch (err) {
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
      console.log(`Socket ${socket.id} Disconnect`);
    });
  });
};

module.exports = setupSocket;

