const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: String,
  customer_id:String,
  message: String,
  timestamp: Date
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
