const TaskDao = require("../dao/TaskDAO");

class TasksController {
  static async getTasks(req, res, next) {
    try {
      const tasks = await TaskDao.getTasks(req.user);
      tasks.length > 0 ? res.send(tasks) : res.json("No Tasks Found");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addTask(req, res, next) {
    try {
      const { username, task } = req.body;
      const newTask = await TaskDao.addTask(req.user, task);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.body;
      const deletedTask = await TaskDao.deleteTask(id);
      res.status(201).json(deletedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = TasksController;
