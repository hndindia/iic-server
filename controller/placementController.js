const Placement = require("../models/placementModel");

exports.createPlacement = async(req, res) => {
    try{
        const placement = await Placement.create(req.body);

        res.status(200).json({
            sucesss: true,
            placement
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.addStudentResponse = async(req, res) => {
    try{
        const placement = await Placement.updateOne(
            { _id: req.placementId },
            { $push: {users: req.user._id} },
            {
                new: true
            }
        );
        res.status(200).json({
            sucesss: true,
            placement
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.getStudentResponse = async(req, res) => {
    try{
        const placement = await Placement.findById(req.placementId).populate({path: 'users'});
        res.status(200).json({
            sucesss: true,
            placement
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
exports.getAllPlacement = async(req, res) => {
    try{
        const placement = await Placement.find();
        res.status(200).json({
            sucesss: true,
            placement
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}