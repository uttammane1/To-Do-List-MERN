const cors = require("cors")
const express = require("express");
const connectDb = require("./config/db");
const usersRoutes = require("./Routers/users.routes");
const todoRoutes = require("./Routers/todos.routes");
require("dotenv").config();

const PORT = process.env.PORT;


const app = express();
app.use(cors())
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
  res.json({ msg: "Server is healthy" });
});

app.listen(PORT ,async() => {
  try {
    await connectDb
    console.log(`Server is running on ${PORT} and db is connected`);
  } catch (error) {
    console.log(error.message);
  }
});