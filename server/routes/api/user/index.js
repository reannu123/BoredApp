const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(["login", "register", "logout"]);
});

router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/logout", require("./logout"));

module.exports = router;
