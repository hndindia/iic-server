const express = require("express");

const {
    createPlacement,
    addStudentResponse,
    getStudentResponse,
    getAllPlacement
} = require("../controller/placementController");
const { authenticateStudent } = require("../middleware/studentAuthMiddleware");
const { authenticateStaff } = require("../middleware/staffAuthMiddleware");

const router = express.Router();

router.post("/getAllPlacement", getAllPlacement);
router.post("/addStudentResponse", authenticateStudent, addStudentResponse);
router.post("/createPlacement", createPlacement);
router.post("/getStudentResponse", getStudentResponse);

module.exports = router;
