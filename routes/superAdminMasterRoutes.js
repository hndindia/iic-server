const express = require("express");

const {authenticateSuperAdmin} = require('../middleware/authMiddleware');
const {createBranch, deleteBranch} = require('../controller/masterController/branchController');
const {createDivision, deleteDivision} = require('../controller/masterController/divisionController');
const {createSemester, deleteSemester} = require('../controller/masterController/semesterController');
const {createState, deleteState} = require('../controller/masterController/stateController');

const router = express.Router();

router.post("/branch", authenticateSuperAdmin, createBranch);
router.post("/division", authenticateSuperAdmin, createDivision);
router.post("/semester", authenticateSuperAdmin, createSemester);
router.post("/state", authenticateSuperAdmin, createState);


router.delete("/branch", authenticateSuperAdmin, deleteBranch);
router.delete("/division", authenticateSuperAdmin, deleteDivision);
router.delete("/semester", authenticateSuperAdmin, deleteSemester);
router.delete("/state", authenticateSuperAdmin, deleteState);

module.exports = router;
