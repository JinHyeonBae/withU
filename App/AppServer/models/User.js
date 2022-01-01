const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) =>{

    const user = sequelize.define(
        "User",
        {
            userId : {
                type : DataTypes.STRING(60),
                primaryKey : true
            },
            user_pwd : {
                type : DataTypes.STRING(60),
                comment : "패스워드"
            },
            user_name : {
                type : DataTypes.STRING(60),
            },
            user_gender:{
                type : DataTypes.STRING(60),
                comment : "성별"
            },
            user_address : {
                type : DataTypes.STRING(60)
            },
            user_phone : {
                type : DataTypes.STRING(60)
            },
            user_hospital : {
                type : DataTypes.STRING(60)
            },
            user_hospital : {
                type : DataTypes.STRING(60)
            },
            user_disease : {
                type : DataTypes.STRING(60)
            },
            user_device : {
                type : DataTypes.STRING(60)
            },
            user_number : {
                type : DataTypes.Int(5),
                primaryKey : true
            }
        }, {
            charset : "utf8",
            collate : "utf8_general_ci",
            tableName : "Users",
            createdAt : true,
            updatedAt : true,
            timestamps : true,
            paranoid : true
        }
    );

    User.associate = models => {
        User.hasOne(models.House, {foreignKey : "user_id", sourceKey : "user_id"})
    }

    return User
}