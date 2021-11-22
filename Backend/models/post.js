'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
    static associate(models) {
        // define association here
        models.post.belongsTo(models.user, {
            foreignKey: 'userId'           
        }),
        models.post.hasMany(models.comment)
    }
    };
    Post.init({
        content: DataTypes.STRING, 
        userId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        usersLikes: DataTypes.STRING,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'post',
        paranoid: true,
        deletedAt: 'deleted_at'
    }); 
    return Post;
};



