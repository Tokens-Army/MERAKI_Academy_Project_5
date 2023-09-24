const express = require("express");
const { createOrderById } = require("../controllers/orders");
const authentication = require("../middlewares/authentication");
//controllers


const ordersRouter = express.Router();
ordersRouter.post("/:id", authentication, createOrderById);

module.exports = ordersRouter;