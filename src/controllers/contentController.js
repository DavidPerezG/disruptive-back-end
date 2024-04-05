const Content = require('../models/Content');
const Category = require('../models/Category');
const mongoose = require('mongoose');



// Create a new content
exports.createContent = async (req, res) => {
  try {
    // Validate request body
    const { title, type, category, credits, content } = req.body;

    // Check if required fields are present
    if (!title || !type || !category || !credits || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the type is valid
    if (!['image', 'video', 'text'].includes(type)) {
      return res.status(400).json({ message: 'Invalid content type' });
    }

    // Create a new content object
    const newContent = new Content({
      title,
      type,
      category,
      credits,
      content
    });

    // Save content to the database
    await newContent.save();

    // Respond with the created content object
    res.status(201).json({
      id: newContent._id,
      title: newContent.title,
      type: newContent.type,
      category: newContent.category,
      credits: newContent.credits,
      content: newContent.content,
      createdAt: newContent.createdAt
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


// Get all content
exports.getAllContent = async (req, res) => {
  try {
    // Check if the token is missing
    if (req.isTokenMissing || req.isTokenInvalid) {
      // Query content documents without populating the 'content' field
      const contents = await Content.find({}, { content: 0 }); // Exclude the 'content' field
      return res.status(403).json({ contents }); // Send the contents without the 'content' field
    }
    // If the token is present, continue with the regular logic
    const { category, title, type, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (type) filters.type = type;

    // Query content with pagination and sorting by creation date
    const contents = await Content.find(filters)
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip((page - 1) * limit) // Skip records for pagination
      .limit(parseInt(limit)); // Limit the number of results per page

    // Count the total number of contents (without pagination)
    const totalCount = await Content.countDocuments(filters);

    res.json({
      contents,
      totalItems: totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get content by ID
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getContentsByCategoryCounter = async (req, res) => {
  try {
    const categoryId = req.params.category;

    // Get the category name from the category reference
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const categoryName = category.name;

    // Get counts of images, videos, and texts by category
    const counts = await Content.aggregate([
      { $match: { category: mongoose.Types.ObjectId.createFromHexString(categoryId) } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the count results
    const countsFormatted = {};
    counts.forEach(count => {
      countsFormatted[count._id] = count.count;
    });

    res.json({ category: categoryName, counts: countsFormatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
