const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const noticesSchema = new mongoose.Schema(
  {
    semester:{
      type:ObjectId,
      ref:"Semester"
    },
    branch:{
      type:ObjectId,
      ref:"Branch"
    },
    notice_drive_id:String,
    notice_drive_name:String,
    notice_drive_mimeType:String,
    notice_drive_view_link:String
  },  
  {timestamps: true}
);

module.exports = mongoose.model("Notice", noticesSchema);
