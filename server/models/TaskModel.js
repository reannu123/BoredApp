const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
