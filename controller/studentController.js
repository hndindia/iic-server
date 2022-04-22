const Student = require("../models/StudentModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await Student.create(req.body);
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email already exists",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  // console.log("🔥 -> ", req.body);
  const { email, password } = req.body;
  console.log("Email - ", email, "Password - ", password);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "The email and password field is required"
    });
    return;
  }

  try {
    const user = await Student.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Student not found"
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Invalid scredentials"
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log("ERROR - ", error);
    res.status(500).json({
      success: false,
      message: "Please enter correct email and password",
      error
    });
  }
};

exports.getUserById = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  res.status(statusCode).json({
    success: true,
    token: token
  });
};
