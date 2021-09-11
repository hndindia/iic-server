require("dotenv").config({ path: "./config.env" });
const app = require("./index.js");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB CONNECTED🎉"))
  .catch((err) => console.log("ERROR🛑 - ", err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server is running 🚀 ${PORT}`));
