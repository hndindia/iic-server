const multer = require("multer");

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "application/pdf"
  ) {
    cb(null, true);
  } else {
    console.log(122);
    return cb(new Error("Only .png, .jpg, .jpeg and .pdf format allowed!"));
    //   return cb();
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024*1024 },
  fileFilter: multerFilter
}).single("file");

function uploadFile (req, res, next)  {
  upload(req, res, function (err) {
    req.uploadError = err;
    next();
  });
}

module.exports = uploadFile;
