const { DataTypes } = require("sequelize/types");
const { sequelize, Sequelize } = require(".");



module.exports = (sequelize, DataTypes) => { 
    
    const House = sequelize.define("House", 
    {
        user_id : {
            type : DataTypes.STRING(60),
            primaryKey : true
        },
        house_id : {
            type : DataTypes.STRING(60),
            primaryKey : true,
            comment : "집 식별"
        },
        temperature : {
            type : DataTypes.STRING(60)
        },
        humidity : {
            type : DataTypes.STRING(60)
        },
        risk : {
            type : DataTypes.Int(60)
        },
        PIR : {
            type : DataTypes.STRING(60)
        },
        times : {
            type : DataTypes.DATATIME(60),
        }
    }, {
        charset : "utf8",
        collate : "utf8_general_ci",
        tableName : "Houses",
        createdAt : true,
        updatedAt : true,
        timestamps : true,
        paranoid : true
    })
    
    House.belongsTo(models.User, {foreignKey : "user_id", sourceKey : "user_id"})

    return House;
};