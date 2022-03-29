const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

const userRoutes = require("./api/authentication/user.routers");
app.use("/api/users", userRoutes);

const companyRoutes = require("./api/company/company.routers");
app.use("/api/company", companyRoutes);

const jobSeekerRoutes = require("./api/JobSeeker/jobSeeker.router");
app.use("/api/jobseeker", jobSeekerRoutes);

const chatRoutes = require("./api/chat/chat.router");
app.use("/api/chats", chatRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

//? Error handler Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal Server Error" }); // TODO> if you name msg you use it everywhere like this:
  next();
});

//? Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
