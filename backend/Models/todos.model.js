const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;