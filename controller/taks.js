const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongodb");
const { verifyToken } = require("../helpers/jwt");
const Task = require("../models/Task");
function getDb() {
  return getCollection("tasks");
}

class TaskController {
  // static getDb() {
  //   return getCollection("tasks");
  // }

  static async create(req, res, next) {
    try {
      // ambil task name dari req.body
      const { name, description, deadline } = req.body;

      // ambil userId dari authorization headers
      const { authorization } = req.headers;
      const userId = verifyToken(authorization.split(" ")[1])
      // TODO: ketika tidak ada, lempar error Unauthorized
      if (!userId) {
        throw { code: 401 };
      }

      // ketika tidak ada name, lempar error Invalid input
      if (!name) {
        throw { code: 400, message: 'Invalid input' };
      }

      const newTask = Task.create(userId, name, undefined, undefined, description, deadline);

      const result = await getCollection("tasks").insertOne(newTask);

      res.status(200).json({
        message: "Task created successfully",
      });
    } catch (error) {
      console.log(error, '<-- Task Create Error');
      next(error);
    }
  }

  static async getById(req, res) {
    try {
      const { taskId } = req.params;
      if (!taskId) {
        throw { code: 400, message: 'Invalid input' };
      }

      const task = await getCollection("tasks").findOne({
        _id: new ObjectId(taskId),
      });

      res.status(200).json(task);
    } catch (error) {
      console.log(error, '<-- Task getById error');
      next(error);
    }
  }

  static async getByUser(req, res, next) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw { code: 400, message: 'Invalid input' };
      }

      const tasks = await getCollection("tasks")
        .find({ userId: new ObjectId(userId) })
        .toArray();

      res.status(200).json(tasks);
    } catch (error) {
      console.log(error, '<-- Task getByUser error');
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { taskId } = req.body;
      const deleteResult = await getDb().deleteOne({
        _id: new ObjectId(taskId)
      });

      res.status(200).json(deleteResult);

    } catch (error) {
      console.log(error, '<-- deleteTask error');
    }
  }

  static async createSubTask(req, res, next) {
    try {
      // get name from req.body
      const { name, taskId } = req.body;
      // throw error when name does not exist
      if (!name || !taskId) {
        throw { code: 400, message: 'Invalid input' };
      }

      const filter = { taskId: new ObjectId(taskId) };
      const update = {
        $push: {
          subtasks: {
            taskId: new ObjectId(taskId),
            name,
            isDone: false
          }
        }
      };
      const newSubTask = await getDb().updateOne(
        filter,
        update
      );
      res.status(200).json(newSubTask);

    } catch (error) {
      console.log(error, '<-- createSubTask error');
      next(error);

    }
  }

  static async deleteSubTask(req, res, next) {
    try {
      // get taskId and subTaskId from req.body
      const { taskId, subTaskId } = req.body;
      // throw error when taskId or subTaskId does not exits
      if (!taskId || !subTaskId) {
        // throw error
        throw { code: 400, message: 'Invalid input' };
      }

      const filter = { taskId: new ObjectId(taskId) };
      const update = {
        $pull: {
          subtasks: {
            _id: new ObjectId(subTaskId)
          }
        }
      };
      // deleteResult by deleting the embedded document in array
      const deleteResult = await getDb().updateOne(filter, update);

      res.status(200).json(deleteResult);
    } catch (error) {
      console.log(error, '<-- deleteSubTask error');
    }
  }
}

module.exports = TaskController;
