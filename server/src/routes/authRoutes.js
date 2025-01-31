// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
// Verify email route
router.get('/verifyemail', authController.verifyEmail);
router.get('/send-verification', authController.sendVerificationLink);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
