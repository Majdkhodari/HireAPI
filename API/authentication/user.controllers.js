// const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_EXPIRATION_MS = +process.env.JWT_EXPIRATION_MS;
const JWT_SECRET = process.env.JWT_SECRET;

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("chats");
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      type: newUser.signUpAs,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const user = req.user;
  const payload = {
    _id: user._id,
    username: user.username,
    type: user.signUpAs,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  return res.status(201).json({ token });
};
