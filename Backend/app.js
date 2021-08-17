const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
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
const db = require('./config/database');
//Test DB
db.authenticate()
    .then(() => {
    console.log('connection établie.');
    })
    .catch(error => {
    console.error('connection refusée, erreur:', error);
    });

//SECURITE
app.use(bodyParser.json());
app.use(helmet());

//routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;