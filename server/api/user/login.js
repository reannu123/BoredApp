const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Log In - check if user exists");
});

module.exports = router;
