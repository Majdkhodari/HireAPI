const express = require("express");
const {
  fetchCompanies,
  fetchCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("./company.controllers");

const router = express.Router();

router.get("/users", fetchCompanies);
router.get("/fetchCompany", fetchCompany);
router.post("/createCompany", createCompany);
router.delete("/deleteCompany", deleteCompany);
router.post("/updateCompany", updateCompany);

module.exports = router;
