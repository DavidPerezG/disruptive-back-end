
// Middleware function to check if user is Admin
const isAdmin = (req, res, next) => {
  console.log(req.user.userType);
  if (req.user && req.user.userType === 'admin') {
    return next(); // Allow access if user is Admin
  }
  res.status(403).json({ message: 'Forbidden: Only Admins have access' });
};

// Middleware function to check if user is Reader
const isReader = (req, res, next) => {
  if (req.user && req.user.userType === 'reader') {
    return next(); // Allow access if user is Reader
  }
  res.status(403).json({ message: 'Forbidden: Only Readers have access' });
};

// Middleware function to check if user is Creator
const isCreator = (req, res, next) => {
  if (req.user && req.user.userType === 'creator') {
    return next(); // Allow access if user is Creator
  }
  res.status(403).json({ message: 'Forbidden: Only Creators have access' });
};

// Combined middleware function for Admin or Creator
const isAdminOrCreator = (req, res, next) => {
  if (req.user && (req.user.userType === 'admin' || req.user.userType === 'creator')) {
    return next(); // Allow access if user is Admin or Creator
  }
  res.status(403).json({ message: 'Forbidden: Only Admins or Creators have access' });
};

module.exports = { isAdmin, isReader, isCreator, isAdminOrCreator };
