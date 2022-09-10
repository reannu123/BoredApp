const TaskDao = require("../dao/TaskDAO");

class TasksController {
  static async getTasks(req, res, next) {
    try {
      const tasks = await TaskDao.getTasks(req.username);
      tasks.length > 0 ? res.send(tasks) : res.json("No Tasks Found");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addTask(req, res, next) {
    try {
      const task = req.body.task;
      const newTask = await TaskDao.addTask(req.username, task);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const taskID = req.body._id;
      const username = req.username;
      const deletedTask = await TaskDao.deleteTask(username, taskID);
      if (deletedTask === "Forbidden") {
        res.status(403).json({ message: deletedTask });
      } else if (deletedTask === null) {
        res.status(404).json(deletedTask);
      } else {
        res.status(201).json(deletedTask);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateTaskStatus(req, res, next) {
    try {
      const status = req.body.status;
      const taskID = req.body._id;
      const username = req.username;
      const updatedTask = await TaskDao.updateTask(username, status, taskID);
      res.status(201).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = TasksController;
