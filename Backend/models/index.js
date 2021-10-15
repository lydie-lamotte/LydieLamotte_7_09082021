const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {}; 

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here

db.user = require('../models/user')(sequelize, DataTypes);
db.post = require('../models/post')(sequelize, DataTypes);
db.comment = require('../models/comment')(sequelize, DataTypes);

// associate then
// db.Role.associate(db);
// db.UserRole.associate(db);



module.exports = db;
