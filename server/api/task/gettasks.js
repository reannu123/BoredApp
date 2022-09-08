const express = require("express");
const router = express.Router();
const TasksController = require("../../controllers/TasksController");
const authenticateToken = require("../../auth/authenticate");

router.get("/", TasksController.getTasks);
router.get("/mine", authenticateToken, TasksController.getTasks);

module.exports = router;
