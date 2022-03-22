const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const educationSchema = new Schema(
  {
    school: { type: String },
    major: { type: String },
    country: { type: String },
    yearStart: { type: Number },
    yearEnd: { type: Number },
  },
  { timestamps: true }
);
module.exports = model("Education", educationSchema);
