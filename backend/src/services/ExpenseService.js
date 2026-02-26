const ExpenseRepository = require('../repositories/ExpenseRepository');

class ExpenseService {
  async getAllExpenses() {
    return await ExpenseRepository.getAllExpenses();
  }

  async getExpenseById(id) {
    return await ExpenseRepository.getExpenseById(id);
  }

  async createExpense(description, amount, categoryId) {
    if (!description || description.trim().length === 0) {
      throw new Error('Description is required');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    return await ExpenseRepository.createExpense(
      description.trim(),
      parseFloat(amount),
      categoryId
    );
  }

  async deleteExpense(id) {
    const expense = await ExpenseRepository.getExpenseById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return await ExpenseRepository.softDeleteExpense(id);
  }

  async getExpensesByCategory(categoryId) {
    return await ExpenseRepository.getExpensesByCategory(categoryId);
  }
}

module.exports = new ExpenseService();
