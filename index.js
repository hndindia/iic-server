const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const viewMasterRoutes = require('./routes/viewMasterRoutes');
const superAdminMasterRoutes = require('./routes/superAdminMasterRoutes');
const superAdminAuthRoutes = require('./routes/superAdminAuthRoutes');
const placementRoutes = require('./routes/placementRoutes');
const studentRoutes  =require('./routes/studentRoutes');
const alumniRoutes = require('./routes/alumniRoutes');

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/viewMasters", viewMasterRoutes);
app.use("/api/v1/adminMasters", superAdminMasterRoutes);
app.use("/api/v1/superAdmin/auth", superAdminAuthRoutes);
app.use("/api/v1/student/auth", studentRoutes);
app.use("/api/v1/placememt/", placementRoutes);
app.use("/api/v1/alumni/", alumniRoutes);

app.get("/api/v1", (req, res) => res.send("The IIC server is running🚀"));

module.exports = app;