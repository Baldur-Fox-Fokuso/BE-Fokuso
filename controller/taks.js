const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongodb");

class TaskController {
  static getDb() {
    return getCollection("tasks");
  }

  static async create(req, res, next) {
    try {
      const { name, userId } = req.body
      if (!name || !userId) {
        throw { code: 400, message: 'Invalid input' }
      }

      const result = await getCollection("task").insertOne({
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
      const { taskId } = req.body
      if (!taskId) {
        throw { code: 400, message: 'Invalid input' }
      }

      const task = await getCollection("task").findOne({
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
      const { userId } = req.body;
      if (!userId) {
        throw { code: 400, message: 'Invalid input' }
      }

      const tasks = await getCollection("task")
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
