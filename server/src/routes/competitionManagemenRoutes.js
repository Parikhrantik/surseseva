const competitionManagementController = require('../controllers/competitionManagementController');
const express = require('express');

const router = express.Router();

router.post('/create-competition', competitionManagementController.createCompetitionManagement);
router.get('/get-all-competitions', competitionManagementController.getCompetitionsManagement);
router.get('/get-competition/:id', competitionManagementController.getCompetitionManagementById);
router.put('/update-competition/:id', competitionManagementController.updateCompetitionManagement);
router.delete('/delete-competition/:id', competitionManagementController.deleteCompetitionManagement);

module.exports = router;

