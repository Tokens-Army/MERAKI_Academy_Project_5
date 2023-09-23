const express = require("express");
const users = require("../controllers/users");

//controllers

const usersRouter = express.Router();

// register
// http://localhost:5000/users/register
usersRouter.post("/register", users.register);

module.exports = usersRouter;
