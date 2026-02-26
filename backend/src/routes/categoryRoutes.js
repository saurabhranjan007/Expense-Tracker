const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// GET /api/categories - Get all categories
router.get('/', CategoryController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', CategoryController.getCategoryById);

// POST /api/categories - Create new category
router.post('/', CategoryController.createCategory);

module.exports = router;
