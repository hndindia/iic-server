const express = require("express");

const {getBranch} = require('../controller/masterController/branchController');
const {getDivision} = require('../controller/masterController/divisionController');
const {getSemester} = require('../controller/masterController/semesterController');
const {getState} = require('../controller/masterController/stateController');

const router = express.Router();

router.get("/branch", getBranch);
router.get("/division", getDivision);
router.get("/semester", getSemester);
router.get("/state", getState);

module.exports = router;
