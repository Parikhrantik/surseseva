// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwtUtils = require('../utils/jwtUtils');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  const validRoles = ['Participant', 'Organizer', 'Voter'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role selected' });
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
    const verificationUrl = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
    sendEmail(email, 'Please verify your email', `Click here to verify: ${verificationUrl}`);

    res.status(201).json({ message: 'Registration successful, check your email for verification.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Verify user's email
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const decoded = jwtUtils.verifyToken(token);
  if (!decoded) {
    return res.status(400).json({ message: 'Invalid or expired verification token' });
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.isVerified = true;
  user.verificationToken = '';
  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
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
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token as a response
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

module.exports = { registerUser, verifyEmail,loginUser};
