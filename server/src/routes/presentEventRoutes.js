const express = require('express');
const router = express.Router();
const eventController = require('../controllers/presentEventController');
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

// Route to create an event (with file upload)
router.post('/create', upload.single('bannerImage'), eventController.createEvent);

// Route to get all events
router.get('/getallevents', eventController.getAllEvents);

// Route to get a single event by ID
router.get('/:id', eventController.getEventById);




router.get('/get-file/:filename', (req, res) => {
    const { filename } = req.params;
    console.log('Request received:', req.params);
    console.log('Filename:', filename);

    if (!filename) {
        return res.status(400).json({ message: 'Filename is required' });
    }

    const filePath = path.join(__dirname, '../../uploads', filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).json({ message: 'File not found' });
        }
    });
});

module.exports = router;
