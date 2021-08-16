const Post = require('../models/post');

const fs = require('fs');

exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(sauces => res.status(200).json(Posts))
        .catch(error => res.status(400).json({ error}));
};

