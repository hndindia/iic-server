const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("The college app server is running🚀"));

module.exports = app;