module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
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

    // associate user to posts
    user.associate = (models) => {
        users.hasMany(models.post, {
          onDelete: "cascade",
        });
    };

    return user ;
}
