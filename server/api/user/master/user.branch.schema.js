const mongoose = require("mongoose");

const userBranchSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Please provide a branch"]
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Branch", userBranchSchema);
