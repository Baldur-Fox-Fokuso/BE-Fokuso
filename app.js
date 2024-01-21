require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoString = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes/routes");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Reading server at:${PORT}`);
});

module.exports = app;
