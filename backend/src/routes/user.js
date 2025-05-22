const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/friends', userController.getFriends);
router.post('/save', userController.save);

module.exports = router;
