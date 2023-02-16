const express = require('express');
const router = express.Router();
const blizzardController = require('../controllers/Blizzard');

router.post('/blizzard', blizzardController.blizzardCreate);

module.exports = router;