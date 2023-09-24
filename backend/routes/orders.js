const express = require("express");
const { createOrderById, getAllOrders } = require("../controllers/orders");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
//controllers

const ordersRouter = express.Router();
ordersRouter.post("/:id", authentication, authorization("ADD_ORDER"),createOrderById);
ordersRouter.get("", authentication, getAllOrders);

module.exports = ordersRouter;