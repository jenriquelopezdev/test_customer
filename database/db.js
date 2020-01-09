const sqlz = require('sequelize');
const config = require('../config/config');

const db = {};
const sequelizeDB = new sqlz('datamed', config.db.user, config.db.pass, {
    host: config.db.host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelizeDB.authenticate()
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err);
        console.log('Did not connect')
    });

db.sequelize = sequelizeDB;
db.sqlz = sqlz;

module.exports = db;
