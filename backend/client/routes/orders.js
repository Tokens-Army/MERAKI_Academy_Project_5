const express = require("express");
const {
  createOrderById,
  getAllOrders,
  addAccessoryToOrder,
  updateOrderTime,
} = require("../controllers/orders");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
//controllers

const ordersRouter = express.Router();
ordersRouter.post(
  "/:id",
  authentication,
  authorization("ADD_ORDER"),
  createOrderById
);
ordersRouter.get("", authentication, getAllOrders);

ordersRouter.post("/:order_id/:accessory_id", addAccessoryToOrder);

ordersRouter.put("/update_time/:id", updateOrderTime);

module.exports = ordersRouter;
