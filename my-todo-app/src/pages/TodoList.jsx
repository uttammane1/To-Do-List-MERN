import { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    status: false,
  });
  const [error, setError] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      const response = await axios.get(
        "https://to-do-list-mern-q28z.onrender.com/todos",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(response.data);
      setError(""); // Clear error on success
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError(
        err.response?.data?.message || "Failed to fetch todos. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add new todo (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://to-do-list-mern-q28z.onrender.com/create/todos",
        newTodo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "", status: false });
      setError(""); // Clear error on success
    } catch (err) {
      console.error("Error creating todo:", err);
      setError(
        err.response?.data?.message || "Failed to create todo. Please try again."
      );
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      {error && <p className="error">{error}</p>}

      {/* Form to Create a New Todo */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="status"
            checked={newTodo.status}
            onChange={handleChange}
          />
          Completed
        </label>
        <button type="submit">Add Todo</button>
      </form>

      {/* Display List of Todos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.status ? "completed" : ""}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>
              <strong>Status:</strong> {todo.status ? "✅ Completed" : "❌ Incomplete"}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {todo.createdAt ? new Date(todo.createdAt).toLocaleString() : "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
