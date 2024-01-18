const { ObjectId } = require("mongodb");
const { getCollection } = require("mongodb");

class TaskModel {
  static getDb() {
    return getCollection("taks");
  }

  static async create(res, req, next) {
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

  static async getById(res, req) {
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

  static async getByUser(res, req, next) {
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

export default TaskModel;
