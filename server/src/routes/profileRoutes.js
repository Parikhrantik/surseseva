const multer = require('multer');
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

const upload = multer({ dest: 'uploads/' });

router.post('/updateProfile', upload.single('profile_picture'), profileController.updateProfile);
router.get('/getProfile/:user_id', profileController.getProfileById);
router.delete('/deleteProfile/:user_id', profileController.deleteProfile);
router.get('/getAllProfiles', profileController.getAllProfiles);

module.exports = router;

