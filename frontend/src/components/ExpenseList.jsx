import './ExpenseList.css';

function ExpenseList({ expenses, onDeleteExpense }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="expense-list-container">
      <h2>Recent Expenses</h2>
      <div className="expense-table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="expense-row">
                <td className="description">{expense.description}</td>
                <td className="category">
                  <span className="category-badge">{expense.category_name}</span>
                </td>
                <td className="amount">₹ {expense.amount.toFixed(2)}</td>
                <td className="date">{formatDate(expense.date)}</td>
                <td className="action">
                  <button
                    className="delete-button"
                    onClick={() => onDeleteExpense(expense.id)}
                    title="Delete expense"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
