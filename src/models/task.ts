import { ObjectId } from "mongodb";
import { getCollection } from "../config/mongodb";
import { Task } from "../type/type";

class TaskModel {
  static getDb() {
    return getCollection("taks");
  }

  static async create(data: Task) {
    const result = await this.getDb().insertOne(data);
    return result;
  }

  static async getById(_id: string) {
    const task = (await this.getDb().findOne({
      _id: new ObjectId(_id),
    })) as Task;
    return task;
  }

  static async getByUser(userId: string) {
    const tasks = (await this.getDb()
      .find({ userId: new ObjectId(userId) })
      .toArray()) as Task[];
    return tasks;
  }
}

export default TaskModel;
