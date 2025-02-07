
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Competition = require('../models/Competition');
const Performance = require('../models/Performance');
const Vote = require('../models/Vote');
const User = require('../models/User');

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
      userId: new mongoose.Types.ObjectId(userId)
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
  console.log(req.body)
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
      _id: new mongoose.Types.ObjectId(competitionId),
    });

    const deletePerfomance = await Performance.findOneAndDelete({
      competitionRegId: new mongoose.Types.ObjectId(competitionId),

    });
    console.log(deletePerfomance, 'hyyyyyy')
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

    // Fetch vote counts and feedback for competitions
    const competitionVotes = await Vote.aggregate([
      {
        $match: {
          competitionId: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming you have a "User" collection
          localField: "voter_id",
          foreignField: "_id",
          as: "voterInfo", // Populate voter information
        },
      },
      {
        $unwind: "$voterInfo", // Flatten the voterInfo array
      },
      {
        $group: {
          _id: "$competitionId",
          totalVotes: { $sum: 1 },
          feedbackCount: { $sum: 1 }, // Count total feedbacks
          feedbackDetails: {
            $push: {
              voterName: "$voterInfo.name", // Assuming 'name' is the field in User schema
              feedbackComment: "$voterFeedback",
              feedbackDate: "$createdAt", // Assuming feedback date is stored in 'createdAt'
            },
          },
        },
      },
    ]);

    // Fetch vote counts and feedback for performances
    const performanceVotes = await Vote.aggregate([
      {
        $match: {
          participant_id: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming you have a "User" collection
          localField: "voter_id",
          foreignField: "_id",
          as: "voterInfo", // Populate voter information
        },
      },
      {
        $unwind: "$voterInfo", // Flatten the voterInfo array
      },
      {
        $group: {
          _id: "$participant_id",
          totalVotes: { $sum: 1 },
          feedbackCount: { $sum: 1 },
          feedbackDetails: {
            $push: {
              voterName: "$voterInfo.name",
              feedbackComment: "$voterFeedback",
              feedbackDate: "$createdAt",
            },
          },
        },
      },
    ]);

    // Map vote counts and feedback to competition events
    const competitionEventsWithVotes = competitionEvents.map((competition) => {
      const voteData = competitionVotes.find((vote) =>
        competition.competitionId &&
        vote._id.toString() === competition.competitionId.toString()
      );
      return {
        ...competition.toObject(),
        totalVotes: voteData ? voteData.totalVotes : 0,
        feedbackCount: voteData ? voteData.feedbackCount : 0,
        feedbackDetails: voteData ? voteData.feedbackDetails : [], // Add feedback comments with voter details
      };
    });

    // Map vote counts and feedback to performance events
    const performanceEventsWithVotes = performanceEvents.map((performance) => {
      const voteData = performanceVotes.find((vote) =>
        performance.participant_id &&
        vote._id.toString() === performance.participant_id.toString()
      );
      return {
        ...performance.toObject(),
        totalVotes: voteData ? voteData.totalVotes : 0,
        feedbackCount: voteData ? voteData.feedbackCount : 0,
        feedbackDetails: voteData ? voteData.feedbackDetails : [], // Add feedback comments with voter details
      };
    });

    return res.status(200).json({
      success: true,
      message: 'User events retrieved successfully.',
      data: {
        competitionEvents: competitionEventsWithVotes,
        performanceEvents: performanceEventsWithVotes,
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



exports.getApprovedCompetitions = async (req, res) => {
  try {
    // Fetch all performance events
    const performanceEvents = await Performance.find({ userId: new mongoose.Types.ObjectId(req.params.userId), status: "approved" });
    if (!performanceEvents) {
      return res.status(404).json({
        success: false,
        message: 'No performance events found',
      })
    }

    // Fetch all competition events
    const competitionEvents = await Competition.find({ userId: new mongoose.Types.ObjectId(req.params.userId) });
    const ParticipantVotes = await Vote.find({ participant_id: new mongoose.Types.ObjectId(req.params.userId) });

    console.log('ParticipantVotes', ParticipantVotes)
    console.log('competitionEvents', competitionEvents)
    // Fetch vote counts along with voter feedback for competitions
    const competitionVotes = await Vote.aggregate([
      {
        $match: {
          participant_id: new mongoose.Types.ObjectId(req.params.userId),
          competitionId: { $in: competitionEvents.map(event => event._id) },
        }
      },
      {
        $group: {
          _id: '$competitionId',
          totalVotes: { $sum: 1 }, // Count total votes
          feedbackCount: { $sum: 1 } // Count total feedbacks
        }
      }
    ]);

    console.log('competitionVotes', competitionVotes)
    // Fetch vote counts along with voter feedback for performances
    const performanceVotes = await Vote.aggregate([
      {
        $group: {
          _id: "$participant_id",
          totalVotes: { $sum: 1 }, // Count total votes
          feedbackCount: { $sum: 1 } // Count total feedbacks
        }
      }
    ]);


    // // Map vote counts and feedback count to competitions
    const competitionEventsWithVotes = await Promise.all(
      competitionEvents.map(async (competition) => {
        const voteData = competitionVotes.find((vote) =>
          competition._id?.toString() === vote._id?.toString()
        );
        const feedbackDetails = await Promise.all(
          ParticipantVotes
            .filter((vote) =>
              vote.competitionId?.toString() === competition._id?.toString()
            )
            .map(async (vote) => {
              const voter = await User.findById(vote.voter_id).select('name');
              return {
                feedbackComment: vote.voterFeedback,
                voterName: voter?.name || '',

              };
            })
        );
        return {
          ...competition?.toObject(),
          totalVotes: voteData ? voteData.totalVotes : 0, // Total vote count
          feedbackCount: voteData ? voteData.feedbackCount : 0, // Feedback count only
          feedbackDetails: feedbackDetails,
        };
      })
    );

    // // Map vote counts and feedback count to performances
    const performanceEventsWithVotes = performanceEvents.map((performance) => {
      const voteData = performanceVotes.find((vote) =>
        vote._id?.toString() === performance.participant_id?.toString()
      );
      return {
        ...performance?.toObject(),
        totalVotes: voteData ? voteData.totalVotes : 0, // Total vote count
        feedbackCount: voteData ? voteData.feedbackCount : 0 // Feedback count only
      };
    });

    return res.status(200).json({
      success: true,
      message: 'All competition and performance events retrieved successfully.',
      data: {
        competitionEvents: competitionEventsWithVotes,
        performanceEvents: performanceEventsWithVotes,
      },
    });
  } catch (error) {
    console.error('Error fetching all events:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};


// exports.getPublicApprovedCompetitions = async (req, res) => {
//   try {
//     // Fetch all approved performance events and populate user details
//     const performanceEvents = await Performance.find({ status: "approved" })
//       .populate("userId", "name email"); // Fetch user details (e.g., name, email)

//     // Fetch all competition events and populate user details
//     const competitionEvents = await Competition.find().populate("userId", "name email profilePicture");

//     // Fetch all votes
//     const participantVotes = await Vote.find();

//     // Match competitionEvents._id with votes.competitionId and attach details
//     const competitionEventsWithVotes = await Promise.all(
//       competitionEvents.map(async (competition) => {
//         const relatedVotes = participantVotes.filter(
//           (vote) => vote.competitionId.toString() === competition._id.toString()
//         );
//         const voteDetails = await Promise.all(
//           relatedVotes.map(async (vote) => {
//             const voter = await User.findById(vote.voter_id).select("name");
//             return {
//               voterId: vote.voter_id,
//               voterName: voter ? voter.name : "Unknown",
//               participantId: vote.participant_id,
//               feedback: vote.voterFeedback,
//             };
//           })
//         );
//         return {
//           ...competition.toObject(),
//           votes: voteDetails,
//           totalVotes: relatedVotes.length,
//           feedbackCount: relatedVotes.filter((vote) => vote.voterFeedback).length,
//         };
//       })
//     );

//     return res.status(200).json({
//       success: true,
//       message: "All competition and performance events retrieved successfully.",
//       data: {
//         competitionEvents: competitionEventsWithVotes,
//         performanceEvents,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching competition events:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error: " + error.message,
//     });
//   }
// };
exports.getPublicApprovedCompetitions = async (req, res) => {
  try {
    const { searchName, category } = req.query; // Extract searchName and category query params

    // Create filters for performance and competition events
    const performanceFilter = { status: "approved" };
    const competitionFilter = {};

    if (category) {
      // Add category filter
      performanceFilter.category = category;
      competitionFilter.category = category;
    }

    if (searchName) {
      // Search users by name
      const userSearchRegex = new RegExp(searchName, "i"); // Case-insensitive search
      const users = await User.find({ name: userSearchRegex }).select("_id");

      if (users.length > 0) {
        const userIds = users.map(user => user._id);
        performanceFilter.userId = { $in: userIds };
        competitionFilter.userId = { $in: userIds };
      } else {
        // If no matching users are found, return empty results
        return res.status(200).json({
          success: true,
          message: "No matching events found.",
          data: { competitionEvents: [], performanceEvents: [] },
        });
      }
    }

    // Fetch performance events
    const performanceEvents = await Performance.find(performanceFilter)
      .populate("userId", "name email");

    // Fetch competition events
    const competitionEvents = await Competition.find(competitionFilter)
      .populate("userId", "name email profilePicture");

    // Fetch all votes
    const participantVotes = await Vote.find();

    // Process competition events with votes
    const competitionEventsWithVotes = await Promise.all(
      competitionEvents.map(async (competition) => {
        const relatedVotes = participantVotes.filter(
          (vote) => vote.competitionId.toString() === competition._id.toString()
        );
        const voteDetails = await Promise.all(
          relatedVotes.map(async (vote) => {
            const voter = await User.findById(vote.voter_id).select("name");
            return {
              voterId: vote.voter_id,
              voterName: voter ? voter.name : "Unknown",
              participantId: vote.participant_id,
              feedback: vote.voterFeedback,
            };
          })
        );
        return {
          ...competition.toObject(),
          votes: voteDetails,
          totalVotes: relatedVotes.length,
          feedbackCount: relatedVotes.filter((vote) => vote.voterFeedback).length,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Filtered competition and performance events retrieved successfully.",
      data: {
        competitionEvents: competitionEventsWithVotes,
        performanceEvents,
      },
    });
  } catch (error) {
    console.error("Error fetching competition events:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

