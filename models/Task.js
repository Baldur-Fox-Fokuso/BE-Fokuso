const { ObjectId } = require("mongodb");

class Task {
  // constructor(
  //   userId,
  //   name,
  //   sessions = [],
  //   subtasks = [],
  //   description,
  //   deadline,
  // ) {
  //   this.userId = new ObjectId(userId)
  //   this.name = name
  //   this.sessions = sessions
  //   this.subtasks = subtasks
  //   this.description = description
  //   this.createdAt = new Date()
  //   this.updatedAt = new Date()
  //   this.deadline = deadline
  // }

  static create(
    userId,
    name,
    sessions = [],
    subTasks = [],
    description,
    deadline,
    isDone = false
  ) {
    let arr = [];
    subTasks.forEach((el) => {
      arr.push({
        name: el,
        isDone: false,
      });
    });
    subTasks = arr;

    return {
      userId: new ObjectId(userId._id),
      name,
      sessions,
      subTasks,
      description,
      deadline,
      isDone,
      createdAt: new Date(),
    };
  }
}

// class SubTask {
//   constructor(taskId, name, isDone = false) {
//     this.taskId = taskId;
//     this.name = name;
//     this.isDone = isDone;
//   }

//   static create(taskId, name, isDone = false) {
//     return { taskId, name, isDone };
//   }
// }

module.exports = Task;
