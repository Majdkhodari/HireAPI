const express = require("express");
const {
  fetchJobSeeker,
  fetchJobSeekers,
  deleteJobSeeker,
  createJobSeeker,
  updatejobSeeker,
} = require("./jobSeeker.controller");

const router = express.Router();

router.get("/jobseeker", fetchJobSeeker);
router.get("/jobseekers", fetchJobSeekers);
router.post("/createJobseeker", createJobSeeker);
router.delete("/deleteJobSeeker", deleteJobSeeker);
router.post("/", updatejobSeeker);

module.exports = router;
