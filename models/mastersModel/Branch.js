const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({

    branchName: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('masterBranch', branchSchema);