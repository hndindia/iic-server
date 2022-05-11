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
    drive_id:String,
    file_name:String,
    mime_type:String,
    view_link:String,
    thumbnail_link:String
  },  
  {timestamps: true}
);

module.exports = mongoose.model("Notice", noticesSchema);
