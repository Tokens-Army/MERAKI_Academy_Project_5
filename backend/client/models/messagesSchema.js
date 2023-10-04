const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  messages: [{ message: { type: String }, to: { type: Number } }],
});

module.exports = mongoose.model("Message", messageSchema);
