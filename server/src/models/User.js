// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Participant', 'Organizer', 'Voter',"judge"],
    required: true,
    default: 'Participant',
  },
  profilePicture: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  genrePreferences: {
    type: [String],
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: '',
  },
  agreedToTerms: {
    type: Boolean,
    default: false,
  },
  contactInfo: {
      type: String,
      default: '',
    },
  profilePicture: {
      type: String,
      default: '',
    },
passwordResetToken: {
    type: String, // Store token in plain text
    default: '',
  },
  passwordResetExpires: {
    type: Date, // Store expiration as a Date object
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
