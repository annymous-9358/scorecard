const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/scores', scoreController.createScore);
router.get('/scores', scoreController.getAllScores);
router.put('/scores/:id', scoreController.updateScore);
router.delete('/scores/:id', scoreController.deleteScore);

module.exports = router;