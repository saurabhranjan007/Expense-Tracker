# Expense Tracker - Full Stack Application

A full-stack application to track personal expenses with a React frontend, Node.js backend, and SQLite database.

## Features

- ✅ Add new expenses with description, amount, and category
- ✅ View all expenses in a searchable list
- ✅ Delete expenses (soft delete)
- ✅ Categorize expenses (Food, Transport, Utilities, Entertainment, Health)
- ✅ Calculate total expenses on the frontend
- ✅ Responsive UI design
- ✅ Clean Architecture backend

## Project Structure

```
expense-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/          # API request handlers
│   │   ├── services/             # Business logic layer
│   │   ├── repositories/         # Data access layer with soft delete logic
│   │   ├── routes/               # API route definitions
│   │   ├── db/                   # Database configuration
│   │   ├── models/               # Data models (if needed)
│   │   └── app.js                # Express app setup
│   ├── server.js                 # Server entry point
│   ├── package.json
│   └── expense_tracker.db        # SQLite database file
│
└── frontend/
    ├── src/
    │   ├── components/           # React components
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseForm.css
    │   │   ├── ExpenseList.jsx
    │   │   └── ExpenseList.css
    │   ├── App.jsx               # Main app component
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: SQLite3
- **Architecture**: Clean Architecture (Controllers → Services → Repositories)

### Frontend
- **Framework**: React (with Hooks)
- **Build Tool**: Vite
- **Styling**: CSS3

## Installation

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API Endpoints

### Categories
- **GET** `/api/categories` - Get all categories
- **GET** `/api/categories/:id` - Get category by ID
- **POST** `/api/categories` - Create new category

### Expenses
- **GET** `/api/expenses` - Get all expenses (with JOIN for category names)
- **GET** `/api/expenses/:id` - Get expense by ID
- **POST** `/api/expenses` - Create new expense
- **DELETE** `/api/expenses/:id` - Delete expense (soft delete)
- **GET** `/api/expenses/category/:categoryId` - Get expenses by category

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Expenses Table
```sql
CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  category_id INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(category_id) REFERENCES categories(id)
)
```

## Key Features Implementation

### Soft Delete
Expenses are soft deleted by setting the `deleted_at` timestamp. The repository filters out deleted expenses automatically:
```javascript
WHERE e.deleted_at IS NULL
```

### Frontend Components
- **ExpenseForm**: Form to add new expenses with category dropdown
- **ExpenseList**: Table displaying all expenses with delete functionality
- **App**: Main component managing state and API calls

## API Request/Response Examples

### Create Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Lunch",
    "amount": 250,
    "category_id": 1
  }'
```

### Get All Expenses
```bash
curl http://localhost:5000/api/expenses
```

### Delete Expense
```bash
curl -X DELETE http://localhost:5000/api/expenses/1
```

## Running the Application

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## How to Use

1. **Add Expense**: Fill in the form with description, amount, and category, then click "Add Expense"
2. **View Expenses**: All expenses are displayed in the table below the form
3. **Delete Expense**: Click the delete button (🗑️) to remove an expense
4. **View Total**: The total sum of all expenses is displayed in the summary card

## Architecture Benefits

- **Clean Separation**: Controllers, Services, and Repositories are separate concerns
- **Reusability**: Services can be reused across different controllers
- **Testability**: Each layer can be tested independently
- **Scalability**: Easy to add new features without modifying existing code
- **Maintainability**: Clear structure makes the code easy to understand and modify

## Default Categories

The application comes with these pre-populated categories:
- Food
- Transport
- Utilities
- Entertainment
- Health

## Author

Created as a full-stack assignment project demonstrating clean architecture principles.
