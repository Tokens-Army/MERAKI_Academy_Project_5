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

const addAccessoryToOrder = async (req, res) => {
  try {
    const { order_id, accessory_id } = req.params;
    const values = [order_id, accessory_id];
    const query =
      "INSERT INTO order_accessories (order_id, accessories_id) values ($1, $2) RETURNING *;";
    const result = await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: `accessory added successfully to the order`,
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const updateOrderTime = (req, res) => {
  const {id} = req.params;
  const {scheduled_time} = req.body;
  pool.query(`UPDATE orders SET scheduled_time = COALESCE($1,scheduled_time) WHERE id = $2 RETURNING *`, [scheduled_time, id]).then((result) => {
    res.status(201).json({
      success: true,
      message: `Order with id ${id} is updated successfully`,
      order: result.rows
    });
  }).catch((err) => {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  });
};

module.exports = {
  createOrderById,
  getAllOrders,
  addAccessoryToOrder,
  updateOrderTime
};
