const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const characterController = require('../controllers/Character');

router.post('/', auth, characterController.createCharacter);

router.get('/:pseudo/:class', characterController.getCharacter);

router.get('/:id', characterController.getCharacterById);

router.put('/:id', auth, characterController.updateCharacter);

router.delete('/:id', auth, characterController.deleteCharacter);

module.exports = router;