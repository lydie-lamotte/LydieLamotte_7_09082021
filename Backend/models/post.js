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
        field: 'user_id',
        references: {
            model:'user',
            Key:'id'
        }    
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usersLikes: {
        type: Sequelize.STRING,
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
        defaultValue: Sequelize.NULL,
        field: 'deleted_at'        
    }
});

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


module.exports = post;
