const express = require("express");

const {register, login, getUserById} = require('../controller/studentController');
const { authenticateStudent } = require("../middleware/studentAuthMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/user", authenticateStudent, getUserById);

module.exports = router;