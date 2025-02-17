const TodoModel = require("../../Models/todos.model");

const todoCreate = async (req, res) => {
  const { title, description, status, createdAt, userId, username } = req.body;
  try {
    const newTodo = new TodoModel({
      title,
      description,
      status,
      createdAt,
      userId,
      username,
    });
    await newTodo.save();

    return res.status(201).json({ msg: "new todo created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = todoCreate;