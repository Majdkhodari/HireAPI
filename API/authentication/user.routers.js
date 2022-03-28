const express = require("express");
const {
  signup,
  signin,
  getUsers,
  getOwner,
  fetchUser,
  bioUpdate,
  ownerUpdate,
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
  "/editOwner",
  passport.authenticate("jwt", { session: false }),
  upload.single("picture"),
  ownerUpdate
);
router.put(
  "/editBio",
  passport.authenticate("jwt", { session: false }),
  bioUpdate
);

module.exports = router;
