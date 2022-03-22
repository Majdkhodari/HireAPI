const express = require("express");
const { signup, signin, getUsers } = require("./user.controllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", upload.single("image"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;