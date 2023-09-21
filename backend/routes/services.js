const express = require("express");

//controllers
const {
    createNewService,

} = require("../controllers/services");

const servicesRouter = express.Router();

// services router endpoints
servicesRouter.post("", createNewService);

module.exports = servicesRouter;