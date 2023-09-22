const express = require("express");

//controllers
const {
    createNewService,
    getAllServices,

} = require("../controllers/services");

const servicesRouter = express.Router();

// services router endpoints
servicesRouter.post("", createNewService);
servicesRouter.get("", getAllServices);

module.exports = servicesRouter;