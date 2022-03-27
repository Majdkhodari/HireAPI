const express = require("express");
const upload = require("../../middleware/multer"); // remove unused import
const passport = require("passport");
//Kindly remove all the commented code if you are not goona use it.
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
