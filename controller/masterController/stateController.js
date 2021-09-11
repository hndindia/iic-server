const State = require('./../../models/mastersModel/State');

exports.createState = async(req, res) => {
    try{
        const state = await State.create(req.body);

        res.status(200).json({
            sucesss: true,
            state
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getState = async(req, res) => {
    try{
        const state = await State.find();
        res.status(200).json({
            sucesss: true,
            state
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteState = async(req, res) => {
    try{
        await State.findOneAndDelete(req.body);
        res.status(200).json({
            sucesss: true,
            message: "deleted succesfully"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}