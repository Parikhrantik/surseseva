
const express = require('express');

const voteController = require('../controllers/voteController');


const router = express.Router();
// router.use(authMiddleware);

router.post('/vote', voteController.Vote);


module.exports = router;