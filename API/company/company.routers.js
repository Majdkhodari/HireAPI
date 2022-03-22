const express = require("express");
const {
  fetchCompanies,
  fetchCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("./company.controllers");

const router = express.Router();

router.get("/", fetchCompanies);
// router.get("/", fetchCompany);
// router.post("/createCompany", createCompany);
// router.delete("/deleteCompany", deleteCompany);
// router.post("/updateCompany", updateCompany);

module.exports = router;
