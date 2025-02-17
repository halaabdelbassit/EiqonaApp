const sqlite3 = require('sqlite3').verbose()

// Open a database connection
const db = new sqlite3.Database('./eiquonaApp.db', (err) => {
  if (err) {
    console.error('Error opening database', err)
  } else {
    console.log('Connected to the SQLite database.')
    initializeDatabase()
  }
})

// Initialize the database (create tables if they don't exist)
const initializeDatabase = () => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      phone TEXT UNIQUE,
      password TEXT NOT NULL,
      active BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      account_type BOOLEAN DEFAULT 0
    );

    
    `,
    (err) => {
      if (err) {
        console.error('Error creating table', err)
      } else {
        console.log('Table created or already exists.')
      }
    }
  )
}

export default db


// create table if not exists orders(
//   order_id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER NOT NULL,
//   order_type TEXT NOT NULL,
//   order_status TEXT NOT NULL,
//   order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users (user_id)
// );