
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model:'users',
                Key:'id'
            }    
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usersLikes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            field: 'updated_at'        
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NULL,
            field: 'deleted_at'        
        }
    });

     //Pour faire la liaison entre les posts et les comments
     post.associate = (models) => {
        post.hasMany(models.comment, {
            //Si je supprime un post les comments aussi seront supprimer
          onDelete: "cascade",
        });
    };

    return post ;
}
