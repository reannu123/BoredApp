const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("delete the task");
});

module.exports = router;
