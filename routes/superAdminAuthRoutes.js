const express = require("express");

const {register, login} = require('../controller/superAdminController');

const router = express.Router();

router.post("/register", register);
router.get("/login", login);

module.exports = router;