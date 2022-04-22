const express = require("express");
const { isAuthenticated } = require("../../services/auth-service");
const router = express.Router();
const {
  createAlumni,
  getAlumniByCompanyID,
  createAlumniCompany,
  getAllCompany
} = require("./alumni.controller");

router.post("/alumni/add/company", isAuthenticated, createAlumniCompany);

//Get company
router.get("/alumni/company", isAuthenticated, getAllCompany);

//Create Alumni
router.post("/alumni/create", isAuthenticated, createAlumni);

//Get All Alumni by company Id
router.get("/alumni", isAuthenticated, getAlumniByCompanyID);

module.exports = router;
