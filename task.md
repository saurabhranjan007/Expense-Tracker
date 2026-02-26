Build a Simple Expense Tracker
Build a full-stack application to track personal expenses. The application will feature a React frontend, a Node.js backend, and a SQL database to manage expenses and their categories.

Backend (Node.js + Database)
Create a REST API with endpoints to manage expenses and categories.

1. Database Schema:
You'll need two tables: Categories and Expenses. An expense must belong to a category.

Categories Table:

id (Primary Key, e.g., INT, AUTO_INCREMENT)

name (String, required, unique, e.g., 'Food', 'Transport', 'Utilities')

Expenses Table:

id (Primary Key, e.g., INT, AUTO_INCREMENT)

description (String, required)

amount (Decimal/Float, required)

category_id (Foreign Key referencing Categories.id)

date (Timestamp/Date, defaults to current date)

2. API Endpoints:
GET /api/categories

Retrieves a list of all available categories.

Used to populate the form dropdown on the frontend.

GET /api/expenses

Retrieves a list of all expenses.

Each expense object in the response should include its category name for easy display. (Hint: This will require a SQL JOIN query).

POST /api/expenses

Creates a new expense.

The request body should contain description, amount, and category_id.

DELETE /api/expenses/:id

Deletes a specific expense by its id.

Frontend (React)
Create a user interface to interact with the backend API.

Display Expenses:

Show all expenses in a list or table. Each item should display its description, amount, date, and category name.

Add Expense Form:

Create a form with fields for description and amount.

The form must include a dropdown (<select>) menu for Categories.

This dropdown should be dynamically populated by fetching data from the GET /api/categories endpoint when the component mounts.

Functionality:

Users can submit the form to create a new expense.

Users can delete an expense from the list.

The expense list should update automatically after adding or deleting an expense.

Data Aggregation:

Somewhere on the page, display the total sum of all listed expenses. This should be calculated on the frontend