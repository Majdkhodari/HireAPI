const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const experienceSchema = new Schema(
  {
    company: { type: String },
    jobTitle: { type: String },
    yearStart: { type: Number },
    yearEnd: { type: Number },
  },
  { timestamps: true }
);
module.exports = model("Experience", experienceSchema);
