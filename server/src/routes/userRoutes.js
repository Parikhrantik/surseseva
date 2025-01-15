const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = require("../../multerConfig");

router.get('/getUserById/:id', userController.getUserById);
router.get('/getAllUserDetails', userController.getAllUserDetails);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/update/:id', upload.single('profilePicture'), userController.updateUser);

module.exports = router;
