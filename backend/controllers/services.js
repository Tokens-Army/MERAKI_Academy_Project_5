const {pool} = require("../models/db");

// this function creates a new service
const createNewService = (req, res) => {
    const {name, description, img, price} = req.body;
    pool.query(`INSERT INTO services (name, description, img, price) values ($1, $2, $3, $4) RETURNING *`, [name, description, img, price]).then((result) => {
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            service: result.rows
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
    createNewService,
    
};