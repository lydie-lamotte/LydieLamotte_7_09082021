const sequelize = require('../config/database');

const user = require('../models/user');
const post = require('../models/post');

user.hasMany(post);