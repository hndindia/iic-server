const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({

    division: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('masterDivision', divisionSchema);