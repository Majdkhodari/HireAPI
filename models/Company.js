const { model, Schema } = require("mongoose");
// const mongoose = require("mongoose");

const companySchema = new Schema(
  {
    type: { type: String },
    founders: { type: String },
    yearEstablished: { type: Number },
    size: { type: String },
    about: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = model("Company", companySchema);
