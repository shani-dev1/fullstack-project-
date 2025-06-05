const allowedPorts = [5173, 5174, 5175];

const corsOptions = {
  origin: function (origin, callback) {
    const port = origin ? new URL(origin).port : null;

    if (allowedPorts.includes(parseInt(port)) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
