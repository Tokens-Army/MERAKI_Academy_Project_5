const express = require("express");
const roles = require("../controllers/orders");
const rolesRouter = express.Router();

//controllers
// create New Role
rolesRouter.post("/", roles.createNewRole);


module.exports = rolesRouter;
