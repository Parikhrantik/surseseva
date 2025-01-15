const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Profile = require('../models/Profile');

exports.updateProfile = async (req, res) => {
  try {
    const { user_id, bio, genre_preferences, contact_information } = req.body;
    console.log(req.body);
    let profile_picture = req.file?.path; // Assuming `multer` is used for file uploads

    // Ensure `user_id` is a valid ObjectId
    if (!ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user_id format' });
    }

    // Parse genre_preferences if it's a string
    let parsedGenrePreferences = genre_preferences;
    if (typeof genre_preferences === 'string') {
      try {
        parsedGenrePreferences = JSON.parse(genre_preferences);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid format for genre preferences.' });
      }
    }

    // Validate genre_preferences
    if (parsedGenrePreferences && !Array.isArray(parsedGenrePreferences)) {
      return res.status(400).json({ message: 'Genre preferences must be an array.' });
    }

    // Find the profile by user_id
    let profile = await Profile.findOne({ user_id: new ObjectId(user_id) });

    if (profile) {
      // Update existing profile
      profile.profile_picture = profile_picture || profile.profile_picture;
      profile.bio = bio || profile.bio;
      profile.genre_preferences = parsedGenrePreferences || profile.genre_preferences;
      profile.contact_information = contact_information || profile.contact_information;
    } else {
      // Create a new profile
      profile = new Profile({
        user_id: new ObjectId(user_id),
        profile_picture,
        bio,
        genre_preferences: parsedGenrePreferences,
        contact_information,
      });
    }

    // Save the profile
    await profile.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get profile by user_id
exports.getProfileById = async (req, res) => {
    try {
      const { user_id } = req.params;
      
      // Ensure `user_id` is valid
      if (!ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user_id format' });
      }
  
      const profile = await Profile.findOne({ user_id: new ObjectId(user_id) });
      
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json({ profile });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Delete profile by user_id
exports.deleteProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Ensure `user_id` is valid
      if (!ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user_id format' });
      }
  
      const profile = await Profile.findOneAndDelete({ user_id: new ObjectId(user_id) });
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
      const profiles = await Profile.find();
      
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ message: 'No profiles found' });
      }
  
      res.status(200).json({ profiles });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
    