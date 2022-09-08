const express = require("express");
const router = express.Router();
const TasksController = require("../../controllers/TasksController");
const authenticateToken = require("../../auth/authenticate");

router.post("/", authenticateToken, TasksController.addTask);

module.exports = router;
