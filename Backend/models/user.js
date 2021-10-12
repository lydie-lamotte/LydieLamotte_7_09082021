'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
    static associate(models) {
        // define association here
        models.user.hasMany(models.post);
        models.user.hasMany(models.comment);
    }
    };
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'user',
    });
    return User;
};