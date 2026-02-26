import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ categories, onAddExpense }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount || !formData.category_id) {
      alert('Please fill in all fields');
      return;
    }

    onAddExpense({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category_id: parseInt(formData.category_id),
    });

    // Reset form
    setFormData({
      description: '',
      amount: '',
      category_id: '',
    });
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Lunch at cafe"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
