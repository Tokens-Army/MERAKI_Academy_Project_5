const express = require("express");
const { createOrderById } = require("../controllers/orders");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
//controllers

const ordersRouter = express.Router();
ordersRouter.post("/:id", authentication, authorization("ADD_ORDER"),createOrderById);

module.exports = ordersRouter;