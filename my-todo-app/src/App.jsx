import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { TodoProvider } from "./context/TodoContext";
// import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";

function App() {
  return (
    // <AuthProvider>
    //   <TodoProvider>
        
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/todos"
                element={
                  
                    <TodoList />
                  
                }
              />
            </Routes>
          </div>
    //   </TodoProvider>
    // </AuthProvider>
  );
}

export default App;


// https://to-do-list-mern-q28z.onrender.com