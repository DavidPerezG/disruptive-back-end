const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token is required!' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.user = decoded;
    next();
  });
};

const generateTokenFlag = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // If no token is provided, set a flag indicating token is missing
    req.isTokenMissing = true;
    return next(); // Continue to the next middleware or route handler
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid, set a flag indicating token is invalid
      req.isTokenInvalid = true;
    } else {
      // If the token is valid, attach the decoded user information to the request object
      req.user = decoded;
    }
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = { verifyToken, generateTokenFlag };
