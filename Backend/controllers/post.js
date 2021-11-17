const db = require ('../models/index')
const Post = db.post;
const User = db.user;
const Comment = db.comment;


//Créer un post
exports.createPost = (req, res, next) => {
    const  userId = req.body.userId ;
    console.log(req.userId) ;
    console.log( req.file)
    if (req.body.content == null || req.file == undefined) {
        res.status(400).json({ message:'Contenu obligatoire' });
    }
    let initial_likes = JSON.stringify([])
    const post = {
        userId: userId,
        content: req.body.content,
        image: `/images/${req.file.filename}`,
        usersLikes: initial_likes

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
        include: [{model: User},{model: Comment, include: [{model: User}] }],
        order: [['updatedAt','DESC']],
        where: { deleted_at: null },
    })
        .then(posts => {
            let data = {
                "posts":posts,
                "media_url": `${req.protocol}://${req.get('host')}`
            }
            res.status(200).json(data)
        })
        .catch(error =>{
            console.log(error)
            res.status(400).json({ error })
        });
};

//Récupérer un post
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id, deleted_at: null }
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
        { where: { id: req.params.id }
    })    
    .then(() => res.status(200).json({ message: 'post modifié!'}))
    .catch(error => res.status(400).json({ message: "erreur post non modifié !"}));       
};      

//Supprimer un post (soft delete)
exports.deletePost = (req, res, next) => {
    Post.update({ deleted_at: Date.now() },{
        where : { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Post supprimé' }))
    .catch(error => res.status(500).json({ error }));  
};

//like un post
exports.likePost = (req, res, next) => {
    // recuperer le post
    let postId = req.params.id
    let opt = req.body.option
    let userId = req.userId ;
    Post.findOne({
        where: { id: postId, deleted_at: null }
    })    
    .then(post => {
        if(post) {
            if (opt == 1) { 
                let likes = JSON.parse(post.usersLikes)
                if(!likes.includes(userId)) {
                     // si l'utilisateur pas encore liké    
                     likes.push(userId)
                     likes =  JSON.stringify(likes)
                }
                post.update({usersLikes:likes})
                return res.status(201).json({ message: 'j\'aime'});
            }                                 
            else if (opt == -1 ) {
                let likes = JSON.parse(post.usersLikes)
                if(likes.includes(userId)) {
                    // si l'utilisateur a deja liké , on supprime    
                    likes = likes.filter(item => item !=userId)
                    likes = JSON.stringify(likes)
                }
                post.update({ usersLikes:likes })
                return res.status(201).json({ message: 'pas de préférence'});                     
            } 
        } else {
            res.status(404).json({message:"pas de post"})
        }
        
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({error})
    });                                     
};
