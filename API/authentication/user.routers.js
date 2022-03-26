const express = require("express");
const {
  signup,
  signin,
  getUsers,
  getOwner,
  fetchUser,
  profileUpdate,
} = require("./user.controllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const router = express.Router();

router.get("/", getUsers);
router.get(
  "/getOwner",
  passport.authenticate("jwt", { session: false }),
  getOwner
);
router.get("/fetchUser", fetchUser);
router.post("/signup", upload.single("picture"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.put(
  "/editprofile",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
