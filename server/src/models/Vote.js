const mongoose = require('mongoose');
const { Schema } = mongoose;

const voterSchema = new Schema({
  voter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  voterFeedback: {
    type: String,
    required: true,
  },
});

// Ensure the correct field names are indexed
voterSchema.index({ voter_id: 1, competitionId: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voterSchema);
module.exports = Vote;
