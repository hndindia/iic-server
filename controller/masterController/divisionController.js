const Division = require('./../../models/mastersModel/Division');

exports.createDivision = async(req, res) => {
    try{
        const division = await Division.create(req.body);

        res.status(200).json({
            sucesss: true,
            division
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getDivision = async(req, res) => {
    try{
        const division = await Division.find();
        res.status(200).json({
            sucesss: true,
            division
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteDivision = async(req, res) => {
    try{
        await Division.findOneAndDelete(req.body);
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