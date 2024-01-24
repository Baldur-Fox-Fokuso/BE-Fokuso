const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongodb");
// const isValidObjectId = require("../helpers/validate-objectid");

function getDb() {
  return getCollection("tasks");
}

class SessionController {
  // static getDb() {
  //   return getCollection("session");
  // }

  // TODO:
  // input params: taskId, body: name, duration
  static async create(req, res, next) {
    try {
      const { taskId, } = req.params;
      // console.log(taskId, "<-- taskId in create Session")
      // const { name, duration } = req.body;
      // validate variables in req.body

      const sessionId = new ObjectId()

      const filter = { _id: new ObjectId(taskId) }
      const update = {
        $push: {
          sessions: {
            _id: sessionId,
            taskId: new ObjectId(taskId),
            // name,
            duration: 1500,
            isDone: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      }
      const updateResult = await getDb().updateOne(filter, update)
      console.log(updateResult, '<-- updateResult in create session')

      res.status(201).json({
        message: "Session created successfully",
        data: updateResult,
        sessionId
      });
    } catch (error) {
      // TODO: scenario if error
      // console.log(error, '<-- Error create session');
      // next(error);
    }
  }

  // TODO:
  // input params: taskId, sessionId
  // static async getById(req, res, next) {
  //   try {
  //     // get taskId and sessionId from request params
  //     const { taskId, sessionId } = req.params;
  //
  //     // get task with taskId
  //     const task = await getDb().findOne({ _id: new ObjectId(taskId) });
  //
  //     // make ObjectId for _id of session
  //     const sessionIdObj = new ObjectId(sessionId);
  //
  //     // find Session inside of Task
  //     const session = task.sessions.find(el => {
  //       return el._id == sessionIdObj
  //     });
  //
  //     // if that Session exists, send in Response, else 404
  //     if (session) {
  //       res.status(200).json(session);
  //     } else {
  //       throw { code: 404 };
  //     }
  //
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }

  // TODO:
  // input params: taskId
  static async getByTaskId(req, res, next) {
    try {
      // get taskId from request params
      const { taskId } = req.params;

      // isValidObjectId(taskId)

      // get task with taskId
      const task = await getDb().findOne({ _id: new ObjectId(taskId) });

      if (!task) {
        throw { code: 404 }
      }

      // get the sessions
      const sessions = task.sessions;

      res.status(200).json(sessions);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // TODO: sessionId jadi ambil index saja
  // input params: taskId, sessionId
  static async isDone(req, res, next) {
    try {
      // get taskId and sessionId from request params
      const { taskId, sessionId } = req.params;

      const updateResult = await getDb().updateOne({
        "_id": new ObjectId(taskId)
      },
        {
          $set: {
            "sessions.$[s].isDone": true
          }
        },
        {
          "multi": false,
          "upsert": false,
          arrayFilters: [
            {
              "s._id": {
                "$eq": new ObjectId(sessionId)
              }
            }
          ]
        })

      res.status(200).json({
        success: true,
        updateResult,
        message: "Session has been updated to Done"
      })

      // const sessionIdNum = +sessionId
      // const update = {
      //   sessions[sessionId]: {
      //     isDone: true
      //   }
      // }

      // find Session inside of Task
      // const session = task.sessions.find(el => {
      //   return el._id == sessionIdObj
      // });


      // session.isDone = true

      // old codes ============
      // const session = await getDb().findOne({ _id });
      // if (!session) {
      //   throw { name: "not_found" };
      // }
      // await getDb().updateOne({ _id }, { $set: { isDone: true } });
      // res.status(201).json({
      //   message: "Session is done",
      // });
    } catch (error) {
      // console.log(error);
      // next(error);
    }
  }
}

module.exports = SessionController;
