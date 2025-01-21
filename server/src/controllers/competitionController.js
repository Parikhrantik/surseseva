
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Competition = require('../models/Competition');
const Performance = require('../models/Performance');


exports.competitionRegistration = async (req, res) => {
  console.log('req.body', req.body)
  try {
    const { userId, competitionId, competitionName, category, agreedToRules, competitionstartDate, competitionendDate } = req.body;
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!userId || !competitionId || !competitionName || !category || !agreedToRules || !competitionstartDate || !competitionendDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Validate UserId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format.',
      });
    }

    // Handle eventId as a regular string or number, if it's not a valid ObjectId
    let eventObjectId = competitionId;
    console.log('eventObjectId', eventObjectId)
    // Check if competitionId exists in Competition model
    const existingCompetition = await Competition.findOne({
      competitionId: eventObjectId,
    })
    console.log('existingCompetition', existingCompetition)
    // Check if the user is already registered for the same event
    const existingRegistration = await Performance.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      competitionId: eventObjectId,
    })
    console.log('existingRegistration', existingRegistration)
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered.',
      });
    }



    if (!existingCompetition) {
      // Create a new competition registration
      const newRegistration = new Competition({
        userId: new mongoose.Types.ObjectId(userId),
        competitionId: eventObjectId,
        competitionName,
        category,
        agreedToRules,
        competitionstartDate,
        competitionendDate
      });

      await newRegistration.save();

      return res.status(201).json({
        success: true,
        message: 'Competition Registration successful.',
        data: newRegistration,
      });
    } else {
      // Return existing competition data
      return res.status(200).json({
        success: true,
        message: 'Competition already exists.',
        data: existingCompetition,
      });
    }
  } catch (error) {
    console.error('Error in competition registration:', error);

    // Handle different error types
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + error.message,
      });
    }

    // Catch any other errors like casting errors, etc.
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid format for one of the fields.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};


// Get all competition registrations
exports.getAllCompetitionRegistrations = async (req, res) => {
  try {
    const registrations = await Competition.find();
    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error('Error in fetching competition registrations:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

// Get a competition registration by ID
exports.getCompetitionRegistrationById = async (req, res) => {
  try {
    const registration = await Competition.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
    }
    return res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error('Error in fetching competition registration by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

// Delete a competition registration by ID
exports.deleteCompetitionRegistration = async (req, res) => {
  const { userId, competitionId } = req.body;

  try {
    if (!userId || !competitionId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Event ID are required to delete.',
      });
    }

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format.',
      });
    }

    // If eventId is supposed to be a number, validate it
    if (isNaN(competitionId) && !mongoose.Types.ObjectId.isValid(competitionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID format.',
      });
    }

    const deletedRegistration = await Competition.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userId),
      competitionId: competitionId, // Use as-is if eventId is a string or number
    });

    if (!deletedRegistration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Competition Registration deleted successfully.',
    });
  } catch (error) {
    console.error('Error in deleting competition registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};



// Update competition registration
exports.updateCompetitionRegistration = async (req, res) => {
  const { userId, competitionId, competitionName, category, agreedToRules, competitionstartDate, competitionendDate } = req.body;

  try {
    if (!userId || !competitionId || !competitionName || !category || !agreedToRules || !competitionstartDate || !competitionendDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Validate UserId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format.',
      });
    }

    const eventObjectId = competitionId;
    if (mongoose.Types.ObjectId.isValid(competitionId)) {
      eventObjectId = new mongoose.Types.ObjectId(competitionId); // If eventId is a valid ObjectId, convert it
    } else {
      // If eventId is not an ObjectId, treat it as is (string/number)
    }

    const updatedRegistration = await Competition.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId), competitionId: eventObjectId },
      { competitionName, category, agreedToRules },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Competition Registration updated successfully.',
      data: updatedRegistration,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Error: input must be a 24 character hex string, 12 byte Uint8Array, or an integer',
      });
    }
    console.error('Error in updating competition registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};

exports.getUserCompetationRegistration = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate UserId format
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing User ID.',
      });
    }
    // Fetch events from competition registrations
    const competitionEvents = await Competition.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Fetch events from performances
    const performanceEvents = await Performance.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return res.status(200).json({
      success: true,
      message: 'User events retrieved successfully.',
      data: {
        competitionEvents,
        performanceEvents,
      },
    });
  } catch (error) {
    console.error('Error fetching user events:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};
