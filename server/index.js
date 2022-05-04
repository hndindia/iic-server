const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const placementRoutes = require("./api/placement/index");
const userRoutes = require("./api/user/index");
const alumniRoutes = require("./api/alumni/index");
const { uploadFileInDrive } = require("./services/google-drive-service");
const {uploadFile} = require("./services/utils-service");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.post("/upload", uploadFile, async (req, res) => {
  const r = await uploadFileInDrive(req.file.originalname, req.file.mimetype, req.file.path);
  res.json({
    r
  });
});

//Routes
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", placementRoutes);
app.use("/api/v1/", alumniRoutes);

app.get("/", (req, res) => res.send("The IIC server is running🚀"));

module.exports = app;
