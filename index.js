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

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/viewMasters", viewMasterRoutes);
app.use("/api/v1/adminMasters", superAdminMasterRoutes);
app.use("/api/v1/superAdmin/auth", superAdminAuthRoutes);
app.use("/api/v1/student/auth", studentRoutes);
app.use("/api/v1/placememt/", placementRoutes);

app.get("/", (req, res) => res.send("The college app server is running🚀"));

module.exports = app;