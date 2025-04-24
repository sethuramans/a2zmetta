const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for Telegram login
router.post('/login', authController.telegramLogin);

module.exports = router;
