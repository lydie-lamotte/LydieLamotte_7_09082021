'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
    static associate(models) {
        // define association here
        models.comment.belongsTo(models.user, {
            foreignKey: 'user_id'        
        })
        models.comment.belongsTo(models.post, {
            foreignKey: 'postId'
        })
    } 
    };
    Comment.init({    
        text: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'comment',
    });
    return Comment;
};