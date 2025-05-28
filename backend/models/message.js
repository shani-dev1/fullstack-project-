const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String },
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
  formattedTime: { type: String } 
});

messageSchema.pre('save', function (next) {
  const date = this.time || new Date();
  const options = { timeZone: 'Asia/Jerusalem', hour12: false };
  this.formattedTime = date.toLocaleString('he-IL', options);
  next();
});
module.exports = mongoose.model('Message', messageSchema);
