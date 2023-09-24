const { pool } = require("../models/db");

const createOrderById = (req, res) => {
  const { id } = req.params;
  const { userId } = req.token;
  pool
    .query(
      `INSERT INTO orders (user_id, service_id, order_status) values ($1, $2, $3) RETURNING *;`,
      [userId, id, "pending"]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Service added successfully`,
        service: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const getAllOrders = (req, res) => {
  const { userId } = req.token;
  pool
    .query(`SELECT * FROM orders where user_id = $1`, [userId])
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }
      res.status(200).json({
        success: true,
        message: "All your orders",
        orders: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = {
  createOrderById,
  getAllOrders,
};
