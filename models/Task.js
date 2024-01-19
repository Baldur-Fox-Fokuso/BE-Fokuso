class Task {
  constructor(userId, name, sessions = []) {
    this.userId = userId
    this.name = name
    this.sessions = sessions
  }
}

module.exports = Task
