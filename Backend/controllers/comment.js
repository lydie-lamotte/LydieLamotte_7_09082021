const Comment = require('../models/comment');

const fs = require('fs');

//Créer un commentaire
exports.createComment = (req, res, next) => {
    const postId = req.postId;
    if (req.body.text == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }
    const comment = {
        postId: postId,
        text: req.body.text
    };
    Comment.create(comment)
        .then(()=> res.status(201).json({ message: 'commentaire enregistré !'}))
        .catch(() => res.status(400).json({ message: "erreur commentaire non enregistré !"} ));          
};

//Récupérer les commentaires
exports.findAllComment = (req, res, next) => {
    Comment.findAll()
        .then(Comments => res.status(200).json(Comments))
        .catch(error => res.status(400).json({ error}));
};

//Récupérer un commentaire
exports.findOneComment = (req, res, next) => {
    Comment.findOne({
        where: {id: req.params.id}
    })    
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({error}));         
}

//Mofifier un commentaire
exports.modifyComment = (req, res, next) => {
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.status(200).json({ message: 'commentaire supprimée'}))
    .catch(error => res.status(404).json({error}));  
}