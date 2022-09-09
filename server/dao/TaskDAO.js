const TaskModel = require("../models/TaskModel");

class TaskDAO {
  static async addTask(username, task) {
    const newtask = new TaskModel({ username, task });
    return newtask.save();
  }

  static async deleteTask(id) {
    console.log(id);
    return TaskModel.findByIdAndDelete(id);
  }

  static async getTasks(username = null) {
    if (username) {
      return TaskModel.find({ username });
    }
    return TaskModel.find();
  }
}

module.exports = TaskDAO;
