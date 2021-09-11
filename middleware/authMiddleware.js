const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/SuperAdminModel");

exports.authenticateSuperAdmin = async (req, res, next) => {
  let token = req.cookies.token;
  console.log("TOKEN - ", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Sign in first *facepalms"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await SuperAdmin.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found with this id"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route"
    });
  }
};