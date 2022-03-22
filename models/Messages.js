const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
  },
  { timestamps: true }
);
module.exports = model("Messages", messageSchema);
