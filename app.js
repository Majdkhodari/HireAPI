const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const app = express();
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
connectDB();
const path = require("path");
const dotenv = require("dotenv");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(passport.initialize());

// error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
