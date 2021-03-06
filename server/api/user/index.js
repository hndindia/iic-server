const express = require("express");
const { isAuthenticated, isAdmin } = require("../../services/auth-service");
const {
  register,
  login,
  getUserById,
  createBranch,
  getAllBranch,
  createSemester,
  getAllSemester,
  isLoggedIn,
  updateStudent,
  deleteStudentData
} = require("./user.controller");

const router = express.Router();

//Auth Routes
router.post("/student/auth/register", register);
router.post("/student/auth/login", login);
// isLoggedIn (Common for both app and adminportal)
router.get("/auth/isloggedin", isAuthenticated, isLoggedIn);

//User Routes
router.get("/student/auth/user", isAuthenticated, getUserById);
router.patch("/student/update", isAuthenticated, updateStudent);
router.delete("/student/delete", isAuthenticated, deleteStudentData);

//Master Routes (Branch and Semester) TODO add Patch and Delete
router.post("/student/branch", isAuthenticated, isAdmin, createBranch);
router.get("/student/branch", isAuthenticated, getAllBranch);

router.post("/student/semester", isAuthenticated, isAdmin, createSemester);
router.get("/student/semester", isAuthenticated, getAllSemester);

module.exports = router;
