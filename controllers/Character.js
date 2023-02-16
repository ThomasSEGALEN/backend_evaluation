const Character = require('../models/Character');

const createCharacter = (req, res, next) => {    
    delete req.body._id;
    delete req.body.userId;

    Character.findOne({
        pseudo: req.body.pseudo,
        class: req.body.class
    })
        .then((character) => {
            if (req.auth.isAdmin) return res.status(401).json({ message: "Création refusée en tant qu'administrateur" })

            if (character) return res.status(401).json({ message: 'Pseudo/classe déjà utilisés' });

            const characterObject = new Character({
                ...req.body,
                userId: req.auth.userId,
            });
        
            characterObject
                .save()
                .then(() => res.status(201).json({ message: 'Personnage créé' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
}

const getCharacter = (req, res, next) => {
    Character.findOne({
        pseudo: req.params.pseudo,
        class: req.params.class
    })
        .then((character) => {
            if (!character) return res.status(401).json({ message: 'Personnage inexistant' });

            res.status(200).json(character);
        })
        .catch((error) => res.status(400).json({ error }));
}

const getCharacterById = (req, res, next) => {
    Character.findById(req.params.id)
        .then((character) => {
            if (!character) return res.status(401).json({ message: 'Identifiant inexistant' });

            res.status(200).json(character);
        })
        .catch((error) => res.status(400).json(error));
}

const updateCharacter = (req, res, next) => {
    delete req.body.userId;

    Character.findById(req.params.id)
    .then((character) => {
        if (!character) return res.status(401).json({ message: 'Identifiant inexistant' });

        if (character.userId === req.auth.userId || req.auth.isAdmin) {
            Character.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Personnage modifié' }))
                .catch((error) => res.status(400).json({ error }));
        } else {
            res.status(401).json({ message: 'Cet utilisateur ne peut pas modifier ce personnage' })
        }
    })
    .catch(() => res.status(400).json({ error }));
}

const deleteCharacter = (req, res, next) => {
    Character.findById(req.params.id)
        .then((character) => {
            if (!character) return res.status(401).json({ message: 'Identifiant inexistant' });

            if (character.userId === req.auth.userId || req.auth.isAdmin) {
                Character.deleteOne({ _id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Personnage supprimé' }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(401).json({ message: 'Cet utilisateur ne peut pas supprimer ce personnage' });
            }
        })
        .catch(() => res.status(400).json({ error }));
}

module.exports = {
    createCharacter,
    getCharacter,
    getCharacterById,
    updateCharacter,
    deleteCharacter
}