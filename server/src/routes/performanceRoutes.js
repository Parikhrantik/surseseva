
const express = require('express');

const performanceController = require('../controllers/performanceController');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { participantMiddleware } = require('../middleware/participant');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter(req, file, cb) {
    console.log('file', file)
    console.log('reqfile', req)
    if (!file) {
      return cb(new Error('No file uploaded.'));
    }
    if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio and video files are allowed'));
    }
    if (file.size > 100 * 1024 * 1024) {
      return cb(new Error('File size too large. Maximum allowed size is 100MB.'));
    }
    cb(null, true);
  },
  errorHandling(req, file, cb) {
    if (req.fileValidationError) {
      return cb(req.fileValidationError);
    }
  },
});
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

router.post('/submit-performance', upload.single('performanceFile'), participantMiddleware, performanceController.submitPerformance);

router.get('/get-performance-by-id/:id', performanceController.getPerformanceById);
router.get('/get-participant-performance/:id', participantMiddleware, performanceController.getParticipantPerformanceById);

router.get('/get-all-performances', participantMiddleware, performanceController.getAllPerformances);
router.put('/update-performance/:id', participantMiddleware, upload.single('performanceFile'), performanceController.updatePerformance);
router.delete('/delete-performance/:id', performanceController.deletePerformance);

// router.get('/get-file/:filename', (req, res) => {

//   const { filename } = req.params;
//   const filePath = path.resolve(__dirname, '../../uploads', filename);

//   // console.log("filezzzzzzzzzzzzzzzzzzzzzPath:", filePath);

//   res.json({ filePath });
// });


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



