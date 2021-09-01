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
        image: `/images/${req.file.filename}`
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
        order: [['updatedAt','DESC']],
        where: {deleted_at: null}
    })
        .then(Posts => {
            let data = {
                "posts":posts,
                "media_url": `${req.protocol}://${req.get('host')}`
            }
            res.status(200).json(data)
        })
        .catch(error => res.status(400).json({ error }));
};

//Récupérer un post
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        where: {id: req.params.id, deleted_at: null}
    })    
    .then(post => {
        let data = {
            "post":post,
            "media_url": `${req.protocol}://${req.get('host')}`
        }
        res.status(200).json(data)
    })
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

//Supprimer un post (soft delete)
exports.deletePost = (req, res, next) => {
    Post.update({deleted_at: Date.now()},{
        where : { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Post supprimé' }))
    .catch(error => res.status(500).json({ error }));  
};