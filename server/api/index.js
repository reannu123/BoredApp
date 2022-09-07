const express = require("express");
const router = express.Router();
const MainController = require("../controllers/MainController");

router.get("/", MainController.index);

router.use("/task", require("./task"));
router.use("/user", require("./user"));

module.exports = router;
