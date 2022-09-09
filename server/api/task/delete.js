const express = require("express");
const router = express.Router();
const TasksController = require("../../controllers/TasksController");
const authenticateToken = require("../../auth/authenticate");

router.delete("/", authenticateToken, TasksController.deleteTask);

module.exports = router;
