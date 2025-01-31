const Performance = require('../models/Performance');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
exports.submitPerformance = async (req, res) => {
console.log('req.body', req.body)
  try {

    const { userId, competitionId, performanceTitle, description, tags, videoLink, competitionRegId } = req.body;


    if (!userId || !competitionId || !performanceTitle || !description) {
      return res.status(400).json({
        success: false,
        message: 'User ID, Event ID, Performance Title, and Description are required.',
      });
    }

    const newPerformance = new Performance({
      performanceTitle,
      description,
      videoLink,
      performanceFile: req.fileUrl ? req.fileUrl : null,
      tags: tags ? JSON.parse(tags) : [],
      userId,
      competitionId,
      competitionRegId,
      createdBy: userId,
    });
    console.log(newPerformance, "newPerformance")

    await newPerformance.save();

    return res.status(201).json({
      success: true,
      message: 'Performance submitted successfully.',
      data: {
        ...newPerformance._doc,
        performanceTitle,
      },
    });
    console.log(res, "res")
  } catch (error) {
    console.error('Error submitting performance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};




exports.previewPerformance = async (req, res) => {
  try {
    const { videoLink, performanceFile } = req.body;

    if (videoLink) {
      // Validate video link (simple check)
      const videoUrlPattern = /^(https?:\/\/)(www\.)?(youtube\.com|vimeo\.com)\/[a-zA-Z0-9_-]+$/;
      if (!videoUrlPattern.test(videoLink)) {
        return res.status(400).json({ success: false, message: 'Invalid video link. Only YouTube and Vimeo are supported.' });
      }
    }
    // If there's a file to preview, return it as a base64 string
    let previewData = null;
    if (performanceFile) {
      previewData = performanceFile.toString('base64');
    }
    return res.status(200).json({
      success: true,
      message: 'Performance preview data fetched successfully.',
      preview: { videoLink, performanceFile: previewData },
    });
  } catch (error) {
    console.error('Error previewing performance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Get all performances
exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.find();
    return res.status(200).json({
      success: true,
      data: performances,
    });
  } catch (error) {
    console.error('Error fetching performances:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};


// Get a performance by ID
exports.getPerformanceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid performance ID.' });
    }

    const performance = await Performance.findById(id);
    if (!performance) {
      return res.status(404).json({ success: false, message: 'Performance not found.' });
    }

    // const filePath = `${process.env.BASE_URL}/get-file/${performance.performanceFile}`;
    // console.log(filePath,"kkkkkkkkkkkkkkkk")

    return res.status(200).json({
      success: true,
      data: {
        ...performance._doc,
        // performanceFile: filePath,
      },
    });
  } catch (error) {
    console.error('Error fetching performance by ID:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
exports.getParticipantPerformanceById = async (req, res) => {
  console.log(req)
  try {
    const { id } = req.params;
    const { userID } = req.query;
    console.log('userID', userID)
    console.log('id', id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid performance ID.' });
    }


    const performance = await Performance.findOne({ competitionRegId: id, userId: userID });

    console.log('performance', performance)
    if (!performance) {
      return res.status(404).json({ success: false, message: 'Performance not found.' });
    }

    const filePath = performance.performanceFile?.startsWith('http' || 'https') ? performance.performanceFile : `${process.env.BASE_URL}/uploads/${performance.performanceFile}`;
    // console.log(filePath,"kkkkkkkkkkkkkkkk")

    return res.status(200).json({
      success: true,
      data: {
        ...performance._doc,
        performanceFile: filePath,
      },
    });
  } catch (error) {
    console.error('Error fetching performance by ID:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
// exports.updateParticipantPerformanceById = async (req, res) => {
//   console.log(req)
//   try {
//     const { id } = req.params;
//     const { userID } = req.query;
//     console.log('userID', userID)
//     console.log('id', id)
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid performance ID.' });
//     }


//     const performance = await Performance.findOne({ competitionRegId: id, userId: userID });

//     console.log('performance', performance)
//     if (!performance) {
//       return res.status(404).json({ success: false, message: 'Performance not found.' });
//     }

//     const filePath = `${process.env.BASE_URL}/uploads/${performance.performanceFile}`;
//     // console.log(filePath,"kkkkkkkkkkkkkkkk")

//     return res.status(200).json({
//       success: true,
//       data: {
//         ...performance._doc,
//         performanceFile: filePath,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching performance by ID:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// };

// Update a performance by ID
exports.updatePerformance = async (req, res) => {
  console.log('req.body', req)
  try {
    const { id } = req.params;
    const data = req.body;
    const performanceFile = req.fileUrl ? req.fileUrl : req.body.performanceFile
    const tags = data.tags ? JSON.parse(data.tags) : JSON.parse(req.body.tags)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid performance ID.' });
    }


    const performance = await Performance.findByIdAndUpdate(id, { performanceTitle: data.performanceTitle, description: data.description, videoLink: data.videoLink, performanceFile, tags }, { new: true });
    if (!performance) {
      return res.status(404).json({ success: false, message: 'Performance not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Performance updated successfully.',
      data: performance,
    });
  } catch (error) {
    console.error('Error updating performance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Delete a performance by ID
exports.deletePerformance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid performance ID.' });
    }

    const performance = await Performance.findByIdAndDelete(id);
    if (!performance) {
      return res.status(404).json({ success: false, message: 'Performance not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Performance deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting performance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};