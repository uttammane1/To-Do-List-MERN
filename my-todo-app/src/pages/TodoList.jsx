import { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";

const TodoList = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <h2>Todos</h2>
      <input type="text" placeholder="New Todo" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => addTodo(title)}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
