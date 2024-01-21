const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const UserController = require("./controller/user");
const ErrorHandler = require("./helpers/error-handler")
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/login', UserController.login)
app.post('/register', UserController.register)

// error helper
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Reading server at:${PORT}`);
});

module.exports = app;
