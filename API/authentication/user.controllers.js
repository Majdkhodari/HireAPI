// const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JobSeeker = require("../../models/JobSeeker");
const Company = require("../../models/Company");
dotenv.config();
const JWT_EXPIRATION_MS = +process.env.JWT_EXPIRATION_MS;
const JWT_SECRET = process.env.JWT_SECRET;

exports.fetchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

exports.ownerUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.picture = `/${req.file.path}`;
      req.body.picture = req.body.picture.replace("\\", "/");
    }
    const newOwnerProfile = await User.findByIdAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );

    return res.status(200).json(newOwnerProfile);
  } catch (error) {
    next(error);
  }
};
exports.bioUpdate = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.picture = `/${req.file.path}`;
    //   req.body.picture = req.body.picture.replace("\\", "/");
    // }
    let newProfile;
    if (req.user.signUpAs === "JobSeeker") {
      newProfile = await JobSeeker.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true, runValidators: true } // returns the updated product
      );
    } else if (req.user.signUpAs === "Company") {
      newProfile = await Company.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true, runValidators: true } // returns the updated product
      );
    }

    return res.status(200).json(newProfile);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.picture = `/${req.file.path}`;
      req.body.picture = req.body.picture.replace("\\", "/");
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
