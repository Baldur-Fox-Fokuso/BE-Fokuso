const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const UserController = require("./controller/user");
const ErrorHandler = require("./helpers/error-handler");
const TaskController = require("./controller/taks");
const SessionController = require("./controller/session");
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/login', UserController.login);
app.post('/register', UserController.register);
app.get('/user/:userId', UserController.getById);
app.get('/user/:userId/task', TaskController.getByUser);
app.get('/user/:userId/task/filterByDate', TaskController.filterByDate)
app.get('/user/:userId/task/today', TaskController.getTodayTasks)
app.get('/user/:userId/task/recent', TaskController.getRecentTasks)
app.post('/task', TaskController.create);
app.get('/task/:taskId', TaskController.getById);
app.get('/task/:taskId/session', SessionController.getByTaskId);
app.post('/task/:taskId/session', SessionController.create);
app.patch('/task/:taskId/session/:sessionId', SessionController.isDone);
app.get('/task/:taskId/session/:sessionId', SessionController.getById);
// app.get('/task/:taskId/session/:sessionId/done', SessionController.isDone);

// error helper
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Reading server at:${PORT}`);
});

module.exports = app;
