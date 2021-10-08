const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment')
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const helmet = require('helmet');
const path = require('path');


const app = express();

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//DB
const sequelize = new Sequelize({

    host: 'DB_HOST', 
    user: 'DB_USER', 
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
    dialect: "mysql"

});
const db = {};
try {
  db;
  console.log('Vous êtes connecté à MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//SECURITE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(helmet());

//routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;