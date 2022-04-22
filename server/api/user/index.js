const express = require("express");
const { isAuthenticated } = require("../../services/auth-service");
const {register, login, getUserById} = require('./user.controller');

const router = express.Router();

router.post("/student/auth/register", register);
router.post("/student/auth/login", login);
router.get("/student/auth/user", isAuthenticated, getUserById);

module.exports = router;