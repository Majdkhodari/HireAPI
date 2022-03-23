const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");

const {
  // fetchJobSeeker,
  fetchJobSeekers,
  createJobSeeker,
  // deleteJobSeeker,
  // createJobSeeker,
  // updatejobSeeker,
} = require("./jobSeeker.controller");

const router = express.Router();

// router.get("/", fetchJobSeeker);
router.get("/", fetchJobSeekers);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createJobSeeker
);
// router.delete("/deleteJobSeeker", deleteJobSeeker);
// router.post("/", updatejobSeeker);

module.exports = router;
