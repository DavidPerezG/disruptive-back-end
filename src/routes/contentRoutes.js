const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { verifyToken, generateTokenFlag } = require('../middleware/authMiddleware');
const permissionsMiddleware = require('../middleware/permissionsMiddleware');

// Content routes
router.post('/', verifyToken, permissionsMiddleware.isAdminOrCreator, contentController.createContent);
router.get('/', generateTokenFlag, contentController.getAllContent);
router.get('/:id', verifyToken, contentController.getContentById);
router.get('/:category/counts', contentController.getContentsByCategoryCounter);

module.exports = router;
