// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwtUtils = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, role, agreeToTerms } = req.body;

  // Validate input fields
  if (!name || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate role
  const validRoles = ['Participant', 'judge', 'Voter'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role selected' });
  }

  // Validate terms and conditions
  if (!agreeToTerms) {
    return res.status(400).json({ message: 'You must agree to the terms and conditions' });
  }

  // Validate password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate verification token
    const verificationToken = jwtUtils.generateVerificationToken(newUser._id);
    newUser.verificationToken = verificationToken;

    // Save the user
    await newUser.save();

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/auth/verifyemail?token=${encodeURIComponent(verificationToken)}`;
    console.log(verificationUrl, 'Verification URL');

    await sendEmail.sendVerificationEmail(email, verificationUrl);

    // Respond with success message
    return res.status(201).json({
      status: '201',
      message: 'Registration successful. Check your email for verification.',
    });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data provided' });
    } else if (error.code === 11000) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    return res.status(500).json({ message: 'Something went wrong, please try again later.' });
  }
};
const sendVerificationLink = async (req, res) => {
  const { email, userId } = req.body;
  try {
    // Generate verification token
    const token = jwtUtils.generateVerificationToken(userId);
    // Send verification email
    await sendEmail.sendVerificationEmail(email, token);
    return res.status(200).send('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    return res.status(500).send('Failed to send verification email');
  }
};
// Verify user's email
const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send('Token is missing');
  }
  try {
    // Verify the token
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(400).send('Invalid token');
    }
    // Check if the user already exists and isVerified is false
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // If already verified, notify the user
    if (user.isVerified) {
      return res.status(200).send('Email already verified');
    }
    // Mark the user as verified
    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });
    res.redirect(process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/login` : 'http://localhost:3000/login');
  } catch (error) {
    console.error('Error verifying email:', error.message);
    return res.status(400).send('Error verifying token');
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email' });
    }
    // Generate JWT token
    const tokenId = crypto.randomBytes(16).toString('hex'); // generate a unique token id
    const token = jwt.sign({ userId: user._id, role: user.role, tokenId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      status: '200',
      message: 'Login successful',
      token,
      userId: user._id,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save token and expiration in the database
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    await sendEmail.sendResetPasswordEmail(email, resetToken);
    

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  console.log(req.body)
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    // Hash the token and find the user
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully. You can now log in.' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
};



// module.exports = { registerUser, verifyEmail, loginUser, sendVerificationLink };
module.exports = { registerUser, verifyEmail,loginUser,sendVerificationLink,resetPassword,forgotPassword };
