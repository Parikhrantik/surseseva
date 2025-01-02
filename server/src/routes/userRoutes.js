const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.get('/getUserById/:id', userController.getUserById);
router.get('/getAllUserDetails', userController.getAllUserDetails);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/updateUser/:id', userController.updateUser);

module.exports = router;
