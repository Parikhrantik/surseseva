// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Verify email route
router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
