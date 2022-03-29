const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");
const {
  //   fetchCompanies,
  // fetchCompany,
  //   createCompany,
  // deleteCompany,
  // updateCompany,
  createChat,
  ChatDelete,
  createMessage,
  fetchOwnerChats,
  fetchMessages,
} = require("./chat.controller");

const router = express.Router();

// router.get("/", fetchCompanies);
// router.get("/", fetchCompany);
router.get(
  "/fetchOwnerChats",
  passport.authenticate("jwt", { session: false }),
  fetchOwnerChats
);
router.post("/", passport.authenticate("jwt", { session: false }), createChat);
router.post(
  "/deleteOneChat",
  passport.authenticate("jwt", { session: false }),
  ChatDelete
);
router.post(
  "/messageCreate",
  passport.authenticate("jwt", { session: false }),
  createMessage
);
router.get("/fetchMessages", fetchMessages);

// router.delete("/deleteCompany", deleteCompany);
// router.post("/updateCompany", updateCompany);

module.exports = router;
