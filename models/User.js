// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    picture: { type: String },
    username: {
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
      trim: true,
      lowercase: true,
      unique: true,
      required: "Missing Email address",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    search: { type: String },
    status: { type: String },
    Languages: { type: String }, // can you add more than one into a string? i think its better to have it as an array
    loginType: { type: String },
    signUpAs: { type: String }, //userType will be better
  },
  { timestamps: true }
);

//UserSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = model("User", UserSchema);
