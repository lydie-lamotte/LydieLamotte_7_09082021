const db = require ('../models/index');
const Comment = db.comment;
const Post = db.post;
const User = db.user;

//Créer un commentaire
exports.createComment = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    if (req.body.text == null) {
        res.status(400).json({message:'Contenu obligatoire'});
    }    
    const comment =  {
        userId: userId,
        postId: postId,
        text: req.body.text
    };
    Comment.create(comment)
    .then(()=> res.status(201).json({ message: 'commentaire enregistré !'}))
    .catch(() => res.status(400).json({ message: "erreur commentaire non enregistré !"} ));          
};

//Récupérer les commentaires
exports.findAllComment = (req, res, next) => {
    Comment.findAll({
        include: [{model: User},{model: Post}],
        order: [['createdAt','DESC']]
    })
    .then(comments => {
        let data = {
            'comments': comments,
        }
        res.status(200).json(data)
    })
    .catch(error => res.status(400).json({ error}));
};

//Récupérer un commentaire
exports.findOneComment = (req, res, next) => {
    Comment.findOne({
        where: {id: req.params.id}
    })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({error}));         
};

//Mofifier un commentaire
exports.modifyComment = (req, res, next) => {
    Comment.update(
        { text: req.body.text },
        {where: {
            id: req.params.id
        }
    })    
    .then(() => res.status(200).json({ message: 'Commentaire modifié!'}))
    .catch(error => res.status(400).json({ message: "erreur commentaire non modifié !"}));       
};


//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.status(200).json({ message: 'commentaire supprimée'}))
    .catch(error => res.status(404).json({error}));  
}