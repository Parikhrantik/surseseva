const mongoose = require("mongoose");
const competitionManagement = require("../models/competitionManagement");

exports.createCompetitionManagement = async (req, res) => {
  const { name, description, categories, startDate, endDate, timezone, rules } = req.body;

  // Validate required fields
  if (!name || !description || !categories || !startDate || !endDate || !timezone || !rules) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format.',
    });
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid timezone.',
    });
  }

  try {
    const competition = new competitionManagement(req.body);
    await competition.save();
    res.status(201).json({ success: true, message: "Competition created successfully!", competition });
  } catch (error) {
    console.error('Error creating competition:', error);
    res.status(500).json({ success: false, message: 'Failed to create competition.', error: error.message });
  }
};

exports.getCompetitionsManagement = async (req, res) => {
  try {
    const competitions = await competitionManagement.find();
    res.status(200).json({ success: true, data: competitions });
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve competitions.', error: error.message });
  }
};

exports.getCompetitionManagementById = async (req, res) => {
  try {
    const competition = await competitionManagement.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ success: false, message: "Competition not found!" });
    }
    res.status(200).json({ success: true, data: competition });
  } catch (error) {
    console.error('Error fetching competition by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve competition.', error: error.message });
  }
};

exports.updateCompetitionManagement = async (req, res) => {
  const { name, description, categories, startDate, endDate, timezone, rules } = req.body;

  // Optional: Validate the fields in the update as well
  if (startDate && isNaN(Date.parse(startDate))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid start date format.',
    });
  }

  if (endDate && isNaN(Date.parse(endDate))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid end date format.',
    });
  }

  // Validate timezone format
  if (timezone) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid timezone format.',
      });
    }
  }

  try {
    const updatedCompetition = await competitionManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompetition) {
      return res.status(404).json({ success: false, message: "Competition not found!" });
    }
    res.status(200).json({ success: true, message: "Competition updated successfully!", data: updatedCompetition });
  } catch (error) {
    console.error('Error updating competition:', error);
    res.status(500).json({ success: false, message: 'Failed to update competition.', error: error.message });
  }
};

exports.deleteCompetitionManagement = async (req, res) => {
  try {
    const deletedCompetition = await competitionManagement.findByIdAndDelete(req.params.id);
    if (!deletedCompetition) {
      return res.status(404).json({ success: false, message: "Competition not found!" });
    }
    res.status(200).json({ success: true, message: "Competition deleted successfully!" });
  } catch (error) {
    console.error('Error deleting competition:', error);
    res.status(500).json({ success: false, message: 'Failed to delete competition.', error: error.message });
  }
};
