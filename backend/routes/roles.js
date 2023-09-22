const express = require("express");
const roles = require("../controllers/roles");
const rolesRouter = express.Router();

//controllers
// create New Role
rolesRouter.post("/", roles.createNewRole);

// create New permission
rolesRouter.post("/permission", roles.createNewPermission);

module.exports = rolesRouter;
