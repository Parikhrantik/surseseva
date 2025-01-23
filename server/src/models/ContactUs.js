// Backend: contactUsModel.js
const mongoose = require('mongoose');
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  ticketNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
