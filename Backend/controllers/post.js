const Post = require('../models/post');

const fs = require('fs');

//récupérer les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(Posts => res.status(200).json(Posts))
        .catch(error => res.status(400).json({ error}));
};

// récupérer un post
exports.createPost = (req, res, next) => {
    if (req.body.content == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }
    const post = {
        userId: req.body.userId,
        content: req.body.content,
        imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        like: 0
    }
    Post.create(post)
        .then(()=> res.status(201).json({ message: 'Post enregistré !'}))
        .catch(() => res.status(400).json({ message: "erreur post non enregistré !"} ));
};
