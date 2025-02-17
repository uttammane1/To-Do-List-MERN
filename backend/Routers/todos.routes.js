const getTodos = require("../Controllers/Todos/getTodos");
const todoCreate = require("../Controllers/Todos/todoCreate");
const auth = require("../Middlewares/auth");

const todoRoutes = require("express").Router();

todoRoutes.get("/", auth, getTodos);
todoRoutes.post("/create", auth, todoCreate);

module.exports = todoRoutes;