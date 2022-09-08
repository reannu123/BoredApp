const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");
const UsersController = require("../../controllers/UsersController");

router.get("/", UsersController.getUsers);

router.post("/login", UsersController.loginUser);
router.use("/register", require("./register"));

module.exports = router;
