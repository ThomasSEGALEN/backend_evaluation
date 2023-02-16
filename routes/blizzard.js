const express = require('express');
const router = express.Router();
const blizzardController = require('../controllers/Blizzard');

router.post('/', blizzardController.blizzardCreate);

module.exports = router;