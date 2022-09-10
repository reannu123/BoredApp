const express = require("express");
const authApp = express();
const UsersController = require("../controllers/UsersController");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

authApp.use(express.json());
authApp.post("/login", UsersController.loginUser);
authApp.post("/register", UsersController.registerUser);

authApp.listen(4000, () => console.log("Auth Server Started at 4000"));
