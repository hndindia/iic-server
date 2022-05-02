const mongoose = require("mongoose");

const userSemSchema = new mongoose.Schema(
  {
    value:{
      type: Number,
      required: [true, "Please provide a Semester"]
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Semester", userSemSchema);
