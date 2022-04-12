const express = require("express");
const router = express.Router();

const {
  createAlumni,
  getAllAlumni,
  createAlumniCompany,
  getAllCompany
} = require("../controller/alumniController");

//Add company TODO -> only admins
router.post("/add/company", createAlumniCompany);

//Get company
router.get("/company", getAllCompany);

//Create Alumni
router.post("/create", createAlumni);
//Get All Alumni by company Id 
router.get("/", getAllAlumni);

module.exports = router;
