const express = require('express');
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const router = express.Router();
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

router.get('/getUserById/:id', userController.getUserById);
router.get('/getAllUserDetails', userController.getAllUserDetails);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/update/:id', upload.single('profilePicture'), userController.updateUser);

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
