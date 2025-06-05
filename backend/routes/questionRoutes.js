const express = require('express');
const router = express.Router();

const { generateQuestion } = require('../controllers/questionController');

router.post('/generate-question', generateQuestion);

module.exports = router;