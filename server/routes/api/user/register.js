const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Make new user");
});

module.exports = router;
