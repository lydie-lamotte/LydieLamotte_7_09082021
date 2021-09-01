const { Sequelize } = require('sequelize');
const db = require('../config/database');

const comment = db.define('comment',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        references: {
            model:'post',
            Key:'id'
        }    
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model:'user',
            Key:'id'
        }    
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
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
    },
    deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'deleted_at'        
    }
});

module.exports = comment;
