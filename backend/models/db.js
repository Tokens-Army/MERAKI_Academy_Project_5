const { Pool } = require("pg");
const connectionString = process.env.DB_URL;

const pool = new Pool({
  
  connectionString,
});
// check the connection
pool.connect((err, pool) => {
  if (err) {
    console.error("Pool error: ", err.message, err.stack);
    return;
  }
  console.error("Pool connected on: ", pool.user);
});

module.exports = {
  pool,
};