const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    videoUrls: {
      type: [String], // Array of strings to store video URLs
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

module.exports = mongoose.model("Event", eventSchema);
