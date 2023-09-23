const express = require("express");

//controllers
const {
    createNewService,
    getAllServices,
    updateServiceById,

} = require("../controllers/services");

const servicesRouter = express.Router();

// services router endpoints
// http://localhost:5000/services
servicesRouter.post("", createNewService);
servicesRouter.get("", getAllServices);
servicesRouter.put("/:id", updateServiceById);

module.exports = servicesRouter;