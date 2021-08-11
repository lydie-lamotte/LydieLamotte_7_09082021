const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2')
require('dotenv').config();

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*DB
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

db.connect((error)=> {
    if (error){ throw error;
    }
    console.log('MySql est connecté !')
});*/
//DB
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER,process.env.DB_PASSWORD,{ 
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
sequelize.authenticate()
    .then(() => {
    console.log('connection établie.');
    })
    .catch(error => {
    console.error('connection refusée, erreur:', error);
    });

//SECURITE
app.use(bodyParser.json());

module.exports = app;