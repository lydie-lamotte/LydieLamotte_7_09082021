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
    User.findOne({
        where: {email: req.body.email} //récupère l'email avec la methode where
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
            res.status(200).json({
                userId: user._id,
                token: jwt.sign( // encoder un nouveau token
                    { userId: user._id },
                    process.env.KEY_SECRET,
                    { expiresIn: '24h' } // expire au bout de 24h
                )
            });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};