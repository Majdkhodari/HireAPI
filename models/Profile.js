const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const profilSchema = new Schema({
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
module.exports = model("Profile", profilSchema);
