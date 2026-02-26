const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.getAllCategories();
  }

  async getCategoryById(id) {
    return await CategoryRepository.getCategoryById(id);
  }

  async createCategory(name) {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name is required');
    }
    return await CategoryRepository.createCategory(name.trim());
  }
}

module.exports = new CategoryService();
