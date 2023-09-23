const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = {};

users.register = async (req, res) => {
  const { firstName, lastName, email, password, role_id } = req.body;
  if (password.length < 8) {
    return res.status(409).json({
      success: false,
      message: "The password should be more than 8 characters",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  const data = [
    firstName,
    lastName,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

module.exports = users;
