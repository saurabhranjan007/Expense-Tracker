const db = require('../db/database');

class ExpenseRepository {
  async getAllExpenses() {
    const sql = `
      SELECT 
        e.id,
        e.description,
        e.amount,
        e.category_id,
        c.name AS category_name,
        e.date,
        e.created_at
      FROM expenses e
      JOIN categories c ON e.category_id = c.id
      WHERE e.deleted_at IS NULL
      ORDER BY e.date DESC
    `;
    return await db.all(sql);
  }

  async getExpenseById(id) {
    const sql = `
      SELECT 
        e.id,
        e.description,
        e.amount,
        e.category_id,
        c.name AS category_name,
        e.date,
        e.created_at
      FROM expenses e
      JOIN categories c ON e.category_id = c.id
      WHERE e.id = ? AND e.deleted_at IS NULL
    `;
    return await db.get(sql, [id]);
  }

  async createExpense(description, amount, categoryId) {
    const sql = `
      INSERT INTO expenses (description, amount, category_id, date)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;
    return await db.run(sql, [description, amount, categoryId]);
  }

  async softDeleteExpense(id) {
    const sql = `UPDATE expenses SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`;
    return await db.run(sql, [id]);
  }

  async getExpensesByCategory(categoryId) {
    const sql = `
      SELECT 
        e.id,
        e.description,
        e.amount,
        e.category_id,
        c.name AS category_name,
        e.date,
        e.created_at
      FROM expenses e
      JOIN categories c ON e.category_id = c.id
      WHERE e.category_id = ? AND e.deleted_at IS NULL
      ORDER BY e.date DESC
    `;
    return await db.all(sql, [categoryId]);
  }
}

module.exports = new ExpenseRepository();
