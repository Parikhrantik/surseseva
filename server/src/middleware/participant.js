const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to check for authentication token and user role
exports.participantMiddleware = (req, res, next) => {
  // console.log('req', req.headers)
  const authHeader = req?.headers.authorization;
  const authRole = req?.headers.role;
  if (!authHeader) {
    return res?.status(401).json({ message: 'Unauthorized' });
  }
  if (authRole !== 'Participant') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();

  //   try {
  //     console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     console.log('decoded', decoded)
  //     req.user = decoded;
  //     if (req.user.role !== 'Participant') {
  //       return res.status(403).json({ message: 'Forbidden' });
  //     }
  //     next();
  //   } catch (error) {
  //     console.log('error', error)
  //     return res.status(401).json({ message: 'Unauthorized' });
  //   }
};