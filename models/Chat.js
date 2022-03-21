const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = model("Chat", chatSchema);
