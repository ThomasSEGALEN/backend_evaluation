const axios = require("axios");
const event = require('../events/createFile');
const BLIZZARD_URL = "https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check";

const blizzardCreate = (req, res, next) => {
    axios.post(BLIZZARD_URL, { "username": req.body.username, "password": req.body.password })
        .then((response) => res.status(201).json(response.data))
        .catch((error) => {
            event.emit('createFile', { file: 'blizzardCreateLogs', message: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} : Tentative de connexion invalide\n` });

            res.status(400).json({ error })
        });
}

module.exports = { blizzardCreate }