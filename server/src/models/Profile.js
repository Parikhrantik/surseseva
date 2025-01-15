const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // Change to String
  profile_picture: { type: String },
  bio: { type: String },
  genre_preferences: { type: [String] }, // Store as an array of strings
  contact_information: { type: String },
});

module.exports = mongoose.model('Profile', ProfileSchema);
