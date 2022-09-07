const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");
const UsersController = require("../../controllers/UsersController");

router.get("/", (req, res) => {
  res.send("Make new user");
});
router.post("/", UsersController.registerUser);

module.exports = router;
