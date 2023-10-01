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
const getAllOrders = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { userId } = req.token;
    const orders = await pool.query(
      `select O.user_id,S.name AS service_name , S.img AS service_img, S.price AS service_price, O.order_status,O.location ,O.scheduled_time from orders O inner join services S on O.service_id = S.id  where O.user_id = $1 and order_status='pending' and O.is_deleted=0 and o.id=$2;`,
      [userId, order_id]
    );
    const accessories = await pool.query(
      `select A.name As accessory_name, A.img As accessory_img , A.price As accessory_price from accessories A inner join order_accessories OA on A.id=OA.accessories_id inner join orders O on OA.order_id=O.id where O.user_id=$1 and O.id=$2;`,
      [userId, order_id]
    );
    if (!orders.rows.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All your orders",
      order: orders.rows[0],
      accessories: accessories.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
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

const updateOrderTime = (req, res) => {
  const { id } = req.params;
  const { scheduled_time } = req.body;
  pool
    .query(
      `UPDATE orders SET scheduled_time = COALESCE($1,scheduled_time) WHERE id = $2 RETURNING *`,
      [scheduled_time, id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Order with id ${id} is updated successfully`,
        order: result.rows,
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
  addAccessoryToOrder,
  updateOrderTime,
};
