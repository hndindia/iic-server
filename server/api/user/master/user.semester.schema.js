const mongoose = require("mongoose");

const userSemSchema = new mongoose.Schema(
  {
    value:{
      type: String,
      required: [true, "Please provide a Semester"]
    },
    subjects:[
      {
        type: String
      }
    ],
    syllabus_link:String
  },{timestamps: true}
);

module.exports = mongoose.model("Semester", userSemSchema);
