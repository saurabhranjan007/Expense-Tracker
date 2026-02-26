import { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  // Dummy data for expenses (commented out)
  // const dummyExpenses = [
  //   {
  //     id: 1,
  //     description: 'Grocery shopping at supermarket',
  //     amount: 1250.50,
  //     category_id: 1,
  //     category_name: 'Food',
  //     date: '2026-02-25T10:30:00',
  //   },
  //   {
  //     id: 2,
  //     description: 'Uber ride to office',
  //     amount: 350.00,
  //     category_id: 2,
  //     category_name: 'Transport',
  //     date: '2026-02-24T08:15:00',
  //   },
  //   {
  //     id: 3,
  //     description: 'Monthly electricity bill',
  //     amount: 2500.00,
  //     category_id: 3,
  //     category_name: 'Utilities',
  //     date: '2026-02-20T14:45:00',
  //   },
  //   {
  //     id: 4,
  //     description: 'Movie tickets',
  //     amount: 600.00,
  //     category_id: 4,
  //     category_name: 'Entertainment',
  //     date: '2026-02-23T18:00:00',
  //   },
  //   {
  //     id: 5,
  //     description: 'Doctor consultation',
  //     amount: 500.00,
  //     category_id: 5,
  //     category_name: 'Health',
  //     date: '2026-02-22T11:20:00',
  //   },
  // ];

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/expenses`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        // Refresh the expense list
        await fetchExpenses();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the expense list
        await fetchExpenses();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your expenses effortlessly</p>
      </header>

      <main className="app-main">
        <div className="dashboard-grid">
          {/* Add Expense Form */}
          <div className="form-section">
            <ExpenseForm categories={categories} onAddExpense={handleAddExpense} />
          </div>

          {/* Expenses List and Summary */}
          <div className="expenses-section">
            {/* Summary Card */}
            <div className="summary-card">
              <h2>Total Expenses</h2>
              <p className="total-amount">₹ {totalAmount.toFixed(2)}</p>
            </div>

            {/* Expenses List */}
            {loading ? (
              <p className="loading">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="no-expenses">No expenses yet. Add one to get started!</p>
            ) : (
              <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
