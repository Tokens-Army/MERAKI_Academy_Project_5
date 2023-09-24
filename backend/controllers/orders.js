const { pool } = require("../models/db");

// this function creates an order by id
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

// this function fetches all orders with the services and accessories attached to them
const getAllOrders = (req, res) => {
  const { userId } = req.token;
  pool
    .query(`select O.user_id,S.name AS service_name , S.img AS service_img, S.price AS service_price, A.name AS accessory_name, A.img AS accessory_img, A.price AS accessory_price from orders O inner join services S on O.service_id = S.id inner join order_accessories OA on OA.order_id=O.id
    inner join accessories A on OA.accessories_id=A.id where O.user_id = $1;`, [userId])
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

// this function adds an accessory to order
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

module.exports = {
  createOrderById,
  getAllOrders,
  addAccessoryToOrder,
};
