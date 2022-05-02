const express = require("express");
const { isAuthenticated } = require("../../services/auth-service");
const {register, login, getUserById} = require('./user.controller');

const router = express.Router();

//Auth Routes
router.post("/student/auth/register", register);
router.post("/student/auth/login", login);

//User Routes
router.get("/student/auth/user", isAuthenticated, getUserById);

//Branch Routes

//Semester Routes


module.exports = router;