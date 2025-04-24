const express = require('express');
const router = express.Router();
const tasksActionController = require('../controllers/tasksActionController');


router.post('/save', tasksActionController.save);
router.get('/list', tasksActionController.list);

module.exports = router;