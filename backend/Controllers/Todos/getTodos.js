const TodoModel = require("../../Models/todos.model");

const getTodos = async (req, res) => {
  const { username, userId } = req.body;
  try {
    const todos = await TodoModel.find({ username, userId });
    return res.status(200).json({ data: todos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getTodos;