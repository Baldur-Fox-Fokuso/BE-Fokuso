class Task {
  constructor(
    userId,
    name,
    sessions = [],
    subtasks = []
  ) {
    this.userId = userId
    this.name = name
    this.sessions = sessions
    this.subtasks = subtasks
  }

  static create(
    userId,
    name,
    sessions = [],
    subtasks = []
  ) {
    return new Task(userId, name, sessions, subtasks)
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
    isDone
  ) {
    return new SubTask(taskId, name, isDone)
  }
}

module.exports = Task
