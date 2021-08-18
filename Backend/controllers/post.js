const Post = require('../models/post');

const fs = require('fs');


//Créer un post
exports.createPost = (req, res, next) => {
    if (req.body.content == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }
    const post = {
        userId: req.body.userId,
        content: req.body.content,
        imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        liked: 0
    }
    Post.create(post)
        .then(()=> res.status(201).json({ message: 'Post enregistré !'}))
        .catch(() => res.status(400).json({ message: "erreur post non enregistré !"} ));
};

//Récupérer les posts
exports.findAllPost = (req, res, next) => {
    Post.findAll()
        .then(Posts => res.status(200).json(Posts))
        .catch(error => res.status(400).json({ error}));
};

//Récupérer un post
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })    
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));         
}

//Mofifier un post
exports.modifyPost = (req, res, next) => {
}

//Aimer un post
exports.likePost = (req, res, next) => {

}

//Supprimer un post
exports.deletePost = (req, res, next) => {
    
}