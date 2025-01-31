
const express = require('express');

const performanceController = require('../controllers/performanceController');

const router = express.Router();

const path = require('path');

const { Storage } = require('@google-cloud/storage');
const { participantMiddleware } = require('../middleware/participant');
const GCPuploader = require('../middleware/GCPBucket');

router.post('/submit-performance', participantMiddleware, GCPuploader('performanceFile'), performanceController.submitPerformance // Final controller to handle the performance submission
);


router.get('/get-performance-by-id/:id', performanceController.getPerformanceById);
router.get('/get-participant-performance/:id', participantMiddleware, performanceController.getParticipantPerformanceById);

router.get('/get-all-performances', participantMiddleware, performanceController.getAllPerformances);
router.put('/update-performance/:id', participantMiddleware, GCPuploader('performanceFile'), performanceController.updatePerformance);
router.delete('/delete-performance/:id', performanceController.deletePerformance);


router.get('/get-file/:filename', (req, res) => {
  const { filename } = req.params;
  console.log('Request received:', req.params);
  console.log('Filename:', filename);

  if (!filename) {
    return res.status(400).json({ message: 'Filename is required' });
  }

  const filePath = path.join(__dirname, '../../uploads', filename);
  try {
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error sending file:', err);
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;



