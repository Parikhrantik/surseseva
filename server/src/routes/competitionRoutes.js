
const express = require('express');

const competitionController = require('../controllers/competitionController');
const { participantMiddleware } = require('../middleware/participant');

const router = express.Router();
// router.use(authMiddleware);

router.post('/register-competition', participantMiddleware, competitionController.competitionRegistration);
router.get('/get-competition-registration/:id', competitionController.getCompetitionRegistrationById);
router.delete('/delete-competition-registration', competitionController.deleteCompetitionRegistration);
router.get('/get-all-competition-registrations', competitionController.getAllCompetitionRegistrations);
router.put('/update-competition-registration/:id', competitionController.updateCompetitionRegistration);
router.get('/user-registration/:userId', competitionController.getUserCompetationRegistration);
router.get('/approved-Competitons', competitionController.getApprovedCompetitions);

module.exports = router;



