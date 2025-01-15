
const express = require('express');

const performanceController = require('../controllers/performanceController');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    },
  });
  
  const upload = multer({ storage });
  router.use('/uploads', express.static(path.join(__dirname, '../../uploads'))); 

router.post('/submit-performance', upload.single('performanceFile'), performanceController.submitPerformance);

router.get('/get-performance-by-id/:id', performanceController.getPerformanceById);

router.get('/get-all-performances', performanceController.getAllPerformances);
router.put('/update-performance/:id', performanceController.updatePerformance);
router.delete('/delete-performance/:id', performanceController.deletePerformance);

router.get('/get-file/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve(__dirname, '../../uploads', filename);

  // console.log("filePath:", filePath);

  res.json({ filePath });
});

module.exports = router;



