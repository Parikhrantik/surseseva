
const express = require('express');
const { contactUs } = require('../controllers/contactUsController');

const router = express.Router();

router.post('/submit-ticket',contactUs);

module.exports = router;