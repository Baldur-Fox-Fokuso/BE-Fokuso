const { ObjectId } = require("mongodb")

class Task {
  constructor(
    userId,
    name,
    sessions = [],
    subtasks = [],
    description,
    deadline,
  ) {
    this.userId = new ObjectId(userId)
    this.name = name
    this.sessions = sessions
    this.subtasks = subtasks
    this.description = description
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.deadline = deadline
  }

  static create(
    userId,
    name,
    sessions = [],
    subtasks = [],
    description,
    deadline,
  ) {
    return { userId, name, sessions, subtasks, description, deadline }
  }
}

class SubTask {
  constructor(
    taskId,
    name,
    isDone = false
  ) {
    this.taskId = taskId
    this.name = name
    this.isDone = isDone
  }

  static create(
    taskId,
    name,
    isDone = false
  ) {
    return { taskId, name, isDone }
  }
}

module.exports = Task, SubTask
