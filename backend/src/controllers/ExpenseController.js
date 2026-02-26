const ExpenseService = require('../services/ExpenseService');

class ExpenseController {
  async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseService.getAllExpenses();
      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getExpenseById(req, res) {
    try {
      const { id } = req.params;
      const expense = await ExpenseService.getExpenseById(id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: 'Expense not found',
        });
      }

      res.status(200).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createExpense(req, res) {
    try {
      const { description, amount, category_id } = req.body;
      const result = await ExpenseService.createExpense(description, amount, category_id);

      res.status(201).json({
        success: true,
        data: { id: result.id, description, amount, category_id },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      await ExpenseService.deleteExpense(id);

      res.status(200).json({
        success: true,
        message: 'Expense deleted successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getExpensesByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const expenses = await ExpenseService.getExpensesByCategory(categoryId);

      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ExpenseController();
