const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Remove user from session");
});

module.exports = router;
