const express = require("express");
const app = express();
const mongoose = require("mongoose");
// use cors

const cors = require("cors");
require("dotenv").config();
require("./auth/passport-config");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// Lightweight liveness probe for Docker healthchecks and smoke tests.
// Returns 200 regardless of DB state so the container is reported up while
// Mongo is still connecting.
app.get("/health", (req, res) => res.json({ status: "ok", service: "api" }));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log(`API server started on port ${process.env.PORT}`);
});
