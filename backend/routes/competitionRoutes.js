const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const { getCompetitionsByCategory, createCompetition } = require("../controllers/competitionController");
const upload = multer({ storage });

router.get('/:category', getCompetitionsByCategory);
router.post("/", upload.single("image"), createCompetition);

module.exports = router;
