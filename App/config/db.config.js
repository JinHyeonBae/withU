module.exports = {

    HOST: "db.cyx4oipm4ian.ap-northeast-2.rds.amazonaws.com",
    USER: "ubuntu",
    PASSWORD: "gksdldma21!",
    dialect: "withdb",
    database : 'User',
    ports:3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,        
        idle: 10000
    }
};