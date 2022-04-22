const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const alumniCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
);

const alumniSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your name"]
    },
    company: {
      type: ObjectId,
      ref: "AlumniCompany"
    },
    yearOfPassing: {
      type: String,
      required: [true, "Please provide a user YOP"]
    },
    joined: {
      type: Date,
      required: [true, "Please provide a joining date"]
    },
    experience: {
      type: String,
      required: [true, "Please provide your work experience"]
    },
    linkedin: {
      type: String,
      required: [true, "Please provide a linkedin"]
    },
    number: {
      type: Number,
      required: [true, "Please provide your number"]
    }
  },
  { timestamps: true }
);

const Alumni = mongoose.model("Alumni", alumniSchema);
const AlumniCompany = mongoose.model("AlumniCompany", alumniCompanySchema);

module.exports = { Alumni, AlumniCompany };
