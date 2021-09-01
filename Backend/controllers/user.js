const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const email = require('email-validator');
const password = require('../models/password-validator');

//s'inscrire
exports.signup = (req, res, next) => {
    //vérifier que les champs ne soient pas vide
    if (req.body.lastName == null || req.body.firstName == null || req.body.email == null || req.body.password == null) {
        res.status(400).json({message: 'Merci de renseigner tous les champs'});
    }
    //valider l'email
    if (!email.validate(req.body.email)) {
        res.status(400).json({message: 'email non valide'});
    }
    //valider le mot de passe
    if (!password.validate(req.body.password)) {
        res.status(400).json({message: 'mot de passe non valide'});
    }
    //crypte mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                password:hash,
                isAdmin: 0
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));      
}

//se connecter
exports.login = (req, res, next) => {
    //vérifie que les champs de soient pas vide
    if (req.body.email == null || req.body.password == null) {
        res.status(400).json({message: 'Merci de renseigner tous les champs'});
    }
    User.findOne({
        where: {email: req.body.email, deleted_at: null} //récupère l'email avec la methode where
    })
        .then(user => {
        if (!user) {  
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // compare le MdP avec le hash
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            console.log(user);
            res.status(200).json({
               user:{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                token: jwt.sign( // encoder un nouveau token
                    { userId: user.id },
                    process.env.KEY_SECRET,
                    { expiresIn: '24h' } // expire au bout de 24h
                )
            });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Récupérer les utilisateurs
exports.findAllUser = (req, res, next) => {
    User.findAll({
        order: [['updatedAt','DESC']],
        where: {deleted_at: null}
    })
        .then(Users => res.status(200).json(Users))
        .catch(error => res.status(400).json({ error }));
};

//Récupérer un utilisateur
exports.findOneUser = (req, res, next) => {

    User.findOne({
        where: {id: req.params.id, deleted_at: null}
    })    
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({error}));         
};

//supprimer utilisateur (soft delete)
exports.deleteUser = (req, res, next) => {
    User.update({deleted_at: Date.now()},{
        where : { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
    .catch(error => res.status(500).json({ error }));  
};

//modifier utilisateur
exports.modifyUser = (req, res, next) => {
    User.update(
        { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: 0
        },
        {where: {
            id: req.params.id
        }
    })    
    .then(() => res.status(200).json({ message: 'utilisateur modifié!'}))
    .catch(error => res.status(400).json({ message: "erreur utilisateur non modifié !"}));
}