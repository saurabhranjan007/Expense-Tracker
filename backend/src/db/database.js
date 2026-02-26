const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../../expense_tracker.db');

class Database {
  constructor() {
    this.db = null;
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          this.createTables()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  createTables() {
    return new Promise((resolve, reject) => {
      let tablesCreated = 0;
      const totalTables = 2;

      this.db.serialize(() => {
        // Categories Table
        this.db.run(
          `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`,
          (err) => {
            if (err) {
              console.error('Error creating categories table:', err);
              reject(err);
            } else {
              console.log('Categories table ready');
              tablesCreated++;
              if (tablesCreated === totalTables) {
                resolve();
              }
            }
          }
        );

        // Expenses Table with soft delete
        this.db.run(
          `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category_id INTEGER NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(category_id) REFERENCES categories(id)
          )`,
          (err) => {
            if (err) {
              console.error('Error creating expenses table:', err);
              reject(err);
            } else {
              console.log('Expenses table ready');
              tablesCreated++;
              if (tablesCreated === totalTables) {
                resolve();
              }
            }
          }
        );
      });
    });
  }

  seedDefaultCategories() {
    const categories = [
      'Food',
      'Transport',
      'Utilities',
      'Entertainment',
      'Health',
      'Breakfast',
      'Lunch',
      'Dinner'
    ];

    categories.forEach((category) => {
      this.db.run(
        `INSERT OR IGNORE INTO categories (name) VALUES (?)`,
        [category],
        (err) => {
          if (err) {
            console.error(`Error seeding category ${category}:`, err);
          } else {
            console.log(`✓ Category seeded: ${category}`);
          }
        }
      );
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database connection closed');
          resolve();
        }
      });
    });
  }
}

module.exports = new Database();
