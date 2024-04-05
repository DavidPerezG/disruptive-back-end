const Category = require('../models/Category');


// Create a new category
exports.createCategory = async (req, res) => {
  try {
    // Validate request body
    const { name, cover, permissions } = req.body;

    // Check if required fields are present
    if (!name || !cover) {
      return res.status(400).json({ message: 'Name and cover are required' });
    }

    // Create a new category object
    const newCategory = new Category({
      name,
      cover,
      permissions: permissions || {}
    });

    // Save category to the database
    await newCategory.save();

    // Respond with the created category object
    res.status(201).json({
      id: newCategory._id,
      name: newCategory.name,
      cover: newCategory.cover,
      permissions: newCategory.permissions,
      createdAt: newCategory.createdAt
    });
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'ValidationError') {
      // Respond with a 422 status code for validation errors
      res.status(422).json({ message: 'Validation failed', errors: error.errors });
    } else {
      // Respond with a 500 status code for other errors
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID

exports.updateCategoryById = async (req, res) => {
  try {
    // Validate request body
    const { name, cover, permissions } = req.body;

    // Check if any of the required fields are missing
    if (!name && !cover && !permissions) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Find the category by ID and update it
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Check if category exists
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Respond with the updated category object
    res.json(category);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};


// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
