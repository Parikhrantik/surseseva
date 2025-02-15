const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwtUtils = require('../utils/jwtUtils');

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password'); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const filePath = `${process.env.BASE_URL}/get-file/${user.profilePicture}`;

    res.status(200).json({
      ...user._doc,
      // profilePicture: filePath,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get all user details
const getAllUserDetails = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords for all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, bio, genrePreferences, contactInfo, profilePicture } = req.body;

  const profilePic = req.fileUrl ? req.fileUrl : profilePicture;

  // Validate role if provided
  const validRoles = ['Participant', 'Organizer', 'Voter'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  try {
    const updateData = { name, email, role, bio, genrePreferences, contactInfo, profilePicture: profilePic };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password'); // Exclude password in response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: updatedUser, success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = {
  getUserById,
  getAllUserDetails,
  deleteUser,
  updateUser,
};
