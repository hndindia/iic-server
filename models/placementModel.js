const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please provide company name"]
        },
        position: {
            type: String,
            required: [true, "Please provide a position"],
            
        },
        eligibility: {
            type: String,
            // required: [true, "Please provide a eligibility"],
        },
        instruction: {
            type: String,
            // required: [true, "Please provide a institute name"],
        },
        link: {
            type: String,
            // required: [true, "Please provide a institute name"],
        },
        package: {
            type: String,
            // required: [true, "Please provide a institute name"],
        },
        lastDate: {
            type: Date,
        },
        pollBool: {
            type: Boolean,
            default: true
        },
        users: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Student'
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
