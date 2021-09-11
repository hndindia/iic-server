const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({

    stateName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('masterState', stateSchema);