const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const post = require('../models/post');


//Créer un post
exports.createPost = (req, res, next) => {
    const  userId = req.userId ;
    
    if (req.body.content == null || req.body.image == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }
    const post = {
        userId: userId,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    Post.create(post)
        .then(()=> res.status(201).json({ message: 'Post enregistré !'}))
        .catch((error) => {
            console.log(error)
            res.status(400).json({ message: "erreur post non enregistré !"} )
        });          
};

//Récupérer les posts
exports.findAllPost = (req, res, next) => {
    Post.findAll({
        order: [['updatedAt','DESC']]
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
};

//Mofifier un post
exports.modifyPost = (req, res, next) => {
    Post.update(
        { image: req.body.image, content: req.body.content },
        {where: {
            id: req.params.id
        }
    })    
    .then(() => res.status(200).json({ message: 'post modifié!'}))
    .catch(error => res.status(400).json({ message: "erreur post non modifié !"}));       
};      

//Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: {id: req.params.id}
    })
    .then(post => {
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { 
            Post.destroy({where: {id: req.params.id}}) 
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error}));
            })
    })
    .catch(error => res.status(500).json({ error}));    
};