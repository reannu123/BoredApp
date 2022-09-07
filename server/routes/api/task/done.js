const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Mark task as done");
});

module.exports = router;
