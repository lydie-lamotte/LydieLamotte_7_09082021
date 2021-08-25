const sequelize = require('../config/database');

const user = require('../models/user');
const post = require('../models/post');
const comment = require('../models/comment')

user.hasMany(post);

post.hasMany(comment);

user.hasMany(comment);