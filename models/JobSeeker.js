const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const jobSeeker = new Schema(
  {
    prefix: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    skils: { type: String },
    phone: { type: Number },
    gender: { type: String },
    skills: { type: String },
    about: { type: String },
    age: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = model("JobSeeker", jobSeeker);
