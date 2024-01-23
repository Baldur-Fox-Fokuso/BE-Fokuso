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
      console.log(req.body, "<-- req.body")
      // ambil task name dari req.body
      const { name, description, deadline, subTasks } = req.body;

      // ambil userId dari authorization headers
      const { authorization } = req.headers;
      console.log(authorization, '<== authorization')
      const userId = verifyToken(authorization.split(" ")[1])
      console.log(userId, '<-- userId')
      // TODO: ketika tidak ada, lempar error Unauthorized
      if (!userId) {
        throw { code: 401 };
      }

      // ketika tidak ada name, lempar error Invalid input
      if (!name) {
        throw { code: 400, message: 'Invalid input' };
      }

      const newTask = Task.create(userId, name, undefined, subTasks, description, deadline);

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
            _id: new ObjectId(),
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

  // body: date; params: userId
  static async filterByDate(req, res, next) {
    try {
      const { date } = req.body
      const { userId } = req.params
      console.log('TaskController filterByDate') // start logging
      if (!date) throw { code: 400, message: "Input date is empty" }
      if (!userId) throw { code: 400, message: "userId is empty" }

      const dateYMD = date.split('T')[0];
      console.log(dateYMD, '<-- dateYMD')

      const start = new Date(dateYMD)
      start.setHours(0, 0, 0, 0)
      console.log(start, '<-- start')

      const end = new Date(dateYMD)
      end.setHours(23, 59, 59, 999)
      console.log(end, '<-- end')

      const tasks = await getDb()
        .find({
          createdAt: {
            $gte: start,
            $lt: end
          }
        })
        .toArray()

      res.status(200).json(tasks)

    } catch (error) {
      console.log(error, '<-- Error Task filterByDate')
      next(error)
    }

  }

  // today is friday in California
  // params: userId
  static async getTodayTasks(req, res, next) {
    try {
      const { userId } = req.params

      const start = new Date()
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setHours(23, 59, 59, 999)

      const tasks = await getDb()
        .find({
          userId: new ObjectId(userId),
          createdAt: {
            $gte: start,
            $lt: end
          }
        })
        .toArray()

      res.status(200).json(tasks)

    } catch (error) {
      console.log(error, '<-- error Task getTodayTasks')
    }
  }

  static async last7Days(req, res, next) {
    try {
      const { userId } = req.params
      console.log('TaskController last7Days start')
      const today = new Date()
      const start = today.setDate(today.getDate() - 7)

      const end = new Date()
      end.setHours(23, 59, 59, 999)
      console.log("start:", start, "end:", end)
      const tasks = await getDb()
        .find({
          userId: new ObjectId(userId),
          createdAt: {
            userId: new ObjectId(userId),
            $gte: start,
            $lt: end
          }
        })
        .toArray()

      res.status(200).json(tasks)

    } catch (error) {
      console.log(error, '<-- TaskController last7Days error')
    }
  }

  static async getRecentTasks(req, res, next) {
    try {
      const { userId } = req.params
      const tasks = await getDb()
        .find({
          userId: new ObjectId(userId)
        })
        .sort({
          createdAt: -1
        })
        .toArray()

      // limit to first 5 tasks
      const tasksRet = tasks.slice(0, 5)

      res.status(200).json(tasksRet)

    } catch (error) {
      console.log(error, '<-- TaskController getRecentTasks Error')
    }
  }
}

module.exports = TaskController;
