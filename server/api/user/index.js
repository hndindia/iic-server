const express = require("express");
const { isAuthenticated, isAdmin } = require("../../services/auth-service");
const {
  register,
  login,
  getUserById,
  createBranch,
  getAllBranch,
  createSemester,
  getAllSemester
} = require("./user.controller");

const router = express.Router();

//Auth Routes
router.post("/student/auth/register", register);
router.post("/student/auth/login", login);
//TODO create isLoggedIn
//User Routes
router.get("/student/auth/user", isAuthenticated, getUserById);

//Master Routes (Branch and Semester)
router.post("/student/branch", isAuthenticated, isAdmin, createBranch);
router.get("/student/branch", isAuthenticated, getAllBranch);

router.post("/student/semester", isAuthenticated, isAdmin, createSemester);
router.get("/student/semester", isAuthenticated, getAllSemester);

module.exports = router;
