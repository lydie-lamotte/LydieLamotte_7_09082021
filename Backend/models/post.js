const { Sequelize } = require('sequelize');
const db = require('../config/database');

const post = db.define('post',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagePost: {
        type: Sequelize.STRING,
        allowNull: true
    },
    liked: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at'        
    }
});

module.exports = post;
