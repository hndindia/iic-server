const SuperAdmin = require("../models/SuperAdminModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await SuperAdmin.create(req.body);
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
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "The email and password field is required"
    });
  }

  try {
    const user = await SuperAdmin.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "SuperAdmin not found"
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({
        success: false,
        error: "Invalid scredentials"
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please enter correct email and password"
    });
  }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    
    res
      .status(statusCode).json({
          token: token,
      });
  };
  