const Semester = require('./../../models/mastersModel/Semester');

exports.createSemester = async(req, res) => {
    try{
        const semester = await Semester.create(req.body);

        res.status(200).json({
            sucesss: true,
            semester
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getSemester = async(req, res) => {
    try{
        const semester = await Semester.find();
        res.status(200).json({
            sucesss: true,
            semester
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteSemester = async(req, res) => {
    try{
        await Semester.findOneAndDelete(req.body);
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