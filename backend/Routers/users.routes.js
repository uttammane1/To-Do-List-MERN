const loginUser = require("../Controllers/Users/loginUser");
const registration = require("../Controllers/Users/registration");
const users = require("../Controllers/Users/users");

const usersRoutes = require("express").Router();

usersRoutes.get("/", users);
usersRoutes.post("/register", registration);
usersRoutes.post("/login", loginUser);

module.exports = usersRoutes;