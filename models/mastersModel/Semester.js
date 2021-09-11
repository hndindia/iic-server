const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({

    semester: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('masterSemester', semesterSchema);