const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");
const UsersController = require("../../controllers/UsersController");

router.get("/", UsersController.getUsers);

router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/logout", require("./logout"));

module.exports = router;
