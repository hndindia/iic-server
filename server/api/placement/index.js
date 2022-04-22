const express = require("express");
const { isAuthenticated } = require("../../services/auth-service");
const {
  createPlacement,
  addStudentResponse,
  getStudentResponse,
  getAllPlacement
} = require("./placement.controller");

const router = express.Router();

router.get("/placememt/getAllPlacement", isAuthenticated, getAllPlacement);
router.post("/placememt/addStudentResponse", isAuthenticated, addStudentResponse);
router.post("/placememt/createPlacement", isAuthenticated, createPlacement);
router.post("/placememt/getStudentResponse", isAuthenticated, getStudentResponse);

module.exports = router;
