const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const app = express();

// cors
app.use(cors());

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

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
