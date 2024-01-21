const { ObjectId } = require("mongodb");
const { getCollection } = require("mongodb");

class TaskController {
  static getDb() {
    return getCollection("task");
  }

  static async create(req, res, next) {
    try {
      const result = await this.getDb().insertOne(data);
      res.status(200).json({
        message: "Task created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getById(req, res) {
    try {
      const task = await this.getDb().findOne({
        _id: new ObjectId(_id),
      });
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getByUser(req, res, next) {
    try {
      const { userId } = req.body;
      const tasks = await this.getDb()
        .find({ userId: new ObjectId(userId) })
        .toArray();
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default TaskController;
