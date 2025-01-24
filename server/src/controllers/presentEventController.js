const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Event = require('../models/Event');

// Create new event
// exports.createEvent = async (req, res) => {
//   try {
//     const { title, bannerImage, videoUrls } = req.body;

//     // Validate required fields
//     if (!title || !bannerImage || !videoUrls || !Array.isArray(videoUrls)) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required. VideoUrls must be an array.',
//       });
//     }

//     // Validate if videoUrls array is not empty
//     if (videoUrls.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'At least one video URL is required.',
//       });
//     }

//     // Basic URL validation for all videoUrls
//     const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//     const invalidUrls = videoUrls.filter(url => !urlRegex.test(url));

//     if (invalidUrls.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid video URL format detected.',
//         invalidUrls
//       });
//     }

//     // Create new event
//     const newEvent = new Event({
//       title,
//       // bannerImage,
//       bannerImage: req.file.filename,
//       videoUrls
//     });

//     await newEvent.save();

//     return res.status(201).json({
//       success: true,
//       message: 'Event created successfully.',
//       data: newEvent,
//     });

//   } catch (error) {
//     console.error('Error in event creation:', error);
    
//     // Handle validation errors
//     if (error instanceof mongoose.Error.ValidationError) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error: ' + error.message,
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error: ' + error.message,
//     });
//   }
// };
exports.createEvent = async (req, res) => {
  try {
    const { title, bannerImage, videoUrls, eventType } = req.body;

    // Validate required fields
    if (!title || (!bannerImage && !req.file)) {
      return res.status(400).json({
        success: false,
        message: 'Title and bannerImage are required.',
      });
    }

    // Ensure videoUrls is provided and handle both string and array formats
    let videoUrlArray = [];
    if (typeof videoUrls === 'string') {
      // If videoUrls is a single string, convert it to an array
      videoUrlArray = [videoUrls];
    } else if (Array.isArray(videoUrls)) {
      // If videoUrls is already an array, use it as is
      videoUrlArray = videoUrls;
    }

    // Validate if the array is not empty
    // if (videoUrlArray.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'At least one video URL is required.',
    //   });
    // }

    // Validate each video URL using a YouTube URL regex
    const isValidYouTubeUrl = (url) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[\w\-]{11}$/;
      return youtubeRegex.test(url);
    };

    const invalidUrls = videoUrlArray.filter((url) => !isValidYouTubeUrl(url));

    if (invalidUrls.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid video URL format detected.',
        invalidUrls,
      });
    }
    const eventTypeToSave = eventType && ['past', 'present', 'future'].includes(eventType) ? eventType : 'present';
    // Create new event
    const newEvent = new Event({
      title,
      bannerImage: req.file ? req.file.filename : bannerImage, // Use multer for file uploads
      videoUrls: videoUrlArray,
      eventType: eventTypeToSave,  // Save the processed array of video URLs
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      data: newEvent,
       // Save event type (default to "present")
    });
  } catch (error) {
    console.error('Error in event creation:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};


// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 });
      // .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error('Error in fetching events:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID format.',
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });

  } catch (error) {
    console.error('Error in fetching event by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};