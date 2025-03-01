const mysql = require('mysql2')
require('dotenv').config() // Load environment variables from .env file

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Fix typo: waitForConnections
  connectionLimit: 10,
  queueLimit: 0
})

// Function to query the database
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export default query
