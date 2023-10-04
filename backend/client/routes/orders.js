const express = require("express");
const {
  createOrderById,
  getMyOrders,
  addAccessoryToOrder,
  updateOrderTime,
  deleteOrderById,
  addLocationToOrder,
  getAllOrders,
  getAllEmployees,
  addEmployeeToOrder,
  countPendingOrders
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
ordersRouter.get("/",getAllOrders)

ordersRouter.get("/:order_id", authentication, getMyOrders);

ordersRouter.post("/:order_id/:accessory_id", addAccessoryToOrder);

ordersRouter.put("/update_time/:id", updateOrderTime);

ordersRouter.delete("/:orderId", deleteOrderById);

ordersRouter.put("/location/:order_id", addLocationToOrder);

ordersRouter.get("/employees/employees",getAllEmployees)

ordersRouter.put("/addemployees/:id/:employee_id/",addEmployeeToOrder)

ordersRouter.get("/pendingorders/count",countPendingOrders)
module.exports = ordersRouter;
