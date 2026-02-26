const db = require('../db/database');

class CategoryRepository {
  async getAllCategories() {
    const sql = `SELECT id, name, created_at FROM categories ORDER BY name ASC`;
    return await db.all(sql);
  }

  async getCategoryById(id) {
    const sql = `SELECT id, name, created_at FROM categories WHERE id = ?`;
    return await db.get(sql, [id]);
  }

  async createCategory(name) {
    const sql = `INSERT INTO categories (name) VALUES (?)`;
    return await db.run(sql, [name]);
  }
}

module.exports = new CategoryRepository();
