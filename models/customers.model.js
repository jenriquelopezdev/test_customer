const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define("CUSTOMERS", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fistName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  mobilePhone: {
    type: Sequelize.INTEGER
  },
  phone: {
    type: Sequelize.INTEGER
  }
});
