const jwt = require('jsonwebtoken');

// Generate a JWT token for email verification
const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {

    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return null;
    }
  };

module.exports = { generateVerificationToken, verifyToken };

