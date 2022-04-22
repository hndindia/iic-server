const { Alumni, AlumniCompany } = require("./alumni.schema");

exports.createAlumni = async (req, res) => {
  try {
    const data = await Alumni.create(req.body);

    res.status(200).json({
      success: true,
      message: "Alumni created"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.createAlumniCompany = async (req, res) => {
  try {
    const data = await AlumniCompany.create(req.body);

    res.status(200).json({
      success: true,
      message: "Company created"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllCompany = async (req, res) => {
  try {
    const data = await AlumniCompany.find();

    res.status(200).json({
      success: true,
      total_count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAlumniByCompanyID = async (req, res) => {
  try {
    const data = await Alumni.find({ company: req.query.company_id }).populate("company");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found."
      });
    }

    res.status(200).json({
      success: true,
      length: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
