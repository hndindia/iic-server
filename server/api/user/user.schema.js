const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your name"]
    },
    email: {
      type: String,
      required: [true, "Please provide a user email"],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email"
      ]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false
    },
    institute: {
      type: String,
      required: [true, "Please provide a institute name"]
    },
    course:String,
    yop: Number,
    branch: {
      type: ObjectId,
      ref: "Branch"
    },
    semester: {
      type: ObjectId,
      ref: "Semester"
    },
    section: {
      type: String
    },
    percent10: {
      type: Number,
      min: 0,
      max: 100
    },
    percent12: {
      type: Number,
      min: 0,
      max: 100
    },
    currentAggregate: {
      type: Number,
      min: 0,
      max: 100
    },
    skills: [
      {
        type: String
      }
    ],
    work_experience: [
      {
        company_name:String,
        start_date:String,
        end_date:String,
        position:String
      }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    //0 - student, 1 - Staff, 2 - Admin
    role: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log("ERROR 🤚 - ", err);
  }

  next();
});

userSchema.methods.matchPasswords = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
