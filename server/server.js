require("dotenv").config({ path: "./config.env" });
const app = require("./index.js");
const mongoose = require("mongoose");
const { config } = require("./config/index.js");

const DB = config.db_uri.replace("<PASSWORD>", config.db_password);

mongoose
  .connect(DB)
  .then(() => console.log("DB CONNECTED🎉"))
  .catch((err) => console.log("ERROR🛑 - ", err));

app.listen(config.web_port, () => console.log(`server is running 🚀 ${config.web_port}`));
