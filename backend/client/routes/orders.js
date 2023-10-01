const express = require("express");
const {
  createOrderById,
  getAllOrders,
  addAccessoryToOrder,
  updateOrderTime,
  addLocationToOrder,
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
ordersRouter.get("/:order_id", authentication, getAllOrders);

ordersRouter.post("/:order_id/:accessory_id", addAccessoryToOrder);

ordersRouter.put("/update_time/:id", updateOrderTime);

ordersRouter.put("/location/:order_id", addLocationToOrder);

module.exports = ordersRouter;
