const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');


router.get('/list', tasksController.list);
//router.post('/save', tasksController.save);

module.exports = router;