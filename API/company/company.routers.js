//****please remove all the commented code and imports if you wont use it!
const express = require("express");
const upload = require("../../middleware/multer"); //remove unused import.
const passport = require("passport");
const {
  fetchCompanies,
  // fetchCompany,
  createCompany,
  // deleteCompany,
  // updateCompany,
} = require("./company.controllers");

const router = express.Router();

router.get("/", fetchCompanies);
// router.get("/", fetchCompany);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCompany
);
// router.delete("/deleteCompany", deleteCompany);
// router.post("/updateCompany", updateCompany);

module.exports = router;
