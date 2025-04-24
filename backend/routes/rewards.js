const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewardsController');


router.post('/save', rewardsController.save);
router.get('/total', rewardsController.getTotalRewards);

module.exports = router;