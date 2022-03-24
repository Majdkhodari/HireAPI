const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const chatSchema = new Schema(
  {
    companyID: { type: Schema.Types.ObjectId, ref: "User" }, // I prefer companyId
    jobSeekerID: { type: Schema.Types.ObjectId, ref: "User" }, // same here jobSeekerId
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
  },
  { timestamps: true }
);
module.exports = model("Chat", chatSchema);
