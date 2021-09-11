const MasterBranch = require('./../../models/mastersModel/Branch');

exports.createBranch = async(req, res) => {
    try{
        const branch = await MasterBranch.create(req.body);

        res.status(200).json({
            sucesss: true,
            branch
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getBranch = async(req, res) => {
    try{
        const branch = await MasterBranch.find();
        res.status(200).json({
            sucesss: true,
            branch
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteBranch = async(req, res) => {
    try{
        await MasterBranch.findOneAndDelete(req.body);
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