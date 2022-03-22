const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const chatSchema = new Schema(
  {
    companyID: { type: Schema.Types.ObjectId, ref: "User" },
    jobSeekerID: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
  },
  { timestamps: true }
);
module.exports = model("Chat", chatSchema);
