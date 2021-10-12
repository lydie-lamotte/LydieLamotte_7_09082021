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
    }); 
    return Post;
};



// ,{
//     hooks:{
//         beforCreate: function(p,options){
//             let initial_likes = JSON.stringify([])
//             p.usersLikes = initial_likes
//             return p
//         }
//     }
// }

// post.prototype.addUsersLike = function(userId){
//     // je recupere les likes and parsant en array
//    let likes = JSON.parse(this.usersLikes)
//    if(!likes.includes(userId)){
//         // si l'utilisateur pas encore like    
//         likes.push(userId)
//         return JSON.stringify(likes)
//    }
// }

// post.prototype.removeUsersLike = function(userId){
//     // je recupere les likes and parsant en array
//    let likes = JSON.parse(this.usersLikes)
//     if(!likes.includes(userId)){
//         // si l'utilisateur a deja like , on supprime    
//         likes = likes.filter(item => item !=userId)
//         return JSON.stringify(likes)
//     }

// }



