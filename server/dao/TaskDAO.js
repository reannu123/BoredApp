const TaskModel = require("../models/TaskModel");

class TaskDAO {
  static async addTask(username, password, task) {
    const task = new TaskModel({ username, password, task });
    return user.save();
  }
}

module.exports = TaskDAO;
