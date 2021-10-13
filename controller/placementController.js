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