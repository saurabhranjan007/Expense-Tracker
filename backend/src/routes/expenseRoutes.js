const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/ExpenseController');

// GET /api/expenses - Get all expenses
router.get('/', ExpenseController.getAllExpenses);

// GET /api/expenses/:id - Get expense by ID
router.get('/:id', ExpenseController.getExpenseById);

// POST /api/expenses - Create new expense
router.post('/', ExpenseController.createExpense);

// DELETE /api/expenses/:id - Delete expense (soft delete)
router.delete('/:id', ExpenseController.deleteExpense);

// GET /api/expenses/category/:categoryId - Get expenses by category
router.get('/category/:categoryId', ExpenseController.getExpensesByCategory);

module.exports = router;
