const express = require("express");
const { isAuthenticated, isStaff } = require("../../services/auth-service");
const { createNotice, deleteNoticeById, getNotice } = require("./notices.controller");
const uploadFile  = require("../../services/utils-service");

const router = express.Router();

router.post("/notice/create", isAuthenticated, isStaff, uploadFile, createNotice);
router.delete("/notice/delete/:noticeId", isAuthenticated, isStaff, deleteNoticeById);
//TODO PAtch

router.get("/notice", isAuthenticated, getNotice);

module.exports = router;
