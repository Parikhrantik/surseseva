const mongoose = require('mongoose');
const Vote = require('../models/Vote');

exports.Vote = async (req, res) => {
  try {
    const { voter_id, competitionId, participant_id, voterFeedback } = req.body;

    console.log(req.body, "Incoming vote request");

    if (!voter_id || !competitionId || !participant_id || !voterFeedback) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Convert IDs to ObjectId
    const voterObjectId = new mongoose.Types.ObjectId(voter_id);
    const competitionObjectId = new mongoose.Types.ObjectId(competitionId);
    const participantObjectId = new mongoose.Types.ObjectId(participant_id);

    // Check for existing vote
    const existingVote = await Vote.findOne({ voter_id: voterObjectId, competitionId: competitionObjectId });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted for this competition." });
    }

    // Create new vote
    const newVote = new Vote({
      voter_id: voterObjectId,
      competitionId: competitionObjectId,
      participant_id: participantObjectId,
      voterFeedback,
    });

    await newVote.save();

    res.status(201).json({ message: "Vote submitted successfully." });

  } catch (error) {
    console.error("Error submitting Vote:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
