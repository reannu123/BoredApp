const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(["user", "task"]);
});
router.use("/task", require("./task"));
router.use("/user", require("./user"));

module.exports = router;
