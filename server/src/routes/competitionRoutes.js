
const express = require('express');

const competitionController = require('../controllers/competitionController');

const router = express.Router();

router.post('/register-competition', competitionController.competitionRegistration);
router.get('/get-competition-registration/:id', competitionController.getCompetitionRegistrationById);
router.delete('/delete-competition-registration', competitionController.deleteCompetitionRegistration);
router.get('/get-all-competition-registrations', competitionController.getAllCompetitionRegistrations);
router.put('/update-competition-registration/:id', competitionController.updateCompetitionRegistration);
router.get('/user-events/:userId', competitionController.getUserEvents);

module.exports = router;



