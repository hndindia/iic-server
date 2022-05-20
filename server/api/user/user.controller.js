const User = require("../user/user.schema");
const Branch = require("./master/user.branch.schema");
const Semester = require("./master/user.semester.schema");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email already exists",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  // console.log("🔥 -> ", req.body);
  const { email, password } = req.body;
  console.log("Email - ", email, "Password - ", password);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "The email and password field is required"
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Student not found"
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Invalid scredentials"
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log("ERROR - ", error);
    res.status(500).json({
      success: false,
      message: "Please enter correct email and password",
      error
    });
  }
};

exports.isLoggedIn = (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are logged in"
  });
};

exports.getUserById = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

exports.updateStudent = async (req, res) => {

  //Only updating skills / work experience 
  // userData : {skills: []} or
  // userData : {work_experience: []} 
  
  const { userData } = req.body;
  console.log("user D - ", req.user.skills.length + userData.skills.length);

  if((req.user.skills.length + userData.skills.length) > 15){
    return res.status(500).json({
      success:false,
      message:"Cannot add more than 15 skills."
    });
  }

  try {
    const dbRes = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: userData },
      { new: true }
    );
    console.log("DN RES ", dbRes);

    res.status(200).json({
      success: true,
      data: dbRes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.deleteStudentData = async (req, res) => {
  try {
    //For now we will only allow students to delete skills and work_experience
    //Query - ?skill_index=3 or ?work_index=3

    if(Object.keys(req.query).length === 0){
      return res.status(500).json({
        success:false,
        message:"Provide a query"
      });
    }

    if(req.query.skill_index){
      
      req.user.skills.splice(req.query.skill_index,1);
      
      await req.user.save();

      res.status(200).json({
        success:true,
        skills:req.user.skills
      });
    }
    //TODO update work experience


  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);

    res.status(200).json({
      success: true,
      branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.getAllBranch = async (req, res) => {
  try {
    const branches = await Branch.find();

    if (!branches) {
      return res.status(404).json({
        success: false,
        error: "No branches found"
      });
    }

    res.status(200).json({
      success: true,
      total_branches: branches.length,
      branches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.createSemester = async (req, res) => {
  try {
    const semester = await Semester.create(req.body);

    res.status(200).json({
      success: true,
      semester
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.getAllSemester = async (req, res) => {
  try {
    const semester = await Semester.find();

    if (!semester) {
      return res.status(404).json({
        success: false,
        error: "No branches found"
      });
    }

    res.status(200).json({
      success: true,
      total_semester: semester.length,
      semester
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  res.status(statusCode).json({
    success: true,
    token: token
  });
};
