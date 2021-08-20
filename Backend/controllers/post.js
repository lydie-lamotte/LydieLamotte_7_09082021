const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');


//Créer un post
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.KEY_SECRET);
    const userId = verifyToken.userId;
    if (req.body.content == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }
    const post = {
        userId: userId,
        content: req.body.content,
        imagePost:  req.file ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename 
        : null
    };
    Post.create(post)
        .then(()=> res.status(201).json({ message: 'Post enregistré !'}))
        .catch(() => res.status(400).json({ message: "erreur post non enregistré !"} ));          
};

//Récupérer les posts
exports.findAllPost = (req, res, next) => {
    Post.findAll({
        order: [['createdAt','DESC']]
    })
        .then(Posts => res.status(200).json(Posts))
        .catch(error => res.status(400).json({ error }));
};

//Récupérer un post
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        where: {id: req.params.id}
    })    
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));         
}

//Mofifier un post
exports.modifyPost = (req, res, next) => {
}

//Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: {id: req.params.id}
    })
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { 
        Post.destroy({where: {id: req.params.id}}) 
            .then(() => res.status(200).json({ message: 'Post supprimée'}))
            .catch(error => res.status(400).json({ error}));
        })
    })
    .catch(error => res.status(500).json({ error}));    
};