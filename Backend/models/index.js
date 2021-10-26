'use strict';
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
require('dotenv').config();

/*const sequelize = new Sequelize({

  host: 'DB_HOST', 
  user: 'DB_USER', 
  password: 'DB_PASSWORD',
  database: 'DB_DATABASE',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});*/
const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  dialect: "mysql",
  host: "localhost"
});

const db = {};
try {
db;
console.log('Vous êtes connecté à MySQL!');
} catch (error) {
console.error('Impossible de se connecter, erreur suivante :', error);
}

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//import model
db.user = require("./user")(sequelize, Sequelize)
db.post = require("./post")(sequelize, Sequelize)
db.comment = require("./comment")(sequelize, Sequelize)

db.post.associate(db);
db.user.associate(db);
db.comment.associate(db)

module.exports = db;


