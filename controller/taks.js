const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongodb");
const { verifyToken } = require("../helpers/jwt");
function getDb() {
  return getCollection("tasks");
}

class TaskController {
  // static getDb() {
  //   return getCollection("tasks");
  // }

  static async create(req, res, next) {
    try {
      const { name, } = req.body

      const { authorization } = req.headers
      const userId = verifyToken(authorization.split(" ")[1])

      if (!name || !userId) {
        throw { code: 400, message: 'Invalid input' }
      }

      const result = await getCollection("tasks").insertOne({
        name,
        userId: new ObjectId(userId),
        sessions: []
      });

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
      const { taskId } = req.params
      if (!taskId) {
        throw { code: 400, message: 'Invalid input' }
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
        throw { code: 400, message: 'Invalid input' }
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
}

module.exports = TaskController;
