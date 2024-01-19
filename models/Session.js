class Session {
  constructor(
    taskId,
    name,
    isDone = false,
    duration,
    createdAt = new Date(),
    updatedAt = new Date()
  ) {
    this.taskId = taskId
    this.name = name
    this.duration = duration
    this.isDone = isDone
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

}

module.exports = Session
