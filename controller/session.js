const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongodb");

function getDb() {
  return getCollection("tasks");
}

class SessionConstrctor {
  // static getDb() {
  //   return getCollection("session");
  // }

  static async create(req, res, next) {
    try {
      const { taskId, name, duration } = req.body
      // validate variables in req.body

      await getDb().insertOne(data);
      res.status(201).json({
        message: "Session created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getById(_id) {
    try {
      const session = await getDb.findOne({ _id });
      res.status(200).json(session);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getByTaksId(taskId) {
    try {
      const sessions = await getDb
        .find({ taskId: new ObjectId(taskId) })
        .toArray();

      res.status(200).json(sessions);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async isDone(_id) {
    try {
      const session = await getDb().findOne({ _id });
      if (!session) {
        throw { name: "not_found" };
      }
      await getDb().updateOne({ _id }, { $set: { isDone: true } });
      res.status(201).json({
        message: "Session is done",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SessionConstrctor;
