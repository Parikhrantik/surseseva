const mongoose = require('mongoose');
const { Schema } = mongoose;

const performanceSchema = new Schema({
performanceTitle: { type: String, required: true },
  description: { type: String, required: true },
  videoLink: { type: String }, // Optional
  performanceFile: { type: String }, // For uploaded files
  tags: { type: [String], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  eventId: { type: mongoose.Schema.Types.Mixed, required: true },
  competitionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;


