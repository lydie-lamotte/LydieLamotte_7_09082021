module.exports = (sequelize, DataTypes) =>{
    const comment = sequelize.define('comment',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'post_id',
            references: {
                model:'posts',
                Key:'id'
            }    
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
        text: {
            type: DataTypes.TEXT,
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

 return comment ;
}

