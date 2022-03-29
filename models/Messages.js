const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    message: { type: String },
  },
  { timestamps: true }
);
module.exports = model("Messages", messageSchema);
