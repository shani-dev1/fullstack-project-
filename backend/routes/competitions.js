const Competition = require('../models/competition');
const express = require("express");
const router = express.Router();
const { getCompetitionsByCategory} = require("../controllers/competitions");

router.get('/:category', getCompetitionsByCategory); 

module.exports = router;
