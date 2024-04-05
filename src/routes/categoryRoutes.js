const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware');
const permissionsMiddleware = require('../middleware/permissionsMiddleware');

// Category routes
router.post('/', verifyToken, permissionsMiddleware.isAdminOrCreator, categoryController.createCategory);
router.get('/', verifyToken, categoryController.getAllCategories);
router.get('/:id', verifyToken, categoryController.getCategoryById);
router.put('/:id', verifyToken, permissionsMiddleware.isAdminOrCreator, categoryController.updateCategoryById);
router.delete('/:id', verifyToken, permissionsMiddleware.isAdmin, categoryController.deleteCategoryById);

module.exports = router;
