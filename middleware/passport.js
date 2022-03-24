const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
secret = process.env.JWT_SECRET;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username }); // {username} === {username:username}  which one you like more? I prefer the 1st one. Can you please use it? thanks
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordMatch) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  async (jwtPayload, done) => {
    if (Date.now() > +jwtPayload.exp) {
      // jwtPayload.exp is a string you don't need to add +
      return done(null, flase);
    }
    try {
      const user = await User.findById(jwtPayload._id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
