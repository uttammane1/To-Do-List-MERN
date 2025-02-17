import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("YOUR_BACKEND_URL/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async (title) => {
    try {
      const res = await axios.post(
        "YOUR_BACKEND_URL/todos",
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
