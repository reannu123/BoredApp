const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Add task to database for user");
});

module.exports = router;
