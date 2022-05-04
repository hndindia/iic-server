const jwt = require("jsonwebtoken");
const User = require("../api/user/user.schema");
const { config } = require("../config");

exports.isAuthenticated = async (req, res, next) => {
  let token;

  if (req.headers.authorization) token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  // console.log("TOKEN -", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Sign in first *facepalms"
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_key);

    const user = await User.findById(decoded.userId);

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

exports.isStaff = (req, res, next) => {
  if (req.user.role === 1 || req.user.role === 2) next();

  return res.status(401).json({
    success: false,
    error: "Not authorized to access this route"
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 2) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route"
    });
  }

  next();
};
