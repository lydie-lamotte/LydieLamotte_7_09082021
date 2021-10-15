const HOST = process.env.DB_HOST || 'localhost'
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const DB = process.env.DB_DATABASE 

module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD ,
    DB: DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
