const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    competitionId: {
      type: mongoose.Schema.Types.Mixed, // Can store string, number, or ObjectId depending on your use case
      required: true,
    },
    competitionName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    agreedToRules: {
      type: Boolean,
      required: true,
      default: false,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    competitionstartDate: { type: String, required: true },
    competitionendDate: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Competition", competitionSchema);
